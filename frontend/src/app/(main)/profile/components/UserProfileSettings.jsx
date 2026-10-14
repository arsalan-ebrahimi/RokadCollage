"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Lock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCw,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { getMyProfile, updateMyProfile } from "@/services/userService";
import { getPanelStore, updateProfile } from "@/data/panelStore";

export default function UserProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    birthDate: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const res = await getMyProfile();
        const profile = res?.data || res;
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            fullName: profile.fullName || "",
            phoneNumber: profile.phoneNumber || "",
            birthDate: profile.birthDate || "",
          }));
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
        // Fallback to local store
        const store = getPanelStore();
        if (store?.user) {
          setFormData((prev) => ({
            ...prev,
            fullName: store.user.fullName || "",
            phoneNumber: store.auth?.userPhone || store.user.phone || "",
          }));
        }
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (formData.newPassword && formData.newPassword.length < 6) {
      setErrorMsg("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
      return;
    }

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setErrorMsg("رمز عبور جدید با تکرار آن یکسان نیست");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        fullName: formData.fullName.trim(),
        birthDate: formData.birthDate.trim(),
      };

      if (formData.newPassword) {
        payload.password = formData.newPassword;
      }

      const res = await updateMyProfile(payload);
      const updated = res?.data || res;

      // Sync local panelStore so header updates immediately
      updateProfile({
        fullName: updated.fullName || formData.fullName,
        firstName: (updated.fullName || formData.fullName).split(" ")[0] || "کاربر",
        initial: (updated.fullName || formData.fullName)[0] || "پ",
      });

      setSuccessMsg("تغییرات با موفقیت ذخیره شد");
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      setErrorMsg(err?.message || "خطا در ذخیره اطلاعات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="prof-loading">
        <RotateCw className="w-8 h-8 animate-spin text-[#f8a41d]" />
        <span>در حال دریافت اطلاعات حساب...</span>
      </div>
    );
  }

  const initialLetter = formData.fullName ? formData.fullName.trim()[0] : "پ";

  return (
    <div className="prof-card">
      {/* سربرگ کاربر */}
      <div className="prof-user-banner">
        <div className="prof-user-meta">
          <div className="prof-avatar">
            {initialLetter}
          </div>
          <div>
            <h2 className="prof-user-name">
              {formData.fullName || "حساب کاربری"}
            </h2>
            <div className="prof-user-phone">
              <Phone size={13} />
              <span>{formData.phoneNumber || "---"}</span>
            </div>
          </div>
        </div>

        <div className="prof-status-chip">
          <ShieldCheck size={14} />
          <span>عضو کالج رکاد</span>
        </div>
      </div>

      {/* پیام بازخورد موفقیت / خطا */}
      {successMsg && (
        <div className="prof-alert success">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="prof-alert error">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* فرم ویرایش */}
      <form onSubmit={handleSubmit}>
        {/* اطلاعات فردی */}
        <div className="prof-section">
          <div className="prof-section-head">
            <User size={16} className="text-[#f8a41d]" />
            <span>مشخصات فردی</span>
          </div>

          <div className="prof-grid-2">
            {/* نام و نام خانوادگی */}
            <div className="prof-field">
              <label className="prof-label">
                <span>نام و نام خانوادگی</span>
              </label>
              <div className="prof-input-wrap">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="مثال: آرین احمدی"
                  className="prof-input"
                />
                <User size={16} className="prof-input-icon" />
              </div>
            </div>

            {/* تاریخ تولد */}
            <div className="prof-field">
              <label className="prof-label">
                <span>تاریخ تولد</span>
              </label>
              <div className="prof-input-wrap">
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  placeholder="مثال: ۱۳۷۸/۰۶/۱۵"
                  className="prof-input"
                />
                <Calendar size={16} className="prof-input-icon" />
              </div>
            </div>
          </div>

          {/* شماره موبایل */}
          <div className="prof-field">
            <label className="prof-label">
              <span>شماره موبایل</span>
              <span className="prof-readonly-badge">غیرقابل ویرایش</span>
            </label>
            <div className="prof-input-wrap">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                readOnly
                disabled
                dir="ltr"
                className="prof-input"
              />
              <Phone size={16} className="prof-input-icon" />
            </div>
          </div>
        </div>

        {/* بخش تغییر رمز عبور */}
        <div className="prof-section">
          <div className="prof-sub-box">
            <div className="prof-section-head">
              <KeyRound size={16} className="text-[#f8a41d]" />
              <span>تغییر رمز عبور (اختیاری)</span>
            </div>

            <div className="prof-grid-2 mt-2">
              <div className="prof-field">
                <label className="prof-label">
                  <span>رمز عبور جدید</span>
                </label>
                <div className="prof-input-wrap">
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="حداقل ۶ کاراکتر"
                    className="prof-input"
                  />
                  <Lock size={15} className="prof-input-icon" />
                </div>
              </div>

              <div className="prof-field">
                <label className="prof-label">
                  <span>تکرار رمز عبور جدید</span>
                </label>
                <div className="prof-input-wrap">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="تکرار رمز"
                    className="prof-input"
                  />
                  <Lock size={15} className="prof-input-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه اقدام ذخیره */}
        <div className="prof-actions">
          <button
            type="submit"
            disabled={saving}
            className="prof-submit-btn"
          >
            {saving ? (
              <>
                <RotateCw size={15} className="animate-spin" />
                <span>در حال ذخیره...</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>ذخیره</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
