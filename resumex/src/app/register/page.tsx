import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";
import { RegisterForm } from "~/components/register-form";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col items-center self-center">
          <Image
            src="/main_logo.png"
            alt="ResumeX"
            width={300}
            height={300}
          />
          <RegisterForm />
        </div>
      </div>
      <Footer />
    </>
  );
}