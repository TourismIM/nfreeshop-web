"use client";
import Link from "next/link";
import Image from "next/image";

type Coupon = {
  id: string;
  titleKo: string;
  titleEn: string | null;
  descKo: string | null;
  descEn: string | null;
  couponType: string;
  discountValue: number;
  redeemMode: string;
  thumbnailUrl: string | null;
  merchant: { nameKo: string; nameEn: string | null; categoryId: string | null };
  endsAt: Date | string;
};

const REDEEM_LABELS: Record<string, { label: string; color: string }> = {
  SCREEN: { label: "화면제시", color: "bg-blue-100 text-blue-700" },
  BARCODE: { label: "바코드", color: "bg-purple-100 text-purple-700" },
  QR_REVERSE: { label: "QR역방향", color: "bg-green-100 text-green-700" },
};

const TYPE_LABELS: Record<string, (v: number) => string> = {
  PERCENT: (v) => `${v}% OFF`,
  FIXED: (v) => `₩${v.toLocaleString()} OFF`,
  GIFT: () => "FREE GIFT",
};

export default function CouponCard({ coupon, lang = "en" }: { coupon: Coupon; lang?: string }) {
  const title = lang === "ko" ? coupon.titleKo : (coupon.titleEn ?? coupon.titleKo);
  const merchantName = lang === "ko" ? coupon.merchant.nameKo : (coupon.merchant.nameEn ?? coupon.merchant.nameKo);
  const discountLabel = TYPE_LABELS[coupon.couponType]?.(coupon.discountValue) ?? "";
  const redeemInfo = REDEEM_LABELS[coupon.redeemMode];
  const endsAt = new Date(coupon.endsAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <Link href={`/coupons/${coupon.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative h-40 bg-gray-100">
          {coupon.thumbnailUrl ? (
            <Image src={coupon.thumbnailUrl} alt={title} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">🎫</div>
          )}
          <div className="absolute top-2 right-2 bg-[#D4AF37] text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountLabel}
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-400 mb-0.5 truncate">{merchantName}</p>
          <h3 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${redeemInfo?.color}`}>
              {redeemInfo?.label}
            </span>
            <span className="text-xs text-gray-400">~ {endsAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
