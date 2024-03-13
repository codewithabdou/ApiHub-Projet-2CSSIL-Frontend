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
    <div>
      <Banner />
        <CreateCategoryForm />
      <Footer />
    </div>
  );
};

export default TestPage;
