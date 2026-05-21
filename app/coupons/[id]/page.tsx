"use client";
import { useParams } from "next/navigation";
import { MOCK_COUPONS, MOCK_MERCHANTS } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import QRDisplay from "@/components/QRDisplay";
import BarcodeDisplay from "@/components/BarcodeDisplay";

const REDEEM_LABELS: Record<string, string> = {
  SCREEN: "화면 제시 — 이 화면을 직원에게 보여주세요",
  BARCODE: "바코드 스캔 — 직원이 바코드를 스캔합니다",
  QR_REVERSE: "QR 역방향 — 매장 QR코드를 스캔하세요",
};

const TYPE_LABELS: Record<string, (v: number) => string> = {
  PERCENT: (v) => `${v}% Discount`,
  FIXED: (v) => `₩${v.toLocaleString()} Off`,
  GIFT: () => "Free Gift",
};

export default function CouponDetailPage() {
  const { id } = useParams<{ id: string }>();
  const coupon = MOCK_COUPONS.find((c) => c.id === id);
  const merchant = coupon ? MOCK_MERCHANTS.find((m) => m.id === coupon.merchantId) : null;

  if (!coupon || !merchant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-400">Coupon not found</p>
        <Link href="/coupons" className="mt-4 text-blue-600 underline">Back to coupons</Link>
      </div>
    );
  }

  const discountLabel = TYPE_LABELS[coupon.couponType]?.(coupon.discountValue) ?? "";
  const endsAt = new Date(coupon.endsAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero image */}
      <div className="relative h-56 bg-gray-200">
        {coupon.thumbnailUrl && (
          <Image src={coupon.thumbnailUrl} alt={coupon.titleEn ?? coupon.titleKo} fill className="object-cover" unoptimized />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Link href="/coupons" className="absolute top-12 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="bg-[#D4AF37] text-white text-sm font-bold px-3 py-1 rounded-full">
            {discountLabel}
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <p className="text-xs text-[#0B1A30] font-medium mb-1">{merchant.nameEn ?? merchant.nameKo}</p>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">{coupon.titleEn ?? coupon.titleKo}</h1>
          {coupon.titleKo !== (coupon.titleEn ?? coupon.titleKo) && (
            <p className="text-sm text-gray-500 mt-1">{coupon.titleKo}</p>
          )}
          {coupon.titleJa && <p className="text-sm text-gray-400">{coupon.titleJa}</p>}
          {coupon.descEn && <p className="text-sm text-gray-600 mt-3">{coupon.descEn}</p>}

          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {merchant.addressEn ?? merchant.addressKo}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
            <Clock size={14} />
            Valid until {endsAt}
          </div>
        </div>

        {/* Redemption section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-3">How to use</h2>
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{REDEEM_LABELS[coupon.redeemMode]}</p>
          </div>

          {coupon.redeemMode === "SCREEN" && (
            <div className="bg-[#0B1A30] rounded-xl p-4 text-center text-white">
              <div className="text-5xl font-black mb-1">{discountLabel}</div>
              <div className="text-sm opacity-70">{coupon.titleEn ?? coupon.titleKo}</div>
              <div className="text-xs opacity-50 mt-2">Show this screen to staff • {endsAt}까지</div>
            </div>
          )}

          {coupon.redeemMode === "BARCODE" && (
            <BarcodeDisplay value={coupon.barcodeValue ?? coupon.id} label={discountLabel} />
          )}

          {coupon.redeemMode === "QR_REVERSE" && (
            <div className="text-center">
              <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800 mb-3">
                📷 Scan the QR code at the merchant location — your coupon will activate automatically!
              </div>
              <QRDisplay value={`https://nfreeshop.vercel.app/redeem/${coupon.id}`} />
            </div>
          )}
        </div>

        {/* Get coupon button */}
        <button className="w-full bg-[#0B1A30] text-white font-semibold py-4 rounded-2xl text-base hover:bg-[#1a2f4f] transition-colors">
          Save Coupon 쿠폰 저장
        </button>
      </div>
    </div>
  );
}
