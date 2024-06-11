import Navbar from "@app/components/Shared/Landing page layout/Navbar";
import {
  Footer,
  Testemonies,
  OurApis,
  Banner,
  Nosservices,
} from "./components/home";
import NavbarUserActions from "./components/Shared/Landing page layout/NavbarUserActions";
import AboutUs from "./components/home/AboutUs";

export default function Home() {
  return (
    <div>
      <NavbarUserActions />
      <main>
        <Banner />
        <AboutUs/>
        <Nosservices />
        <Testemonies />
        <Footer />
      </main>
    </div>
  );
}
