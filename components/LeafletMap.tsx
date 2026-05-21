"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix Leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

const couponIcon = (count: number) =>
  L.divIcon({
    html: `<div style="background:#0B1A30;color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;border:2px solid #D4AF37;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${count}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

export default function LeafletMap({ merchants }: { merchants: Merchant[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <MapContainer
      center={[37.4563, 126.7052]}
      zoom={10}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {merchants.map((m) => (
        <Marker key={m.id} position={[m.lat, m.lng]} icon={couponIcon(m.couponCount)}>
          <Popup>
            <div className="text-sm min-w-[160px]">
              <p className="font-bold text-gray-900">{m.nameEn ?? m.nameKo}</p>
              <p className="text-gray-500 text-xs">{m.nameKo}</p>
              <p className="text-[#D4AF37] font-semibold text-xs mt-1">{m.couponCount} coupon(s) available</p>
              {m.category && <p className="text-gray-400 text-xs">{m.category.icon} {m.category.nameEn}</p>}
              <Link href={`/coupons?merchant=${m.id}`} className="mt-2 block text-center bg-[#0B1A30] text-white rounded-lg py-1 text-xs">
                View Coupons
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
