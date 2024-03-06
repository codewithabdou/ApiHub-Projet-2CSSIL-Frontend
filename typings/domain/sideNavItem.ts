import { ReactNode } from "react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: ReactNode;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
