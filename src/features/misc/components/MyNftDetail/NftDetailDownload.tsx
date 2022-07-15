import downloadcerticate from '../../../../assets/icons/downloadcertificate.svg';

const NftDetailDownload = () => {
  return (
    <div className="py-5 px-5 border-y border-neutral-200 text-base">
      <p className=" font-semibold pb-3">Download</p>
      <div className="grid grid-cols-2 gap-14 text-climate-light-gray">
        <div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Claim official certificate</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Blockchain certificate</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Compensation certificate</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Proforma invoice</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Project invoice</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-2 pb-2">
              <img src={downloadcerticate} alt="downloadcerticate" />
              <p>Transaction fee invoice</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftDetailDownload;
