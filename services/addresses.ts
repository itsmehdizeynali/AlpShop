import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { AddressType } from "@/components/genericTypes";

export const getAddressesService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ADDRESSES.BASE);
  return response?.data?.addresses as AddressType[];
};

export type AddressInput = {
  fullName: string;
  phone: string;
  countryPhoneCode?: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isDefault?: boolean;
};

export const createAddressService = async (data: AddressInput) => {
  const response = await apiClient.post(API_ENDPOINTS.ADDRESSES.BASE, data);
  return response?.data;
};

export const updateAddressService = async ({ id, ...data }: Partial<AddressInput> & { id: string }) => {
  const response = await apiClient.patch(API_ENDPOINTS.ADDRESSES.DETAIL(id), data);
  return response?.data;
};

export const removeAddressService = async (id: string) => {
  const response = await apiClient.delete(API_ENDPOINTS.ADDRESSES.DETAIL(id));
  return response?.data;
};
