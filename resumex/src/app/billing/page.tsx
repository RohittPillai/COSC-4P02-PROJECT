"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";

export default function BillingPage() {
  return (
    <>
      <Header />

      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Billing Page
        </h1>
        <p className="text-lg text-gray-600 max-w-xl text-center">
          This section is under development. Soon, you’ll be able to manage your subscription, payment history, and invoices right here.
        </p>
      </main>

      <Footer />
    </>
  );
}
