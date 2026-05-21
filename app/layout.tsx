import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N FREE SHOP — Korea Coupon & Tour Platform",
  description: "Discover exclusive coupons for restaurants, shopping, and experiences across South Korea. Free for international tourists.",
  keywords: ["Korea coupon", "Korea discount", "Incheon", "duty free", "K-beauty", "FIT travel Korea"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
