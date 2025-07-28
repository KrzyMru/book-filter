import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "./components/navigation-bar";

export const metadata: Metadata = {
  title: "Book Filter",
  icons: "/book-filter.svg",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body className="overflow-hidden antialiased">
        <NavigationBar />
        <div className="h-[calc(100dvh-66px)]">
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
