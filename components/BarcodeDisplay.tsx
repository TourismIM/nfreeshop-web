"use client";
import { useEffect, useRef } from "react";

// Simple EAN-13 style visual barcode using CSS stripes
export default function BarcodeDisplay({ value, label }: { value: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);

    // Generate pseudo-random bars from value hash
    const bars = 60;
    const barW = W / (bars * 1.5);
    let x = 8;
    for (let i = 0; i < bars; i++) {
      const charCode = value.charCodeAt(i % value.length);
      const isBar = (charCode + i) % 3 !== 0;
      const height = H * (0.6 + (charCode % 3) * 0.1);
      if (isBar) {
        ctx.fillStyle = "#000";
        ctx.fillRect(x, 4, barW, height);
      }
      x += barW * (isBar ? 1.2 : 0.8);
    }
  }, [value]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <canvas ref={canvasRef} width={280} height={80} className="mx-auto" />
      <p className="text-xs text-gray-500 mt-1 font-mono tracking-widest">{value.slice(0, 16).toUpperCase()}</p>
      <p className="text-sm font-bold text-[#0B1A30] mt-1">{label}</p>
    </div>
  );
}
