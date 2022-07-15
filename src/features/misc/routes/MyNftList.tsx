import { Button } from '@/componentes/Elements/Button/Button';
import { Form } from '@/componentes/Form/Form';
import { Input } from '@/componentes/Form/Inputs';
import { MainLayout } from '@/componentes/Layout/MainLayout';
import { RichTable } from '@/componentes/Layout/RichTable';
import { useWalletFundsContext } from '@/context/WalletFundsContext';
import { Asset, AssetEntity, Nft } from '@common/src/lib/api/entities';
import { retrying } from '@common/src/lib/net';
import NetworkClient from '@common/src/services/NetworkClient';
import { none, option, some } from '@octantis/option';
import { Wallet } from 'algorand-session-wallet';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Container from 'typedi';
import NftCause from '../components/MyNftList/NftCause';
import NftName from '../components/MyNftList/NftName';
import NftPrice from '../components/MyNftList/NftPrice';
import NftStatus from '../components/MyNftList/NftStatus';
import { TransactionFrame } from '../components/MyNftList/TransactionFrame';
import Sidebar from '@/componentes/Sidebar/Sidebar';
import { formatDate, getId, getImageUrl, isAsset } from '@/lib/utils';

export interface MyNftListProps {
  wallet: Wallet;
  account: string;
}

export interface UserState {
  balance: number;
  projects: number;
}

const net = Container.get(NetworkClient);

/**
 * A root component that shows a panel with information about the
 * minted user's NFTs, ongoing bids, sales...
 */
export default function MyNftList({ account }: MyNftListProps) {
  const { register } = useForm();
  const [search, setSearch] = useState<string>('');
  const [nfts, setNfts] = useState<Record<string, AssetEntity | Asset | Nft>>({});
  const [info, setInfo] = useState('');

  useEffect(() => {
    (async () => {
      setInfo(`Preloading assets...`);
      const res = await retrying(
        net.core.get('my-assets', {
          query: {
            wallet: account,
          },
        }),
        10
      );
      if (res.data.assets.length === 0) {
        setInfo('No asset found.');
      }
      setNfts(
        res.data.assets.reduce((map, asset) => {
          map[getId(asset)] = asset;
          return map;
        }, {} as Record<string, Asset | AssetEntity>)
      );
    })();
  }, []);

  useEffect(() => {
    const size = Object.keys(nfts).length;
    if (size === 0) return;
    const pending = [...Object.values(nfts)].filter((s) => isAsset(s)) as Asset[];
    setInfo(`Loaded ${size - pending.length} out of ${size} total assets...`);
    if (pending.length === 0) {
      setInfo(`Done! All assets loaded!`);
      setTimeout(() => {
        setInfo('');
      }, 3000);
    } else {
      const ad = pending.pop();
      if (!ad) {
        throw new Error(`Invalid data payload! This shouldn't be happening!`);
      }
      const id = ad['asset-id'].toString();
      if (id == null) {
        throw new Error(`Invalid data payload! This shouldn't be happening!`);
      }
      (async () => {
        console.info(`Fetching asset ${id}...`);
        const res = await retrying(
          net.core.get(`asset/:id`, {
            params: { id },
          }),
          10
        );
        setNfts({ ...nfts, [res.data.value.id.toString()]: res.data.value });
      })();
    }
  }, [nfts]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search != '') {
      console.log('search', search);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <h2 className="ml-10 mb-10 font-semibold text-[32px] text-climate-black ">Account</h2>
        <div className="flex justify-around">
          <Sidebar />
          <TransactionFrame className="flex">
            <div className="flex flex-col w-[90%]">
              <div className="bg-white shadow-lg mt-7 border border-neutral-200 rounded-lg">
                <div className="border-b border-neutral-200 pt-4 px-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-start">
                      <p>My NFTs</p>
                    </div>
                    <div className="flex gap-6">
                      {/* <Input
                        className="basis-2/4"
                        register={register}
                        name="term"
                        type="search"
                        placeholder="Search"
                      /> */}
                      <form className="flex items-center">
                        <div className="flex w-full border border-gray-300 rounded-3xl py-1">
                          <div className="flex">
                            <button className="cursor-pointer pl-2" onClick={handleSearch}>
                              <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="text-sm rounded-3xl focus:outline-none w-full pl-3"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </form>

                      <div className="flex items-center">
                        <p className="text-climate-light-gray">Filters</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1 text-climate-light-gray"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <Link to="/mint">
                        <Button
                          className="basis-1/3 bg-climate-light-blue font-normal text-sm rounded-3xl py-2 px-5"
                          size="sm"
                        >
                          Create NFT
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <RichTable
                  order={['name', 'price', 'date', 'status']}
                  header={{
                    name: 'NFT Name',
                    price: 'Price',
                    date: 'Date',
                    status: 'Status',
                  }}
                  rows={[...Object.values(nfts)]
                    .sort((a, b) => getId(b) - getId(a))
                    .map((nft) => {
                      if (isAsset(nft)) {
                        const id = nft['asset-id'].toString();
                        return {
                          $id: id,
                          $class: 'animate-pulse',
                          name: (
                            <div className="flex">
                              <div className="mr-2 bg-climate-action-light rounded-lg w-10 h-10">
                                &nbsp;
                              </div>
                              <div className="flex flex-col w-6/12">
                                <div className="rounded mb-2 bg-climate-action-light">&nbsp;</div>
                                <div className="rounded bg-climate-action-light h-2">&nbsp;</div>
                              </div>
                            </div>
                          ),
                          price: (
                            <div className="flex flex-col">
                              <div className="mt-2 mb-4 flex justify-between">
                                <div className="bg-climate-action-light rounded w-full">&nbsp;</div>
                                <div className="ml-2 bg-climate-action-light rounded w-4">
                                  &nbsp;
                                </div>
                              </div>
                            </div>
                          ),
                          cause: (
                            <div className="rounded w-full bg-climate-action-light">&nbsp;</div>
                          ),
                          status: (
                            <div className="rounded w-full bg-climate-action-light">&nbsp;</div>
                          ),
                        };
                      } else {
                        const id = getId(nft).toString();
                        return {
                          $id: id,
                          $class: '',
                          name: <NftName thumbnail={getImageUrl(nft)} title={nft.title} id={id} />,
                          price: <NftPrice price={nft.arc69.properties.price} />,
                          date: formatDate(nft.arc69.properties.date),
                          status: (
                            <NftStatus
                              nft={nft}
                              assetId={getId(nft)}
                              creatorWallet={account}
                              causePercentage={nft.arc69.properties.causePercentage}
                            />
                          ),
                        };
                      }
                    })}
                />
              </div>
            </div>
          </TransactionFrame>
        </div>
      </div>
    </MainLayout>
  );
}
