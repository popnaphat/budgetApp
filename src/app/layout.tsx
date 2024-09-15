import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Application",
  description: "CRUD BudgetList",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-black text-white border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <nav className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold">
                Home
              </Link>
              <Link href="/entry" className="text-sm hover:text-gray-400">
                Entry
              </Link>
              <Link href="/approval" className="text-sm hover:text-gray-400">
                Approval
              </Link>
            </nav>
            <div className="text-sm">
              admin@test.com |{" "}
              <Link href="/logout" className="text-blue-400 hover:underline">
                Logout
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
