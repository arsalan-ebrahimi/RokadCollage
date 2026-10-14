import React from "react";

export default function ProfileEditModal({
  editOpen,
  setEditOpen,
  fullName,
  setFullName,
  role,
  setRole,
  bio,
  setBio,
  tagsStr,
  setTagsStr,
  handleSaveProfile,
}) {
  if (!editOpen) return null;

  return (
    <div className="auth-modal-backdrop" onClick={() => setEditOpen(false)}>
      <div
        className="auth-modal-card"
        style={{ maxWidth: 460, textAlign: "right", padding: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            margin: "0 0 16px",
            fontSize: "17.5px",
            fontWeight: 950,
            color: "var(--navy)",
          }}
        >
          ویرایش مشخصات کاربری
        </h3>

        <form
          onSubmit={handleSaveProfile}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 4,
                color: "var(--navy)",
              }}
            >
              نام و نام خانوادگی:
            </label>
            <input
              type="text"
              required
              dir="rtl"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "2px solid var(--ink)",
                borderRadius: "8px 0 8px 0",
                fontFamily: "inherit",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 4,
                color: "var(--navy)",
              }}
            >
              رشته / عنوان تحصیلی و شغلی:
            </label>
            <input
              type="text"
              required
              dir="rtl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "2px solid var(--ink)",
                borderRadius: "8px 0 8px 0",
                fontFamily: "inherit",
                fontSize: "13.5px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 4,
                color: "var(--navy)",
              }}
            >
              درباره من / بیوگرافی:
            </label>
            <textarea
              rows={3}
              dir="rtl"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="توضیح کوتاه درباره اهداف آموزشی…"
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "2px solid var(--ink)",
                borderRadius: "8px 0 8px 0",
                fontFamily: "inherit",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "12.5px",
                fontWeight: 800,
                marginBottom: 4,
                color: "var(--navy)",
              }}
            >
              برچسب‌های علاقه‌مندی و مهارت (با کاما جدا کنید):
            </label>
            <input
              type="text"
              dir="rtl"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="Python, React, Machine Learning"
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "2px solid var(--ink)",
                borderRadius: "8px 0 8px 0",
                fontFamily: "inherit",
                fontSize: "13px",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button
              type="submit"
              className="pnl-cbtn"
              style={{ flex: 1, padding: "10px" }}
            >
              ذخیره تغییرات
            </button>
            <button
              type="button"
              className="pnl-cbtn ghost"
              style={{ flex: 1, padding: "10px" }}
              onClick={() => setEditOpen(false)}
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
