import Navbar from "@app/components/Shared/Navbar";
import { Footer, Testemonies, OurApis, Banner } from "./components/home";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <Banner />
        <OurApis />
        <Testemonies />
        <Footer />
      </main>
    </>
  );
}
