import { Asset, AssetEntity, Nft } from '@common/src/lib/api/entities';

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  const newDay = d.getDate();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = months[d.getMonth()].substring(3, 0);
  const year = d.getFullYear();
  return `${newDay} ${month}, ${year}`;
};

export function getId(value: Asset | AssetEntity | Nft) {
  if (isAsset(value)) {
    return value['asset-id'];
  } else if (isNft(value)) {
    return value.id;
  }
  return value.assetIdBlockchain;
}

export function getImageUrl(value: AssetEntity | Nft) {
  if (isNft(value)) {
    return value.image_url;
  }
  return value.imageUrl;
}

export function isAsset(value: Asset | AssetEntity | Nft): value is Asset {
  return typeof (value as unknown as Record<string, unknown>)['asset-id'] === 'number';
}
export function isNft(value: AssetEntity | Nft): value is Nft {
  return typeof (value as unknown as Record<string, unknown>)['image_url'] === 'string';
}
