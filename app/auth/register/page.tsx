import NavbarUserActions from "@app/components/Shared/Landing page layout/NavbarUserActions";
import RegisterForm from "@app/components/auth/RegisterForm";
import { IMAGES } from "@config";

export default function LoginPage() {
  return (
    <>
      <NavbarUserActions />
      <main className=" min-h-screen py-[20%]  px-4 lg:py-[6%] lg:px-[10%] border-4  flex flex-row justify-center  gap-10 ">
        <div className="flex-1 ">
          <p className="font-bold mb-4 text-3xl  text-center  text-primary lg:w-4/5">Rejoignez Notre Platforme :  </p>
        <RegisterForm />
        </div>
        <img
          className="hidden lg:block w-1/2 h-full object-cover"
          src={IMAGES.SIGN_UP_STORY_SET}
          alt="SIGN UP STORY SET"
        />
      </main>
    </> 
  );
}
