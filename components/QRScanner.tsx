"use client";
import { useRef, useState } from "react";
import { Camera, CheckCircle, XCircle } from "lucide-react";

type ScanState = "idle" | "scanning" | "success" | "error";

export default function QRScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<ScanState>("idle");
  const [result, setResult] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startScan = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setState("scanning");

      // Dynamically import @zxing/browser
      const { BrowserQRCodeReader } = await import("@zxing/browser");
      const reader = new BrowserQRCodeReader();
      try {
        await reader.decodeFromVideoDevice(undefined, videoRef.current!, (res) => {
          if (res) {
            setResult(res.getText());
            setState("success");
            mediaStream.getTracks().forEach((t) => t.stop());
          }
        });
      } catch {
        // scanning stopped
      }
    } catch {
      setState("error");
    }
  };

  const reset = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setState("idle");
    setResult("");
  };

  return (
    <div className="w-full max-w-sm">
      {state === "idle" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-64 h-64 rounded-2xl border-2 border-dashed border-gray-600 flex items-center justify-center bg-gray-900">
            <Camera size={48} className="text-gray-500" />
          </div>
          <button
            onClick={startScan}
            className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-full text-sm hover:bg-yellow-400 transition-colors"
          >
            Start Scanning
          </button>
        </div>
      )}

      {state === "scanning" && (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-64 h-64 object-cover rounded-2xl mx-auto"
          />
          {/* Scan overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-[#D4AF37] rounded-xl" />
          </div>
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-sm animate-pulse">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
              Scanning...
            </div>
          </div>
        </div>
      )}

      {state === "success" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-green-900/50 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <div className="text-center">
            <p className="text-green-400 font-semibold mb-1">QR Detected!</p>
            <p className="text-gray-400 text-xs break-all max-w-xs">{result}</p>
          </div>
          <div className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-xl text-sm text-center">
            🎉 Coupon Activated!
          </div>
          <button onClick={reset} className="text-gray-400 text-sm underline">Scan Again</button>
        </div>
      )}

      {state === "error" && (
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-red-900/50 rounded-full flex items-center justify-center">
            <XCircle size={48} className="text-red-400" />
          </div>
          <p className="text-red-400 text-sm text-center">Camera access denied.<br />Please allow camera permission.</p>
          <button onClick={reset} className="text-gray-400 text-sm underline">Try Again</button>
        </div>
      )}
    </div>
  );
}
