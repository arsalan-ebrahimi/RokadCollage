import { useState, useEffect } from "react";
import { Pencil, CheckCircle2 } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, updateProfile } from "../../data/panelStore.js";
import ProfileIdentityCard from "./components/ProfileIdentityCard.jsx";
import ProfileActivityPanels from "./components/ProfileActivityPanels.jsx";
import ProfileEditModal from "./components/ProfileEditModal.jsx";

export default function Profile({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [editOpen, setEditOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { user } = store;

  const openEditModal = () => {
    setFullName(user.fullName);
    setRole(user.role);
    setBio(user.bio || "");
    setTagsStr(user.tags ? user.tags.join(", ") : "");
    setEditOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      firstName: fullName.trim().split(" ")[0] || "کاربر",
      initial: fullName.trim()[0] || "پ",
      role: role.trim(),
      bio: bio.trim(),
      tags: tagsStr.split(/[,،]/).map((t) => t.trim()).filter(Boolean),
    });
    setEditOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <section id="panel">
      <PanelLayout page="profile" onNavigate={onNavigate}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 className="pnl-h1">
              <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>پروفایل</span>{" "}
              <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
            </h1>
            <p className="pnl-sub">مسیر یادگیری، مهارت‌ها و دستاوردهایت این‌جا خلاصه شده.</p>
          </div>
          <button
            type="button"
            className="pnl-cbtn"
            style={{ padding: "9px 18px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: 6 }}
            onClick={openEditModal}
          >
            <Pencil size={15} />
            <span>ویرایش پروفایل</span>
          </button>
        </div>

        {saveSuccess && (
          <div
            style={{
              background: "var(--teal-light)",
              border: "2px solid var(--ink)",
              padding: "10px 16px",
              borderRadius: "8px 0 8px 0",
              fontWeight: 800,
              fontSize: "13px",
              color: "var(--teal-dark)",
              marginBottom: 16,
              boxShadow: "2.5px 2.5px 0 var(--ink)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={16} />
            <span>اطلاعات پروفایل شما با موفقیت ذخیره و به‌روزرسانی شد</span>
          </div>
        )}

        <div className="pnl-prof-wrap">
          <ProfileIdentityCard user={user} />
          <ProfileActivityPanels />
        </div>

        <ProfileEditModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          fullName={fullName}
          setFullName={setFullName}
          role={role}
          setRole={setRole}
          bio={bio}
          setBio={setBio}
          tagsStr={tagsStr}
          setTagsStr={setTagsStr}
          handleSaveProfile={handleSaveProfile}
        />
      </PanelLayout>
    </section>
  );
}
