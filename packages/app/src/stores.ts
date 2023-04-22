import { LanguageEnum, Order, OrderDetails } from "./types";
import { readable, writable } from "svelte/store";

import type { Client } from "@wagmi/core";
import type { EthereumClient } from "@web3modal/ethereum";
import type { Web3Modal } from "@web3modal/html";
import type { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils.js";

export const ethereumClient = writable<EthereumClient>();
export const wagmiClient = writable<Client>();
export const web3Modal = writable<Web3Modal>();
export const providers = writable<{ [chainId: number]: ethers.providers.JsonRpcProvider }>();
export const signature = writable<string>("");
export const typedSignature = writable<string>("");

export const input = writable<string>("");
export const orders = writable<Order[]>([]);

export const currentLanguageSelected = writable<LanguageEnum>(LanguageEnum.EN);

export const orderDetails = writable<OrderDetails>({
  location: "Victory Gas Station - Pump 02",
  licensePlate: "1435EF",
  fuelAmount: "25.35",
  amount: parseEther("22.39"),
});
