import { useEffect, useState } from 'react';
import { Nft } from '@common/src/lib/api/entities';
import Container from 'typedi';
import { Link, useParams } from 'react-router-dom';
import NetworkClient from '@common/src/services/NetworkClient';
import Sidebar from '@/componentes/Sidebar/Sidebar';
import ChevronLeft from '@/componentes/Arrows/ChevronLeft';
import NftDetailInfo from '../components/MyNftDetail/NftDetailInfo';
import ProjectDetail from '../components/MyNftDetail/ProjectDetail';
import NftDetailDownload from '../components/MyNftDetail/NftDetailDownload';
import NftDetailShare from '../components/MyNftDetail/NftDetailShare';

const MyNftDetail = () => {
  const { id } = useParams();
  console.log('id', id);
  const [nft, setNft] = useState<Nft>();

  useEffect(() => {
    if (id) {
      Container.get(NetworkClient)
        .core.get('asset/:id', {
          params: {
            id: id,
          },
        })
        .then(({ data }) => {
          setNft(data.value);
        });
    }
  }, []);

  console.log('nft from MyNftDetail', nft);

  return (
    <div className="mt-[100px] flex flex-col w-full">
      <div className="flex ml-14 mb-16 text-climate-light-gray">
        <ChevronLeft />
        <Link to="/my-nfts">My NFTs</Link>
      </div>
      <div className="flex justify-around font-inter">
        <Sidebar />
        <div className="w-[70%] flex flex-col border border-neutral-200 rounded-lg pt-4 mb-24">
          {nft && id && <NftDetailInfo nft={nft} id={id} />}
          {nft && id && <ProjectDetail nft={nft} id={id} />}
          {nft && id && <NftDetailDownload />}
          {nft && id && <NftDetailShare />}
        </div>
      </div>
    </div>
  );
};

export default MyNftDetail;
