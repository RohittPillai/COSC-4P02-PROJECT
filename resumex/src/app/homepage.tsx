import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />  {/* Header appears at the top */}
        <main className="flex-grow">{children}</main>  {/* Page content grows to fill space */}
        <Footer />  {/* Footer appears at the bottom */}
      </body>
    </html>
  );
}
