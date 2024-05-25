import { MdDashboard, MdReportProblem, MdSettings } from "react-icons/md";
import { FaBox, FaFolder, FaUser } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";

import { SideNavItem } from "@typings/domain/sideNavItem";
import React from "react";

export const ADMIN_SIDENAV_ITEMS: SideNavItem[] = [
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
    title: "Categories",
    path: "/admin/categories",
    icon: React.createElement(FaFolder),
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
    title: "Mon profile",
    path: "/admin/settings",
    icon: React.createElement(MdSettings),
  },
];

export const SUPPLIER_SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/supplier",
    icon: React.createElement(MdDashboard),
  },
  {
    title: "APIs",
    path: "/supplier/apis",
    icon: React.createElement(FaBox),
  },
  {
    title: "Mon profile",
    path: "/supplier/profile",
    icon: React.createElement(FaUser),
  },
];
