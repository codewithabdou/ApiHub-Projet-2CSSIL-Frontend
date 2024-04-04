import HeaderUserActions from "@app/components/Shared/Dashboard Layout/HeaderUserActions";
import HeaderMobile from "@app/components/Shared/Dashboard Layout/header-mobile";
import MarginWidthWrapper from "@app/components/Shared/Dashboard Layout/margin-width-wrapper";
import PageWrapper from "@app/components/Shared/Dashboard Layout/page-wrapper";
import SideNav from "@app/components/Shared/Dashboard Layout/side-nav";
import { ADMIN_SIDENAV_ITEMS } from "@config/sidNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav items={ADMIN_SIDENAV_ITEMS} />
      <main className="flex-1">
        <MarginWidthWrapper>
          <HeaderUserActions />
          <HeaderMobile items={ADMIN_SIDENAV_ITEMS} />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
