import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { AdminChallengeForms } from "@/validations/panel/adminChallenge";

export const adminChallengesService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.ADMIN.ChallengeS);
  return data.data;
};
export const adminAddChallengeService = async (formData:AdminChallengeForms) => {
  const dataBody = {
      ...formData,
      duration: Number(formData.duration),
      price: Number(formData.price),
      reward: Number(formData.reward),
      target: Number(formData.target),
    }
  const data = await apiClient.post(API_ENDPOINTS.ADMIN.ADD_Challenge,dataBody);
  return data.data;
};