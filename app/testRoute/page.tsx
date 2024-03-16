import CreateCategoryForm from "@app/components/Admin/CreateCategoryForm";
import {
  Banner,
  Nosservices,
  OurApis,
  Testemonies,
  Footer,
} from "@app/components/home";


// this is a test page to test the components you are working on
const TestPage = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[100vh] border border-4">
      
        <CreateCategoryForm />
    </div>
  );
};

export default TestPage;
