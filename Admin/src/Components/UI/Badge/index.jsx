import React from "react";

export function Badge({
  children,
  variant = "primary",
  size = "sm",
  dot = false,
  className = "",
  ...props
}) {
  const sizeClasses = {
    sm: "text-2xs px-2.5 py-0.5 rounded-full font-semibold gap-1.5 leading-tight",
    md: "text-xs px-3 py-1 rounded-full font-semibold gap-2 leading-tight",
  };

  const variantClasses = {
    primary: "bg-primary-light text-text-accent border border-primary-border",
    secondary: "bg-secondary-light text-secondary border border-secondary-muted",
    success: "bg-success-light text-success-text border border-success-border",
    danger: "bg-error-light text-error-text border border-error-border",
    warning: "bg-warning-light text-warning-text border border-warning-border",
    info: "bg-info-light text-info-text border border-info-border",
    neutral: "bg-bg-subtle text-text-secondary border border-border-subtle",
    amber: "bg-amber-50 text-amber-800 border border-amber-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    purple: "bg-purple-50 text-purple-700 border border-purple-200",
    pink: "bg-pink-50 text-pink-700 border border-pink-200",
  };

  const dotColorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    danger: "bg-error",
    warning: "bg-warning",
    info: "bg-info",
    neutral: "bg-text-muted",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
  };

  return (
    <span
      className={`
        inline-flex items-center select-none shrink-0 transition-colors
        ${sizeClasses[size] || sizeClasses.sm}
        ${variantClasses[variant] || variantClasses.primary}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            dotColorClasses[variant] || "bg-primary"
          }`}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
