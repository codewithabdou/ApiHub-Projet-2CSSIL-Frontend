import {
  Banner,
  Nosservices,
  OurApis,
  Testemonies,
  Footer,
} from "@app/components/home";
import CreateSupplierForm from "@app/components/home/CreateSupplier";
import Getsupplier from "@app/components/home/Getsupplier";

// this is a test page to test the components you are working on
const TestPage = () => {
  return (
    <div>
      <Banner />
      <CreateSupplierForm/>

      <Getsupplier/>
      <Nosservices />
      <OurApis />
      <Testemonies />
      <Footer />
    </div>
  );
};

export default TestPage;
