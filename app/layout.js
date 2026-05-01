import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Semesta Esports",
  description: "Semesta Esports adalah platform dan komunitas yang menghadirkan turnamen esports kompetitif, profesional dan terbuka untuk semua.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}