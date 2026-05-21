"use client";
import { QRCodeSVG } from "qrcode.react";

export default function QRDisplay({ value }: { value: string }) {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-xl border border-gray-200 inline-block">
        <QRCodeSVG value={value} size={160} level="M" />
      </div>
    </div>
  );
}
