import { Button } from '@/componentes/Elements/Button/Button';
import { formatDate } from '@/lib/utils';
import { AssetEntity, Listing, Nft } from '@common/src/lib/api/entities';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { microalgosToAlgos } from '../../lib/minting';

type NftDetailInfoProps = {
  nft: Nft;
  id: string;
};

const NftDetailInfo = ({ nft, id }: NftDetailInfoProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<any | void | boolean | undefined>();

  const disableButton = () => {
    // TODO El estado debe ser correcto y no mirar el isClosed
    // if ((nft.type === 'direct-listing' || nft.type === 'auction') && !nft.isClosed) {
    //   return setDisabled(true);
    // }
    return disabled as boolean;
  };

  const handleDropdown = () => {
    disableButton();
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="min-h-[350px] flex border-b justify-between border-neutral-200 pb-4 px-5">
      <div className="flex flex-col justify-around">
        <h1 className="font-black text-[40px] max-w-[370px] break-words">{nft?.title}</h1>
        <div className="flex gap-3 text-climate-light-gray text-base">
          <p>{nft && formatDate(nft?.arc69.properties.date)}</p>
          <p>#{id}</p>
        </div>
        <div className="flex gap-2 font-semibold text-climate-black">
          <p>Price buy:</p>
          <span>{nft && microalgosToAlgos(nft?.arc69.properties.price)}</span>
        </div>
        <div className="flex gap-2 font-semibold text-climate-black">
          <p>Contributed to cause:</p>
          <span>{nft?.arc69.properties.causePercentage}</span>
        </div>
        <div className="flex gap-2 h-10 min-w-[350px]">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://testnet.algoexplorer.io/asset/${id}`}
            className="bg-white text-climate-light-blue font-normal border border-climate-light-blue text-base rounded-3xl py-2 px-5"
          >
            View NFT
          </a>
          <Link
            to=""
            className="bg-white text-climate-light-blue font-normal border border-climate-light-blue text-base rounded-3xl py-2 px-5"
          >
            Edit NFT
          </Link>
          <Button
            onClick={handleDropdown}
            className="bg-climate-light-blue font-normal text-base rounded-3xl px-5"
            size="sm"
          >
            List NFT
          </Button>
        </div>
      </div>
      <div className="flex">
        <img
          className="min-w-[410px] object-contain rounded-lg"
          src={nft?.image_url}
          alt={nft?.title}
        />
      </div>
    </div>
  );
};

export default NftDetailInfo;
