/*
  Mint action related business logic.
*/
import { InputGeneratorType } from '@/componentes/InputGenerator/InputGenerator';
import { client } from '@/lib/algorand';
import { Cause } from '@/lib/api/causes';
import { AssetInfo, createNFT } from '@/lib/nft';
import { metadataNFTType, NFTMetadataBackend } from '@/lib/type';
import ProcessDialog from '@/service/ProcessDialog';
import { DateLike } from '@common/src/lib/dates';
import { AuctionLogic } from '@common/src/services/AuctionLogic';
import NetworkClient from '@common/src/services/NetworkClient';
import { Wallet } from 'algorand-session-wallet';
import { useTranslation } from 'react-i18next';
import Container from 'typedi';
import { useNavigate } from 'react-router-dom';
import { Failure, Result, Success } from '@common/src/lib/Result';
import { retrying } from '@common/src/lib/net';

const dialog = Container.get(ProcessDialog);

const net = Container.get(NetworkClient);

/**
 * Retrieves the NFT metadata.
 */
export async function getNFTMetadata(data: NFTMetadataBackend) {
  return await dialog.process(async function () {
    this.message = 'Uploading NFT to IPFS...';
    this.title = 'Preparing NFT';
    const oneFile = data.properties.file;
    const attribute = data.properties?.attributes?.reduce?.(
      (acc: Record<string, unknown>, curr: InputGeneratorType['inputList'][0]) => {
        acc[curr.trait_type] = curr.value;
        return acc;
      },
      {}
    );
    delete data.properties.attributes;
    const dataString = {
      ...data,
      properties: { ...data.properties, ...attribute },
      file: undefined,
    };
    dataString.properties.causePercentage = Number(dataString.properties.causePercentage);
    dataString.properties.price = Number(dataString.properties.price);
    const form = new FormData();
    form.append('data', JSON.stringify(dataString));
    form.append('file', oneFile, oneFile.name);
    const res = await net.core.post('ipfs', form);
    console.log('res.data', res.data);
    return res.data;
  });
}

export type MintMeta = {
  end: DateLike;
  start: DateLike;
  cause: {
    part?: number;
    id: string;
  };
};

async function tryCreateAuction(
  asset: AssetInfo,
  account: string,
  info: MintMeta
): Promise<Result<{ appIndex: number }>> {
  try {
    const result = await retrying(
      net.core.post('create-auction', {
        assetId: asset.assetID,
        creatorWallet: account,
        causePercentage: info.cause.part ?? 30,
        startDate: info.start.toISOString(),
        endDate: info.end.toISOString(),
      })
    );
    return new Success(result.data);
  } catch (err) {
    return new Failure(err as Error);
  }
}

/**
 * Creates a bound in-place mint action that can be used to mint a new
 * NFT from a react component.
 */
export function useMintAction(causes: Cause[] | undefined) {
  const { t } = useTranslation();

  const goToPage = useNavigate();

  if (causes == null) {
    return () => alert('Causes not loaded yet.');
  }
  return async function mintNFT(
    data: metadataNFTType,
    info: MintMeta,
    wallet: Wallet,
    account: string
  ) {
    const cause = causes.find((cause) => cause.id === info.cause.id);
    if (cause == null) {
      return alert('Invalid cause selected!');
    }
    const algodClient = client();
    await dialog.process(async function () {
      this.title = 'Uploading to blockchain';
      this.message = 'Creating the NFT data...';
      let nftCreationStatus!: Result<AssetInfo>;
      {
        const tryCreate = () => createNFT(algodClient, account, data, wallet);
        nftCreationStatus = await tryCreate();
        let attempts = 0;
        while (nftCreationStatus.failed) {
          if (attempts++ > 3) throw nftCreationStatus.reason;
          nftCreationStatus = await tryCreate();
        }
      }
      const asset = nftCreationStatus.result;
      console.log('result from createNFT', asset);

      this.message = 'Opting in...';
      const optResult = await retrying(
        net.core.post('opt-in', {
          assetId: asset.assetID,
        }),
        100
      );
      console.info('Asset opted-in:', optResult);

      const transfer = await Container.get(AuctionLogic).makeTransferToAccount(
        optResult.data.targetAccount,
        asset.assetID,
        new Uint8Array()
      );
      if (transfer.failed) {
        throw transfer.reason;
      }
      console.info('Asset transfer to app:', transfer.result.txId);
      this.message = 'Creating auction...';
      const tx = await tryCreateAuction(asset, account, info);
      if (tx.failed) {
        console.error('Asset transfer to app failed:', tx.reason);
        // TBD
        throw null;
      }
      console.info('Auction program was created:', tx.result.appIndex);
      if (tx.result.appIndex) {
        this.title = 'Your NFT has been successfully created!!';
        this.message = '';

        goToPage(`/nft/${asset.assetID}`);
        await new Promise((r) => setTimeout(r, 5000));
      }

      return console.warn(
        "Can't opt-in this asset: No data returned at creation-time! This is a no-op, but it may indicate a problem."
      );
    });
  };
}
