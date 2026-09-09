import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SchoolIcon from "@mui/icons-material/School";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Card, Badge, Button } from "../../../Components/UI";
import { getImageUrl } from "../../../Utils/getImageUrl";

export default function CommentCard({ comment, onEdit, onDelete }) {
  const courseTitle = comment.course?.title || "دوره مشخص‌نشده";
  const courseCategory = comment.course?.category;
  const avatarUrl = getImageUrl(comment.img);

  return (
    <Card hoverable className="p-5 flex flex-col justify-between h-full">
      <div>
        {/* Top Associated Course Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-primary-light text-text-accent px-3 py-1 rounded-xl text-xs font-bold border border-primary-border">
            <SchoolIcon style={{ fontSize: "1rem" }} />
            <span className="line-clamp-1">{courseTitle}</span>
          </div>

          {courseCategory && (
            <Badge variant="neutral" size="sm">
              {courseCategory}
            </Badge>
          )}
        </div>

        {/* Commenter Avatar, Name, Role, and Job */}
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={comment.name || "کاربر"}
              className="w-10 h-10 object-cover rounded-full border border-border shadow-2xs shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatars/default-BoyStudent.png";
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-secondary text-sm md:text-base line-clamp-1">
                {comment.name}
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs text-text-muted mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <PersonOutlineIcon style={{ fontSize: "0.9rem" }} />
                  {comment.role}
                </span>

                {comment.job && (
                  <span className="inline-flex items-center gap-1 text-text-secondary bg-bg-light px-2 py-0.5 rounded-md">
                    <WorkOutlineIcon style={{ fontSize: "0.85rem" }} />
                    {comment.job}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-4 mt-2 mb-4 bg-bg-light/40 p-3 rounded-xl border border-border/40">
          «{comment.comment}»
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-border/80 flex items-center justify-end gap-1.5">
        <Button
          variant="info-ghost"
          size="icon-sm"
          onClick={() => onEdit(comment._id)}
          title="ویرایش نظر"
        >
          <EditIcon fontSize="small" />
        </Button>

        <Button
          variant="danger-ghost"
          size="icon-sm"
          onClick={() => onDelete(comment._id)}
          title="حذف نظر"
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>
    </Card>
  );
}
