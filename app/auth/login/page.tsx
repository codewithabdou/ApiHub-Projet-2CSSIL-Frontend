import NavbarUserActions from "@app/components/Shared/Landing page layout/NavbarUserActions";
import LoginForm from "@app/components/auth/LoginForm";
import { IMAGES } from "@config";

export default function LoginPage() {
  return (
    <>
      <NavbarUserActions />
      <main className=" min-h-screen py-[20%]  px-4 lg:py-[6%] lg:px-[10%]  flex flex-row justify-center  gap-10 ">
        <div className="flex-1 lg:flex-col lg:flex  items-center pt-12">
          <p className="font-bold mb-4 text-3xl  text-center text-primary  lg:w-4/5">Bienvenue sur 1001 API ! </p>
        <p className="mb-4">Veuillez entrer vos identifiants pour accéder à votre compte.</p>
        <LoginForm />
        </div>
        <img
          className="hidden lg:block w-1/2 h-full object-cover"
          src={IMAGES.LOGIN_STORY_SET}
          alt="SIGN UP STORY SET"
        />
      </main>
    </>
  );
}
