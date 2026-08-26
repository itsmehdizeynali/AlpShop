import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { LoginForms } from "@/validations/auth/login";
import type { RegisterForms } from "@/validations/auth/register";


export const authRegisterService = async ({formData,role}:{formData: RegisterForms,role:"ADMIN"|"USER"}) => {  
  const dataBody={...formData,role}
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, dataBody, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const authLoginService =async (formData: LoginForms) => {
  const data =await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, formData);
  return(data)
};

export const authLogoutService =async () => {
  const data =await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  return(data)
};
