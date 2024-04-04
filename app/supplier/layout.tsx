import HeaderUserActions from "@app/components/Shared/Dashboard Layout/HeaderUserActions";
import HeaderMobile from "@app/components/Shared/Dashboard Layout/header-mobile";
import MarginWidthWrapper from "@app/components/Shared/Dashboard Layout/margin-width-wrapper";
import PageWrapper from "@app/components/Shared/Dashboard Layout/page-wrapper";
import SideNav from "@app/components/Shared/Dashboard Layout/side-nav";
import { SUPPLIER_SIDENAV_ITEMS } from "@config/sidNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplier Dashboard",
  description: "Supplier Dashboard",
};

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav items={SUPPLIER_SIDENAV_ITEMS} />
      <main className="flex-1">
        <MarginWidthWrapper>
          <HeaderUserActions />
          <HeaderMobile items={SUPPLIER_SIDENAV_ITEMS} />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
