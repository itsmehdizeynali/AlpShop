import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { orderType, statsDataType } from "@/components/genericTypes";

export const getProfileService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROFILE);

  return response?.data?.user;
};
export const getAccountStatsService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ACCOUNT.STATS);
  console.log(response.data);

  return response?.data?.stats as statsDataType;
};
export const getOrdersService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.BASE);
  console.log(response.data);

  return response?.data?.orders as orderType[];
};
