export interface iFish {
  id: number;
  ["file-name"]: string;
  ids: {
    fishId: number;
    uniqueId: string;
  };
  name: {
    ["name-USen"]: string;
  };
  price: number;
  image_uri: string;
  icon_uri: string;
}
