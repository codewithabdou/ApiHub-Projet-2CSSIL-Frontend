import CreateApiForm from "@app/components/Provider/CreateApiForm";
import {
  Banner,
  Nosservices,
  OurApis,
  Testemonies,
  Footer,
} from "@app/components/home";
import CreateSupplierForm from "@app/components/Admin/CreateSupplier";

// this is a test page to test the components you are working on
const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly  p-4 lg:p-[10%]">
     <CreateApiForm/>

      <CreateSupplierForm />
    </div>
  );
};

export default TestPage;
