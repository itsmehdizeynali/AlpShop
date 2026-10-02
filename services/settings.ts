import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";

export const getSettingService = async (key: string) => {
  const response = await apiClient.get(API_ENDPOINTS.SETTINGS(key));
  return response?.data;
};
