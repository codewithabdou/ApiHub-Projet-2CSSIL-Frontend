import Navbar from "@app/components/Shared/Navbar";
import { Footer, Testemonies, OurApis, Banner } from "./components/home";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Banner />
        <OurApis />
        <Testemonies />
        <Footer />
      </main>
    </div>
  );
}
