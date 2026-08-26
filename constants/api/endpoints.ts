const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
  DASHBOARD: {
    BASE: "/dashboard",
    PERFORMANCE:"/dashboard/performance",

    
    CHATS: "/chats",
    SEEN_MESSAGES: "/chats/seen",
    MESSAGES: "/messages",
    USERS: "/users",

    CHALLENGES: "/challenges",
    BUY_CHALLENGE: "/challenges/buy",

    WALLET: {
      BASE:"/wallet",
      TRANSACTIONS:"/wallet/transactions",
    },

    CALENDAR: "/calendar",

    NOTIFICATIONS: "/notifications",
    
    NOTES: "/notes",

    PROFILE: "/profile",
  },
  ADMIN:{
    ChallengeS:"/admin/challenges",
    ADD_Challenge:"/admin/challenges"
  }
};

export default API_ENDPOINTS;
