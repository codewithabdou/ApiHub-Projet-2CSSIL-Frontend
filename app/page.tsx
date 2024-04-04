import Navbar from "@app/components/Shared/Landing page layout/Navbar";
import {
  Footer,
  Testemonies,
  OurApis,
  Banner,
  Nosservices,
} from "./components/home";
import NavbarUserActions from "./components/Shared/Landing page layout/NavbarUserActions";

export default function Home() {
  return (
    <div>
      <NavbarUserActions />
      <main>
        <Banner />
        <Nosservices />
        <OurApis />
        <Testemonies />
        <Footer />
      </main>
    </div>
  );
}
