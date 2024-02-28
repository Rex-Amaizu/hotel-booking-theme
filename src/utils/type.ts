export type THotels = {
  name: string;
  city: string;
  country: string;
  address: string;
  picture: string;
  id: string;
  chain: string;
  ranking: string;
};

export type TData = {
  name: string;
  city: string;
  country: string;
  address: string;
  picture: string;
  id: string;
  chain: string;
  ranking: string;
};

export type TChains = Pick<THotels, "name" | "id">;

export type TChainResult = { name: string; id: number }[];
