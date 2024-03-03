import Navbar from "@app/components/Shared/Navbar";
import {
  Footer,
  Testemonies,
  OurApis,
  Banner,
  Nosservices,
} from "./components/home";

export default function Home() {
  return (
    <div>
      <Navbar />
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
