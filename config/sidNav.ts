import { MdDashboard, MdSettings } from "react-icons/md";
import { FaBox, FaUser } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";

import { SideNavItem } from "@typings/domain/sideNavItem";
import React from "react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: React.createElement(MdDashboard),
  },
  {
    title: "Fournisseurs",
    path: "/admin/suppliers",
    icon: React.createElement(FaBox),
  },
  {
    title: "Utilisateurs",
    path: "/admin/users",
    icon: React.createElement(FaUser),
  },
  {
    title: "Statistiques",
    path: "/admin/statistics",
    icon: React.createElement(ImStatsDots),
  },
  {
    title: "Paramètres",
    path: "/admin/settings",
    icon: React.createElement(MdSettings),
  },
];
