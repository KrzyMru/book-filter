import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "./components/navigation-bar/navigation-bar";

export const metadata: Metadata = {
  title: "Book Filter",
  icons: "/book-filter.svg",
};

const RootLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body className="flex flex-col h-dvh overflow-hidden antialiased">
        <NavigationBar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
