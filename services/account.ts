import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { statsDataType } from "@/components/genericTypes";

export const getProfileService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.PROFILE);

  return response?.data?.user;
};

export const updateProfileService = async (data: {
  name?: string;
  email?: string;
  phone?: string;
  countryPhoneCode?: string;
}) => {
  const response = await apiClient.put(API_ENDPOINTS.PROFILE, data);
  return response?.data;
};

export const getAccountStatsService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ACCOUNT.STATS);
  console.log(response.data);

  return response?.data?.stats as statsDataType;
};


export const getOrdersService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.BASE);
  console.log(response.data);

  return response?.data ;
};
export const getOrderService = async (id: string) => {
  const response = await apiClient.get(API_ENDPOINTS.ORDERS.DETAIL(id));
  return response?.data?.order;
};

export const getReturnRequestsService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.RETURNS);
  return response?.data;
};

export const getAccountSpendingService = async (params?: { page?: number; pageSize?: number }) => {
  const response = await apiClient.get(API_ENDPOINTS.ACCOUNT_SPENDING, { params });
  return response?.data;
};


export const requestReturnService = async ({ orderId, reason }: { orderId: string; reason: string }) => {
  const response = await apiClient.post(API_ENDPOINTS.ORDERS.RETURN(orderId), { reason });
  return response;
};