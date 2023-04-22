interface IMerchant {
  id: number;
  name: string;
  revenue: number;
  dueDate: string;
  address: string;
}

interface IYield {
  duration: number;
  yield: number;
}

export const MerchantData: IMerchant[] = [
  {
    id: 123,
    name: "Gazprom",
    revenue: 1000,
    dueDate: "11/04/2023",
    address: "0x000000",
  },
  {
    id: 124,
    name: "Sinopec",
    revenue: 1000,
    dueDate: "11/04/2023",
    address: "0x000000",
  },
  {
    id: 125,
    name: "ExxonMobil",
    revenue: 1000,
    dueDate: "11/04/2023",
    address: "0x000000",
  },
  {
    id: 126,
    name: "Chevron",
    revenue: 1000,
    dueDate: "11/04/2023",
    address: "0x000000",
  },
  {
    id: 127,
    name: "Royal Dutch Shell",
    revenue: 1000,
    dueDate: "11/04/2023",
    address: "0x000000",
  },
];

export const YieldData: IYield[] = [
  {
    duration: 0,
    yield: 1,
  },
  {
    duration: 1,
    yield: 1.05,
  },
  {
    duration: 2,
    yield: 1.1025,
  },
  {
    duration: 3,
    yield: 1.15763,
  },
  {
    duration: 4,
    yield: 1.2155,
  },
  {
    duration: 5,
    yield: 1.2763,
  },
  {
    duration: 6,
    yield: 1.34,
  },
  {
    duration: 7,
    yield: 1.407,
  },
  {
    duration: 8,
    yield: 1.4775,
  },
  {
    duration: 9,
    yield: 1.55,
  },
  {
    duration: 10,
    yield: 1.629,
  },
];
