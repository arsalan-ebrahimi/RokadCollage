import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { getImageUrl } from "../../../Utils/getImageUrl";
import { Card, Badge, Button } from "../../../Components/UI";

export default function BlogCard({ blog, onEdit, onDelete }) {
  const getCategoryVariant = (cat) => {
    switch (cat) {
      case "گرافیک":
        return "purple";
      case "مسیر شغلی":
        return "amber";
      case "MBA":
        return "primary";
      case "زبان":
        return "success";
      case "فرانتاند":
        return "blue";
      case "بکاند":
        return "indigo";
      default:
        return "neutral";
    }
  };

  const imageUrl = getImageUrl(blog.img);

  return (
    <Card hoverable className="p-0 overflow-hidden flex flex-col justify-between h-full group">
      <div>
        {/* Cover Image Container */}
        <div className="w-full h-44 bg-bg-light relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
              بدون تصویر
            </div>
          )}

          {/* Category Badge overlay */}
          <div className="absolute top-3 right-3">
            <Badge variant={getCategoryVariant(blog.category)} size="md" dot>
              {blog.category}
            </Badge>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4">
          <h3 className="font-bold text-secondary text-base line-clamp-1 group-hover:text-primary transition-colors leading-snug">
            {blog.title}
          </h3>

          <p className="text-xs md:text-sm text-text-secondary leading-relaxed line-clamp-3 mt-2">
            {blog.description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-border/80 flex items-center justify-end gap-1.5">
        <Button
          variant="info-ghost"
          size="icon-sm"
          onClick={() => onEdit(blog._id)}
          title="ویرایش بلاگ"
        >
          <EditIcon fontSize="small" />
        </Button>

        <Button
          variant="danger-ghost"
          size="icon-sm"
          onClick={() => onDelete(blog._id)}
          title="حذف بلاگ"
        >
          <DeleteOutlineIcon fontSize="small" />
        </Button>
      </div>
    </Card>
  );
}
