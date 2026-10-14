import { useState, useEffect, useRef } from "react";
import { Award } from "lucide-react";
import PanelLayout from "./PanelLayout.jsx";
import { getPanelStore, submitAssignment } from "../../data/panelStore.js";
import AssignmentRow, { toFa } from "./components/AssignmentRow.jsx";
import AssignmentSubmitModal from "./components/AssignmentSubmitModal.jsx";
import AssignmentFeedbackModal from "./components/AssignmentFeedbackModal.jsx";

export default function Assignments({ onNavigate }) {
  const [store, setStore] = useState(getPanelStore);
  const [activeModalAssignment, setActiveModalAssignment] = useState(null);
  const [viewFeedbackAssignment, setViewFeedbackAssignment] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleStoreChange = (e) => {
      setStore(e.detail || getPanelStore());
    };
    window.addEventListener("rokad_panel_store_changed", handleStoreChange);
    return () => window.removeEventListener("rokad_panel_store_changed", handleStoreChange);
  }, []);

  const { assignments } = store;
  const open = assignments.filter((a) => a.status === "open" || a.status === "late");
  const closed = assignments.filter((a) => a.status === "done" || a.status === "graded");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKb = (file.size / 1024).toFixed(1);
      setSubmissionFile({
        name: file.name,
        size: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} مگابایت` : `${sizeKb} کیلوبایت`,
      });
    }
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    if (!activeModalAssignment) return;
    submitAssignment(activeModalAssignment.id, {
      text: submissionText.trim() || "پروژه و کدهای مربوط به این تکلیف با موفقیت ارسال شد.",
      fileName: submissionFile ? submissionFile.name : "solution_project.zip",
    });
    setActiveModalAssignment(null);
    setSubmissionText("");
    setSubmissionFile(null);
  };

  return (
    <section id="panel">
      <PanelLayout page="assignments" onNavigate={onNavigate}>
        <h1 className="pnl-h1">
          <span className="w" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>تکالیف</span>{" "}
          <span className="w accent" style={{ transform: "rotate(1.5deg)", display: "inline-block" }}>من</span>
        </h1>
        <p className="pnl-sub">
          {open.length > 0
            ? `${toFa(open.length)} تکلیف باز داری؛ از مهلت‌دارها شروع کن.`
            : "فعلاً تکلیف بازی نداری؛ همه تکالیف ارسال شده‌اند!"}
        </p>

        {/* ---------- باز ---------- */}
        <div className="pnl-panel">
          <h4>
            باز و در انتظار
            <span className="pnl-pill">{toFa(open.length)} تکلیف</span>
          </h4>
          {open.map((a) => (
            <AssignmentRow
              key={a.id}
              a={a}
              onOpenSubmit={setActiveModalAssignment}
              onOpenFeedback={setViewFeedbackAssignment}
            />
          ))}
          {open.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px", color: "var(--teal-dark)", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Award size={20} />
              <span>تمامی تکالیف جاری را تحویل داده‌اید. عالی پیش می‌روید!</span>
            </div>
          )}
        </div>

        {/* ---------- تحویل‌شده ---------- */}
        <div className="pnl-panel" style={{ marginTop: 22 }}>
          <h4>
            تحویل‌شده و نمره‌دهی
            <span className="pnl-pill">{toFa(closed.length)} تکلیف</span>
          </h4>
          {closed.map((a) => (
            <AssignmentRow
              key={a.id}
              a={a}
              onOpenSubmit={setActiveModalAssignment}
              onOpenFeedback={setViewFeedbackAssignment}
            />
          ))}
        </div>

        <AssignmentSubmitModal
          activeModalAssignment={activeModalAssignment}
          setActiveModalAssignment={setActiveModalAssignment}
          submissionText={submissionText}
          setSubmissionText={setSubmissionText}
          submissionFile={submissionFile}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleSubmitAssignment={handleSubmitAssignment}
        />

        <AssignmentFeedbackModal
          viewFeedbackAssignment={viewFeedbackAssignment}
          setViewFeedbackAssignment={setViewFeedbackAssignment}
        />
      </PanelLayout>
    </section>
  );
}
