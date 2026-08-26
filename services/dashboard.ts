import API_ENDPOINTS from "@/constants/api/endpoints";
import apiClient from "./apiClient";
import type { PnaleChallengeType } from "@/components/panel/types";

// layout | dashbord
export const dashboardBaseService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.BASE);
  return data?.data;
};
export const dashboardPerformanceService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.PERFORMANCE);
  return data?.data;
};



// chat
export const dashboardChatsService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.CHATS);
  return data?.data;
};
export const dashboardChatItemService = async ({ id }: { id: string }) => {
  const response = await apiClient.get(
    `${API_ENDPOINTS.DASHBOARD.CHATS}/${id}`,
  );
  return response.data;
};
export const dashboardSendMessageService = async ({
  chatId,
  content,
}: {
  chatId?: string;
  content?: string;
}) => {
  const response = await apiClient.post(API_ENDPOINTS.DASHBOARD.MESSAGES, {
    chatId,
    content,
  });
  return response.data;
};
export const dashboardMessageService = async (
  id: string,
  content?: string | null,
) => {
  if (!content) {
    const response = await apiClient.delete(`${API_ENDPOINTS.DASHBOARD.MESSAGES}/${id}`);
    return response.data;
  } else {
    const response = await apiClient.put(`${API_ENDPOINTS.DASHBOARD.MESSAGES}/${id}`, { newContent:content });
    return response.data;
  }
};
export const dashboardCreateChatService = async (id: string) => {
  const response = await apiClient.post(API_ENDPOINTS.DASHBOARD.CHATS, {
    targetUserId: id,
  });
  return response.data;
};
export const dashboardSeenMessages = async (chatId: string) => {
  const response = await apiClient.post(API_ENDPOINTS.DASHBOARD.SEEN_MESSAGES, {
    chatId,
  });
  return response.data;
};

// user
export const dashboardUsersService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.USERS);
  return data.data;
};
export const dashboardUserService = async (id:string) => {
  const data = await apiClient.get(`${API_ENDPOINTS.DASHBOARD.USERS}/${id}`);
  return data.data;
};

// challenges
export const dashboardChallengesService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.CHALLENGES);
  return data.data;
};
export const dashboardChallengesSingleService = async (id:string) => {
  const data = await apiClient.get(`${API_ENDPOINTS.DASHBOARD.CHALLENGES}/${id}`);
  return data.data;
};
export const dashboardBuyChallengesListService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.BUY_CHALLENGE);
  return data.data;
};
export const dashboardChallengesSinglePaymentService = async ({id,amount}:{id:string,amount:number}) => {
  const data = await apiClient.post(`${API_ENDPOINTS.DASHBOARD.CHALLENGES}`,{userChallengeId:id,amount});
  return data.data;
};
export const dashboardBuyChallengeService = async (challengeData:PnaleChallengeType) => {
  
  const data = await apiClient.post(API_ENDPOINTS.DASHBOARD.BUY_CHALLENGE,challengeData);
  return data.data;
};

// wallet
export const dashboardWalletService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.WALLET.BASE);  
  return data.data;
};
export const dashboardWalletTransactionsService = async ({page=1,limit=10}:{page:number,limit:number}) => {
  const data = await apiClient.get(`${API_ENDPOINTS.DASHBOARD.WALLET.TRANSACTIONS}?page=${page}&limit=${limit}`);  
  return data.data;
};
export const dashboardWalletTransactionService = async (formData:{amount:number,type:"DEPOSIT"|"WITHDRAW"}) => {
  const data = await apiClient.post(API_ENDPOINTS.DASHBOARD.WALLET.BASE,formData);  
  return data.data;
};

// calendar
export const dashboardCalendarService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.CALENDAR);
  return data.data;
};

// notifications
export const dashboardNotificationsService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.NOTIFICATIONS);
  return data.data;
};
export const dashboardReadNotificationService = async (id:string) => {
  const data = await apiClient.put(API_ENDPOINTS.DASHBOARD.NOTIFICATIONS,{id});
  return data.data;
};

// notes
export const dashboardNotesService = async () => {
  const data = await apiClient.get(API_ENDPOINTS.DASHBOARD.NOTES);
  return data.data;
};
export const dashboardNoteService = async (id:string) => {
  const data = await apiClient.get(`${API_ENDPOINTS.DASHBOARD.NOTES}/${id}`);
  return data.data;
};
export const dashboardAddNoteService = async (formData:{title:string,content:string}) => {
  const data = await apiClient.post(API_ENDPOINTS.DASHBOARD.NOTES,formData);
  return data.data;
};
export const dashboardEditNoteService = async (formData:{id:string,title:string,content:string}) => {
  const data = await apiClient.put(API_ENDPOINTS.DASHBOARD.NOTES,formData);
  return data.data;
};

// profile
export const dashboardProfileService = async ({name, email, bio, theme}:{name:string, email:string, bio:string, theme:"dark"|"light",}) => {
  const data = await apiClient.put(API_ENDPOINTS.DASHBOARD.PROFILE,{name, email, bio, theme});
  return data.data;
};
