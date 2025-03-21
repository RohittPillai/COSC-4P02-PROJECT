import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-3 py-6 text-center">
      <h1 className="text-3xl font-bold">Billing Success</h1>
      <p>
        Your checkout was successful, and your subscription has been activated.
        Enjoy!
      </p>
      <Link
        href="/resumes"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition"
      >
        Go to Resumes
      </Link>
    </main>
  );
}