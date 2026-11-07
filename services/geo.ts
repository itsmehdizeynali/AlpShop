import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";

export const getCountriesService = async () => {
  const response = await apiClient.get(API_ENDPOINTS.GEO.COUNTRIES);
  return response?.data?.countries;
};

export const getProvincesService = async (countryCode?: string) => {
  const response = await apiClient.get(API_ENDPOINTS.GEO.PROVINCES, { params: { country: countryCode } });
  
  return response?.data?.provinces;
};

export const getCitiesService = async (provinceId: string) => {
  const response = await apiClient.get(API_ENDPOINTS.GEO.CITIES, { params: { province: provinceId } });
  console.log(response.data);
  
  return response?.data?.cities;
};
