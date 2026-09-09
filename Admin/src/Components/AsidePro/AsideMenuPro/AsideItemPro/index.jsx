import React from "react";

export function AsideItemPro({ title, onClick, isActive = false, icon = null }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full text-xs md:text-[13.5px] font-medium py-2.5 px-3 rounded-xl cursor-pointer text-right transition-all duration-200 flex items-center justify-between
        ${
          isActive
            ? "bg-primary text-text-white font-bold shadow-sm shadow-primary/30"
            : "text-text-secondary hover:bg-primary-light hover:text-primary active:bg-primary-muted"
        }
      `}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{title}</span>
      </div>
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-pulse"></span>
      )}
    </button>
  );
}

export default AsideItemPro;
