import Navbar from "@app/components/Shared/Landing page layout/Navbar";
import RegisterForm from "@app/components/auth/RegisterForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-evenly p-4 lg:p-[10%]">
        <RegisterForm />
      </main>
    </>
  );
}
