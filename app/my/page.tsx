"use client";
import BottomNav from "@/components/BottomNav";
import { Ticket, MapPin, Star, Globe, ChevronRight, LogIn } from "lucide-react";
import Link from "next/link";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文(简)", flag: "🇨🇳" },
  { code: "zh-TW", label: "中文(繁)", flag: "🇹🇼" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-[#0B1A30] text-white px-4 pt-12 pb-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🧳</span>
          </div>
          <h1 className="text-lg font-bold">Welcome, Traveler!</h1>
          <p className="text-gray-400 text-xs mt-1">Log in to save coupons & track your adventures</p>
          <Link
            href="/login"
            className="mt-4 inline-flex items-center gap-2 bg-[#D4AF37] text-black font-semibold px-6 py-2.5 rounded-full text-sm"
          >
            <LogIn size={16} />
            Sign In / Register
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-4 space-y-3">
        {/* My Coupons */}
        <Link href="/my/coupons" className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <Ticket size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">My Coupons</p>
              <p className="text-xs text-gray-400">Saved & redeemed</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </Link>

        {/* Nearby Recommendations */}
        <Link href="/map" className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <MapPin size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Nearby Deals</p>
              <p className="text-xs text-gray-400">Coupons within walking distance</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </Link>

        {/* Favorites */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
              <Star size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Favorites</p>
              <p className="text-xs text-gray-400">Sign in to save favorites</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={16} className="text-gray-500" />
            <p className="font-semibold text-gray-900 text-sm">Language</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-colors ${
                  lang.code === "en"
                    ? "bg-[#0B1A30] text-white border-[#0B1A30]"
                    : "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#0B1A30] rounded-2xl p-4 text-white">
          <p className="text-xs text-gray-400 mb-3">Platform Statistics</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-[#D4AF37]">100+</p>
              <p className="text-xs text-gray-400">Merchants</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#D4AF37]">200万+</p>
              <p className="text-xs text-gray-400">Page Views</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#D4AF37]">5</p>
              <p className="text-xs text-gray-400">Languages</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
