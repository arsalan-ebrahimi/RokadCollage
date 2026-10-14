"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { LogOut } from "lucide-react";
import { logoutUser } from "../../../data/panelStore.js";

export default function LogoutConfirmModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleConfirm = () => {
    onClose();
    logoutUser();
    window.location.href = "/";
  };

  const modalContent = (
    <div
      className="logout-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
    >
      <div
        className="logout-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="logout-modal-icon">
          <LogOut />
        </div>
        <h3 id="logout-dialog-title" className="logout-modal-title">
          خروج از حساب
        </h3>
        <p className="logout-modal-desc">
          آیا برای خروج از حساب اطمینان دارید؟
        </p>
        <div className="logout-modal-actions">
          <button
            type="button"
            className="logout-modal-btn-confirm"
            onClick={handleConfirm}
          >
            خروج
          </button>
          <button
            type="button"
            className="logout-modal-btn-cancel"
            onClick={onClose}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
