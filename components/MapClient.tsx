"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false, loading: () => (
  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
    <div className="text-gray-400 text-sm">Loading map...</div>
  </div>
)});

type Merchant = {
  id: string;
  nameKo: string;
  nameEn: string | null;
  lat: number;
  lng: number;
  couponCount: number;
  category?: { nameEn: string; icon?: string | null } | null;
  thumbnailUrl: string | null;
};

export default function MapClient({ merchants }: { merchants: Merchant[] }) {
  return <LeafletMap merchants={merchants} />;
}
