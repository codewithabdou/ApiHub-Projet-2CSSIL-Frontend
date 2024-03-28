import DetailedCategory from "@app/admin/categories/[categoryId]/page";
import AdminProfile from "@app/components/home/AdminProfile";
import ContactUs from "@app/components/home/ContactUs";
import SingleUser from "@app/components/home/SingleUser";

// this is a test page to test the components you are working on
const TestPage = () => {
  return (

    <div className="flex min-h-screen flex-col p-4">
      <DetailedCategory params={{ categoryId: 1 }} searchParams={{}} />
      <AdminProfile/>
      <SingleUser idSupplier="3" />
    </div>
  );











  
};

export default TestPage;
