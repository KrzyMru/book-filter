import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Filter",
  icons: "/book-filter.svg",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="w-full bg-red-100 h-20">Search bar here</div>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
