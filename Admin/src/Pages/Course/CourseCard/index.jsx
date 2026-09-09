import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getImageUrl } from "../../../Utils/getImageUrl";
import { Card, Badge, Button } from "../../../Components/UI";

export default function CourseCard({ course, onEdit, onDelete }) {
  const getCategoryBadgeVariant = (category) => {
    switch (category) {
      case "فناوری اطلاعات":
        return "blue";
      case "گرافیک":
        return "purple";
      case "زبان":
        return "success";
      case "MBA":
        return "amber";
      default:
        return "primary";
    }
  };

  const iconUrl = getImageUrl(course.icon);

  return (
    <Card hoverable className="p-5 flex flex-col justify-between h-full group">
      <div>
        {/* Top Header: Category Tag & Type */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge variant={getCategoryBadgeVariant(course.category)} size="md" dot>
            {course.category}
          </Badge>

          <Badge
            variant={course.type === "حضوری" ? "info" : "neutral"}
            size="sm"
          >
            {course.type}
          </Badge>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-13 h-13 rounded-2xl bg-primary-light border border-primary-border flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform text-primary">
            {course.icon && course.icon.trim().startsWith("<") ? (
              <div
                className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: course.icon }}
              />
            ) : iconUrl ? (
              <img
                src={iconUrl}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-primary font-bold text-xs">SVG</span>
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-secondary text-base line-clamp-1 leading-snug">
              {course.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
              <AccessTimeIcon style={{ fontSize: "0.95rem" }} />
              <span>مدت دوره: {course.duration}</span>
            </div>
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-2 mt-2 mb-4">
          {course.description}
        </p>

        {/* Tags Array Display */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {course.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-bg-light text-text-secondary px-2.5 py-0.5 rounded-lg border border-border/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-border/80 flex items-center justify-end gap-1.5">
        <Button
          variant="info-ghost"
          size="icon-sm"
          onClick={() => onEdit(course)}
          title="ویرایش دوره"
        >
          <EditIcon fontSize="small" />
        </Button>

        <Button
          variant="danger-ghost"
          size="icon-sm"
          onClick={() => onDelete(course._id)}
          title="حذف دوره"
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>
    </Card>
  );
}
