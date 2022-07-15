import email from '../../../../assets/icons/email.svg';
import share from '../../../../assets/icons/share.svg';

const NftDetailShare = () => {
  return (
    <div className="py-5 px-5 text-base">
      <p className=" font-semibold pb-3">Share</p>
      <div className="grid grid-cols-2 gap-4 text-climate-light-gray">
        <div>
          <div className="flex gap-5 pb-2">
            <img src={email} alt="email" />
            <p>Share via email</p>
          </div>
          <div className="flex gap-5 pb-2">
            <img src={share} alt="share" />
            <p>Share via WhatsApp</p>
          </div>
          <div className="flex gap-5 pb-2">
            <img src={share} alt="share" />
            <p>Share via Linkedin</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NftDetailShare;
