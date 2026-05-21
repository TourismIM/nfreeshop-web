import BottomNav from "@/components/BottomNav";
import CouponCard from "@/components/CouponCard";
import { MOCK_COUPONS, MOCK_MERCHANTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Search, SlidersHorizontal } from "lucide-react";

export default function CouponsPage({
  searchParams,
}: {
  searchParams: { cat?: string; q?: string };
}) {
  const { cat, q } = searchParams;

  const coupons = MOCK_COUPONS
    .filter((c) => {
      if (cat && cat !== "all") return c.categoryId === cat;
      return true;
    })
    .filter((c) => {
      if (!q) return true;
      const s = q.toLowerCase();
      const merchant = MOCK_MERCHANTS.find((m) => m.id === c.merchantId);
      return (
        c.titleEn?.toLowerCase().includes(s) ||
        c.titleKo.toLowerCase().includes(s) ||
        merchant?.nameEn?.toLowerCase().includes(s) ||
        merchant?.nameKo.toLowerCase().includes(s)
      );
    })
    .map((c) => ({
      ...c,
      merchant: MOCK_MERCHANTS.find((m) => m.id === c.merchantId) ?? {
        nameKo: "", nameEn: null, categoryId: null,
      },
    }));

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-[#0B1A30] text-white px-4 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">N FREE SHOP</h1>
              <p className="text-[#D4AF37] text-xs mt-0.5">Korea Coupon & Tour Platform</p>
            </div>
            <div className="text-3xl">🇰🇷</div>
          </div>
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <form>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search coupons, shops..."
                className="w-full bg-white/10 text-white placeholder-white/50 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:bg-white/20"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          {[{ id: "all", nameEn: "All", icon: "🎯" }, ...MOCK_CATEGORIES].map((c) => (
            <a
              key={c.id}
              href={`/coupons?cat=${c.id}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                (cat ?? "all") === c.id
                  ? "bg-[#0B1A30] text-white border-[#0B1A30]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#0B1A30]"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameEn}</span>
            </a>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{coupons.length}</span> coupons found
          </p>
          <button className="flex items-center gap-1 text-sm text-gray-500">
            <SlidersHorizontal size={14} />
            Filter
          </button>
        </div>

        {/* Coupon grid */}
        {coupons.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-sm">No coupons found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
