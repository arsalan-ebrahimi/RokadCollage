import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../../Utils/axiosInstance";
import CourseCard from "../CourseCard";
import Notify from "../../../Utils/notify";
import confirm from "../../../Utils/confirm";
import Search from "../../../Components/Search";
import Filter from "../../../Components/Filter";
import Loading from "../../../Components/Loading";
import { Button, PageHeader, Card } from "../../../Components/UI";

export default function CoursePage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const LIMIT = 12;

  const filterConfig = [
    {
      field: "category",
      label: "دسته‌بندی",
      options: [
        { label: "فناوری اطلاعات", value: "فناوری اطلاعات" },
        { label: "گرافیک", value: "گرافیک" },
        { label: "زبان", value: "زبان" },
        { label: "MBA", value: "MBA" },
      ],
    },
    {
      field: "type",
      label: "نوع برگزاری",
      options: [
        { label: "حضوری", value: "حضوری" },
        { label: "مجازی", value: "مجازی" },
      ],
    },
  ];

  const fetchCourses = async (pageNumber, query, filters) => {
    if (pageNumber === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      let filterParams = "";
      if (filters.category) filterParams += `&category=${encodeURIComponent(filters.category)}`;
      if (filters.type) filterParams += `&type=${encodeURIComponent(filters.type)}`;

      const data = await axiosInstance.get(
        `course?limit=${LIMIT}&page=${pageNumber}&sort=-_id${query ? `&q=${encodeURIComponent(query)}` : ""}${filterParams}`
      );

      if (data && data.success !== false) {
        const fetchedCourses = Array.isArray(data) ? data : data.data || [];

        if (fetchedCourses.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (pageNumber === 1) {
          setCourses(fetchedCourses);
        } else {
          setCourses((prev) => {
            const uniqueNewItems = fetchedCourses.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem._id === newItem._id)
            );
            return [...prev, ...uniqueNewItems];
          });
        }
      } else {
        Notify.error(data?.message || "خطا در دریافت اطلاعات دوره‌ها");
      }
    } catch (error) {
      Notify.error(error.message || "خطا در دریافت اطلاعات دوره‌ها");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCourses(page, searchQuery, activeFilters);
  }, [page, searchQuery, activeFilters]);

  // Infinite Scroll Trigger
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (hasMore && !loading && !loadingMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadingMore]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setHasMore(true);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setPage(1);
    setHasMore(true);
  };

  const handleEditCourse = (course) => {
    const courseId = typeof course === "object" ? course._id : course;
    if (courseId) navigate(`update/${courseId}`);
  };

  const handleAddCourse = () => navigate("create");

  const handleDeleteCourse = async (id) => {
    const isConfirmed = await confirm(
      "آیا از حذف این دوره اطمینان دارید؟",
      "با حذف این دوره، آیکون و نظرات وابسته به آن تحت تاثیر قرار می‌گیرند.",
      "بله، حذف کن"
    );

    if (!isConfirmed) return;

    try {
      const deleteData = await axiosInstance.delete(`course/${id}`);

      if (deleteData && deleteData.success !== false) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
        Notify.success("دوره با موفقیت حذف شد.");
      } else {
        Notify.error(deleteData?.message || "حذف دوره ناموفق بود");
      }
    } catch (error) {
      Notify.error(error.message || "حذف دوره ناموفق بود");
    }
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="مدیریت دوره‌ها"
        subtitle="مشاهده، جستجو، فیلتر و مدیریت کلیه دوره‌های آموزشی کالج"
        action={
          <Button
            variant="primary"
            size="md"
            icon={<AddIcon fontSize="small" />}
            onClick={handleAddCourse}
          >
            افزودن دوره جدید
          </Button>
        }
      >
        <Card className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 shadow-xs">
          <Filter filterConfig={filterConfig} onFilterChange={handleFilterChange} />
          <Search onSearch={handleSearch} placeholder="جستجوی دوره..." />
        </Card>
      </PageHeader>

      {/* Main Content Area */}
      {loading && page === 1 ? (
        <div className="flex justify-center mt-20">
          <Loading size={12} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
              />
            ))}
          </div>

          {courses.length === 0 && !loading && (
            <div className="col-span-full text-center text-text-secondary py-16 bg-surface rounded-2xl border border-border/60">
              هیچ دوره‌ای مطابق فیلترهای انتخابی یافت نشد.
            </div>
          )}

          {loadingMore && (
            <div className="flex justify-center mt-8 py-4 pb-10">
              <Loading size={10} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
