import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Semesta Esports",
  description: "Semesta Esports adalah platform dan komunitas yang menghadirkan turnamen esports kompetitif, profesional dan terbuka untuk semua.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}