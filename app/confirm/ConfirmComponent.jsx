// app/confirm/ConfirmComponent.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConfirmComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const bookingId = searchParams.get("id");
    const token = searchParams.get("token");
    if (!bookingId || !token) {
      setStatus("error");
      return;
    }
    const confirm = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings/confirm/${bookingId}/${token}/`);
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message || "Booking confirmed");
          setStatus("ok");
          setTimeout(() => router.push("/dashboard"), 1200);
        } else {
          toast.error(data.error || data.detail || "Invalid confirmation link");
          setStatus("error");
        }
      } catch (e) {
        console.error(e);
        toast.error("Failed to confirm booking");
        setStatus("error");
      }
    };
    confirm();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <ToastContainer />
      {status === "pending" && <p>Confirming your booking...</p>}
      {status === "ok" && <p>Booking confirmed. Redirecting...</p>}
      {status === "error" && <p>Invalid or expired confirmation link.</p>}
    </div>
  );
}