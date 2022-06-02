import { useState } from 'react';
import FirstTab from './FirstTab';
import './mycssfile.css';
import SecondTab from './SecondTab';
import clsx from 'clsx';
import { Nft } from '@common/src/lib/api/entities';

type TabsProps = {
  status: string;
  assetId: number;
  causePercentage: number;
  creatorWallet: string;
  nft: Nft;
};

const Tabs = ({ status, assetId, causePercentage, creatorWallet, nft }: TabsProps) => {
  console.log('status', status);
  console.log('assetId', assetId);
  console.log('causePercentage', causePercentage);
  console.log('creatorWallet', creatorWallet);
  console.log('nft', nft);

  const [activeTab, setActiveTab] = useState('tab1');
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab('tab1');
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab('tab2');
  };

  return (
    <div className="min-h-[300px] mt-4">
      {/* Tab nav */}
      <ul className="nav">
        <li
          className={clsx(
            activeTab === 'tab1' ? 'active' : '',
            'w-1/2 cursor-pointer text-center rounded-bl-3xl rounded-tl-3xl p-3'
          )}
          onClick={handleTab1}
        >
          Fixed Price
        </li>
        <li
          className={clsx(
            activeTab === 'tab2' ? 'active' : '',
            'w-1/2 cursor-pointer text-center rounded-br-3xl rounded-tr-3xl p-3'
          )}
          onClick={handleTab2}
        >
          Timed Auction
        </li>
      </ul>
      <div className="text-center">
        {activeTab === 'tab1' ? (
          <FirstTab
            nft={nft}
            assetId={assetId}
            causePercentage={causePercentage}
            creatorWallet={creatorWallet}
          />
        ) : (
          <SecondTab />
        )}
      </div>
    </div>
  );
};
export default Tabs;
