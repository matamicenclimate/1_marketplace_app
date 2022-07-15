import { Link } from 'react-router-dom';
import summary from '../../assets/icons/summary.svg';
import myorders from '../../assets/icons/myorders.svg';
import mynfts from '../../assets/icons/mynfts.svg';
import notifications from '../../assets/icons/notifications.svg';
import settings from '../../assets/icons/settings.svg';

type SidebarProps = {
  sidebarOptions?: string[] | React.ReactElement[];
  isLanding?: boolean;
};

const sidebarlandingOptions = ['Price', 'Cause', 'Artist', 'Auction type', 'SDGs'];

const sidebarMyNftsOptions = (
  <div className="flex flex-col">
    <div className="flex mt-4 cursor-pointer">
      <img className="mr-3" src={summary} alt="" />
      <Link to="" key={'summary'}>
        Summary
      </Link>
    </div>
    <div className="flex mt-4 cursor-pointer">
      <img className="mr-3" src={myorders} alt="" />
      <Link to="" key={'myorders'}>
        My orders
      </Link>
    </div>
    <div className="flex mt-4 cursor-pointer font-semibold text-climate-black">
      <img className="mr-3" src={mynfts} alt="" />
      <Link to="" key={'mynfts'}>
        My NFTs
      </Link>
    </div>
    <div className="flex mt-4 cursor-pointer">
      <img className="mr-3" src={notifications} alt="" />
      <Link to="" key={'notifications'}>
        Notifications
      </Link>
    </div>
    <div className="flex mt-4 cursor-pointer">
      <img className="mr-3" src={settings} alt="" />
      <Link to="" key={'settings'}>
        Settings
      </Link>
    </div>
  </div>
);

const Sidebar = ({ isLanding }: SidebarProps) => {
  return (
    <div className="w-[25%] h-screen px-9">
      <ul className="font-normal text-climate-light-gray">
        {isLanding ? (
          sidebarlandingOptions?.map((option, index) => (
            <li key={index} className="mt-4 flex justify-between items-center">
              <p>{option}</p>
              <span className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
          ))
        ) : (
          <div>{sidebarMyNftsOptions}</div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
