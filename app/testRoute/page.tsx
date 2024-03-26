import DetailedCategory from "@app/admin/categories/[categoryId]/page";
import AdminProfile from "@app/components/home/AdminProfile";
import ContactUs from "@app/components/home/ContactUs";

// this is a test page to test the components you are working on
const TestPage = () => {
  return (

    <div className="flex min-h-screen flex-col p-4">
      <DetailedCategory params={{ categoryId: 1 }} searchParams={{}} />
      <AdminProfile/>
    </div>
  );











  
};

export default TestPage;
