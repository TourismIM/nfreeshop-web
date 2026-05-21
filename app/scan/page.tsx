import BottomNav from "@/components/BottomNav";
import QRScanner from "@/components/QRScanner";

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col pb-20">
      <div className="bg-[#0B1A30] text-white px-4 pt-12 pb-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-bold">QR Scan</h1>
          <p className="text-xs text-[#D4AF37] mt-0.5">Scan merchant QR → get coupon instantly</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <QRScanner />
        <div className="mt-6 text-center text-gray-400 max-w-xs">
          <p className="text-sm font-medium text-white mb-1">QR 역방향 스캔</p>
          <p className="text-xs">Scan the QR code at any N FREE SHOP partner merchant. Your coupon activates immediately — no searching needed.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
