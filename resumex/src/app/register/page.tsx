import Header from "~/components/ui/Header";
import Image from "next/image";
import { RegisterForm } from "~/components/register-form";

export default function RegisterPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col items-center self-center">
          <Image
            src="/main_logo.png"
            alt="ResumeX"
            width={200}
            height={200}
          />
          <RegisterForm />
        </div>
      </div>
    </>
  );
}