"use client";
import { ReactNode, useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  children: ReactNode;
}

export default function Modal({ open, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <>{children}</>
      </div>

      <form method="dialog" className="modal-backdrop" onClick={closeModal}>
        <button>close</button>
      </form>
    </div>
  );
}
