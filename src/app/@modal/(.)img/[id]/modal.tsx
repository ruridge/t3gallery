"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  function CloseSVG() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    );
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="h-screen w-screen bg-black/70 text-white md:p-24"
      onClose={onDismiss}
    >
      <div className="bg-background h-full">{children}</div>
      <button onClick={onDismiss} className="absolute right-4 top-4">
        <CloseSVG />
      </button>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
