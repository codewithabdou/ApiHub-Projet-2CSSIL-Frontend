import Navbar from "@app/components/Shared/Navbar";
import { Footer, Testemonies } from "./components/home";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <Testemonies />
        <Footer />
      </main>
    </>
  );
}
