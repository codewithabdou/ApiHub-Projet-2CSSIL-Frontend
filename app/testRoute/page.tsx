import CreateSupplierForm from "@app/components/Admin/CreateSupplier";
import CreateApiVersionForm from "@app/components/Provider/CreateAPIVersionForm";

// this is a test page to test the components you are working on
const TestPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly  p-4 lg:p-[10%]">
      <CreateApiVersionForm />
      <CreateSupplierForm />
    </div>
  );
};

export default TestPage;
