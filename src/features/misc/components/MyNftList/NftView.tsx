import ChevronRight from '@/componentes/Arrows/ChevronRight';
import { Link } from 'react-router-dom';

type NftViewProps = {
  assetId: number;
};

const NftView = ({ assetId }: NftViewProps) => {
  return (
    <>
      <Link to={`/my-nfts/${assetId}`}>
        <div className="flex flex-col mx-8">
          <p className="text-xs bg-climate-yellow w-[120px]">
            (TODO: fetch correct Nft either from database if listed or from blockchain)
          </p>
          <div className="flex border border-climate-yellow">
            <p>View NFT</p>
            <ChevronRight />
          </div>
        </div>
      </Link>
    </>
  );
};

export default NftView;
