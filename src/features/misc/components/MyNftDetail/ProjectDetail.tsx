import { Nft } from '@common/src/lib/api/entities';

type NftDetailInfoProps = {
  nft: Nft;
  id: string;
};
const ProjectDetail = ({ nft, id }: NftDetailInfoProps) => {
  return (
    <div className="py-5 px-5 text-base">
      <p className="font-semibold pb-3 text-climate-black">Project details</p>
      <div className="grid grid-cols-2 gap-14 text-climate-light-gray">
        <div>
          <div className="flex justify-between gap-2 pb-2">
            <p>Price</p>
            <span className="font-semibold text-climate-black">62€</span>
          </div>
          <div className="flex justify-between gap-2 pb-2">
            <p>VAT</p>
            <span className="font-semibold text-climate-black">8€</span>
          </div>
          <div className="flex justify-between gap-2 pb-2">
            <p>Subtotal</p>
            <span className="font-semibold text-climate-black">70€</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between gap-2 pb-2">
            <p>Creator / Artist</p>
            <span className="font-semibold text-climate-black">20€</span>
          </div>
          <div className="flex justify-between gap-2 pb-2">
            <p>Creator / Artist VAT</p>
            <span className="font-semibold text-climate-black">35€</span>
          </div>
          <div className="flex justify-between pb-2">
            <p>Transaction Fee</p>
            <span className="font-semibold text-climate-black">50€</span>
          </div>
          <div className="flex justify-between gap-2 pb-2">
            <p>Transaction Fee VAT</p>
            <span className="font-semibold text-climate-black">10€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
