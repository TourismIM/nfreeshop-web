import BottomNav from "@/components/BottomNav";
import MapClient from "@/components/MapClient";
import { MOCK_MERCHANTS, MOCK_COUPONS, MOCK_CATEGORIES } from "@/lib/mock-data";

export default function MapPage() {
  const merchantsWithCoupons = MOCK_MERCHANTS.map((m) => ({
    ...m,
    couponCount: MOCK_COUPONS.filter((c) => c.merchantId === m.id).length,
    category: MOCK_CATEGORIES.find((cat) => cat.id === m.categoryId),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#0B1A30] text-white px-4 pt-12 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-bold">Coupon Map</h1>
          <p className="text-xs text-[#D4AF37] mt-0.5">Find deals near you</p>
        </div>
      </div>
      <div className="flex-1 relative" style={{ height: "calc(100vh - 160px)" }}>
        <MapClient merchants={merchantsWithCoupons} />
      </div>
      <BottomNav />
    </div>
  );
}
