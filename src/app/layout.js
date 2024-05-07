import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-6xl mx-auto">
          <div className="border-r hidden sm:inline p-3 h-screen">
            <Sidebar />
          </div>
          <div>{children}</div>
          <div className="border-l p-3 lg:flex-col h-screen hidden lg:flex w-[24rem]">
            <div className="sticky top-0 bg-white py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
              />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
