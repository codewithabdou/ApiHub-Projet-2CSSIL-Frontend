import Header from "@app/components/Shared/Dashboard Layout/header";
import HeaderMobile from "@app/components/Shared/Dashboard Layout/header-mobile";
import MarginWidthWrapper from "@app/components/Shared/Dashboard Layout/margin-width-wrapper";
import PageWrapper from "@app/components/Shared/Dashboard Layout/page-wrapper";
import SideNav from "@app/components/Shared/Dashboard Layout/side-nav";
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
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
