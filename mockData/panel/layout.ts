"use client";

import type { DashboardResponse } from "@/types/panel/usedashboardData";

const dataPanelLayout = (panelData: DashboardResponse | null) => {

  const menuItems =
    panelData?.user.role === "ADMIN"
      ? [
          {
            name: "admin",
            href: "/panel/admin",
            icon: "icon-avatar1",
          },
          {
            name: "challenges",
            href: "/panel/admin/challenges",
            icon: "icon-ticket",
          },
          {
            name: "add new challenge",
            href: "/panel/admin/challenges/add",
            icon: "icon-ticket",
          },
        ]
      : [
          {
            name: "dashboard",
            href: "/panel",
            icon: "icon-trash-can",
          },
          {
            name: "buy challenge",
            href: "/panel/challenges/buy",
            icon: "icon-ticket",
          },
          {
            name: "my challenges",
            href: "/panel/challenges",
            icon: "icon-ticket1",
            chip: `${panelData?.totalChallenges || 0}`,
          },
          {
            name: "wallet",
            href: "/panel/wallet",
            icon: "icon-dollar-circle",
            chip: `${panelData?.walletBalance || 0} $`,
          },
          {
            name: "notes",
            href: "/panel/notes",
            icon: "icon-edit1",
            chip: `${panelData?.totalNotes || 0}`,
          },
          {
            name: "users",
            href: "/panel/users",
            icon: "icon-user",
          },
          {
            name: "calendar",
            href: "/panel/calendar",
            icon: "icon-calendar",
          },
        ];
  const pageNames =
    panelData?.user.role === "ADMIN"
      ? [
          {
            name: "admin",
            href: "/panel/admin",
          },
          {
            name: "challenges",
            href: "/panel/admin/challenges",
          },
          {
            name: "add new challenge",
            href: "/panel/admin/challenges/add",
          },
        ]
      : [
          {
            name: "dashboard",
            href: "/panel",
          },
          {
            name: "buy challenge",
            href: "/panel/challenges/buy",
          },
          {
            name: "my challenges",
            href: "/panel/challenges",
          },
          {
            name: "wallet",
            href: "/panel/wallet",
          },
          {
            name: "notes",
            href: "/panel/notes",
          },
          {
            name: "add note",
            href: "/panel/notes/add",
          },
          {
            name: "edit note",
            href: "/panel/notes/edit",
          },
          {
            name: "calendar",
            href: "/panel/calendar",
          },
          {
            name: "notifications",
            href: "/panel/notifications",
          },
          {
            name: "chats",
            href: "/panel/chats",
          },
          {
            name: "profile",
            href: "/panel/profile",
          },
          {
            name: "users",
            href: "/panel/users",
          },
          {
            name: "transactions",
            href: "/panel/wallet/transactions",
          },
          {
            name: "charge wallet",
            href: "/panel/wallet/charge",
          },
          {
            name: "withdraw",
            href: "/panel/wallet/withdraw",
          },
        ];

  return { menuItems, pageNames };
};

export default dataPanelLayout;
