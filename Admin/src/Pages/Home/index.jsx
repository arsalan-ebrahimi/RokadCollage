import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/Slices/authSlice";
import SchoolIcon from "@mui/icons-material/School";
import CommentIcon from "@mui/icons-material/Comment";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "../../Components/UI";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const menuItems = [
    {
      id: 1,
      title: "مدیریت دوره‌ها",
      subtitle: "Courses Management",
      desc: "تعریف دوره‌های آموزشی، تنظیم دسته‌بندی، تگ‌ها و آیکون وکتور SVG",
      path: "/course",
      icon: <SchoolIcon style={{ fontSize: "2.8rem" }} />,
      bgClass: "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600",
      shadowClass: "shadow-orange-500/20",
    },
    {
      id: 2,
      title: "مدیریت نظرات",
      subtitle: "Comments Management",
      desc: "بررسی و مدیریت نظرات هنرجویان و دانشجویان دوره‌های کالج",
      path: "/comment",
      icon: <CommentIcon style={{ fontSize: "2.8rem" }} />,
      bgClass: "bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600",
      shadowClass: "shadow-indigo-500/20",
    },
    {
      id: 3,
      title: "مدیریت مقالات و بلاگ",
      subtitle: "Blog Management",
      desc: "نگارش و انتشار مقالات آموزشی، مسیرهای شغلی و اخبار کالج",
      path: "/blog",
      icon: <ArticleIcon style={{ fontSize: "2.8rem" }} />,
      bgClass: "bg-gradient-to-br from-teal-500 via-emerald-500 to-emerald-600",
      shadowClass: "shadow-emerald-500/20",
    },
  ];

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center min-h-[90vh] p-6 md:p-8 bg-background relative"
    >
      {/* Top Action Bar */}
      <div className="w-full flex justify-between md:justify-end items-center gap-3 mb-6 md:mb-0 md:absolute md:top-8 md:left-8">
        <Button
          variant="primary-subtle"
          size="sm"
          onClick={() => navigate("/seo")}
          icon={<SettingsIcon fontSize="small" />}
        >
          تنظیمات سئو
        </Button>

        <Button
          variant="danger-outline"
          size="sm"
          onClick={handleLogout}
          icon={<LogoutIcon fontSize="small" className="rotate-180" />}
        >
          خروج از حساب
        </Button>
      </div>

      {/* Header Section */}
      <div className="text-center mb-10 md:mb-12 space-y-2.5 mt-6">
        <div className="inline-flex items-center gap-2 bg-primary-light text-text-accent px-4 py-1.5 rounded-full text-xs font-bold border border-primary-border mb-2">
          <span>🎓 پنل مدیریت کالج آموزشی رکاد</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">
          به داشبورد مدیریت خوش آمدید
        </h1>
        <p className="text-text-secondary text-sm md:text-base max-w-lg mx-auto">
          جهت مدیریت دوره‌ها، نظرات دانشجویان و مقالات وبلاگ، یکی از بخش‌های زیر را انتخاب فرمایید
        </p>
      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.path)}
            className={`
              ${item.bgClass}
              text-white
              rounded-3xl
              p-7
              flex flex-col justify-between
              transition-all duration-300 ease-out
              transform hover:-translate-y-2 hover:scale-[1.02]
              shadow-lg hover:shadow-2xl
              ${item.shadowClass}
              group cursor-pointer select-none text-right min-h-[220px]
            `}
          >
            <div className="flex items-start justify-between w-full">
              <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300 bg-white/20 p-2 rounded-xl">
                <ArrowBackIcon fontSize="small" />
              </div>
            </div>

            <div className="flex flex-col items-start mt-6">
              <span className="text-xl font-black">{item.title}</span>
              <span className="text-white/80 text-xs font-medium mt-0.5">
                {item.subtitle}
              </span>
              <p className="text-white/90 text-xs leading-relaxed mt-2 text-right">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
