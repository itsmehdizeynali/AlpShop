interface DashboardUser {
  id: string;
  name: string | null;
  email: string;
  password: string;
  avatar: string | null;
  role: "USER" | "ADMIN";
  createdAt: string | Date;
  updatedAt: string | Date;
  bio: null | string;
  theme: string;
}

interface Chats {
  userId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: string;
  color: string;
}

export interface DashboardResponse {
  user: DashboardUser;
  walletBalance: number;
  totalChallenges: number;
  totalNotes: number;
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  chats: Chats[];
}
