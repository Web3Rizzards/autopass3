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
    revenue: 0.001,
    dueDate: "23/04/2023",
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  },
  {
    id: 124,
    name: "Sinopec",
    revenue: 0.001,
    dueDate: "23/04/2023",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  },
  {
    id: 125,
    name: "ExxonMobil",
    revenue: 0.001,
    dueDate: "23/04/2023",
    address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  },
  {
    id: 126,
    name: "Chevron",
    revenue: 0.001,
    dueDate: "23/04/2023",
    address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  },
  {
    id: 127,
    name: "Royal Dutch Shell",
    revenue: 0.001,
    dueDate: "23/04/2023",
    address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
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
