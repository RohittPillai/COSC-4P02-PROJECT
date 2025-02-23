import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

import { LoginForm } from "~/components/login-form";

export default function LoginPage() {
  return (
    // TODO: Check if this is the correct way to add the header to pages
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col items-center self-center gap-10">
            <Image
            src="/transparent_black_main_logo.png" // Path to logo in the public folder
            alt="ResumeX"
            width={200} // Adjust width
            height={200} // Adjust height
            />
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
