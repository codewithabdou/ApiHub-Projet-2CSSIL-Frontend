import Footer from "@app/components/home/Footer";
import Testemonies from "@app/components/home/Testemonies";
import Banner from "@app/components/home/Banner";
import React from "react";
import Nosservices from "@app/components/home/Nosservices";

// this is a test page to test the components you are working on

const TestPage = () => {
  return (
    <div>
      <Banner/>
      <Nosservices/>
      <Testemonies/>
      <Footer />
    </div>
  );
};

export default TestPage;
