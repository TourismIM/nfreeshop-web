"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Map, QrCode, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/coupons", icon: Ticket, label: "Coupons" },
  { href: "/map", icon: Map, label: "Map" },
  { href: "/scan", icon: QrCode, label: "Scan QR" },
  { href: "/my", icon: User, label: "My" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
                active ? "text-[#0B1A30]" : "text-gray-400"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[10px] font-medium ${active ? "text-[#0B1A30]" : "text-gray-400"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
