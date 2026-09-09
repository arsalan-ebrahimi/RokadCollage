import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../../Utils/axiosInstance";
import BlogCard from "../BlogCard";
import Notify from "../../../Utils/notify";
import confirm from "../../../Utils/confirm";
import Search from "../../../Components/Search";
import Filter from "../../../Components/Filter";
import Loading from "../../../Components/Loading";
import { Button, PageHeader, Card } from "../../../Components/UI";

export default function BlogPage() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
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
      label: "دسته‌بندی بلاگ",
      options: [
        { label: "گرافیک", value: "گرافیک" },
        { label: "مسیر شغلی", value: "مسیر شغلی" },
        { label: "MBA", value: "MBA" },
        { label: "زبان", value: "زبان" },
        { label: "فرانتاند", value: "فرانتاند" },
        { label: "بکاند", value: "بکاند" },
      ],
    },
  ];

  const fetchBlogs = async (pageNumber, query, filters) => {
    if (pageNumber === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      let filterParams = "";
      if (filters.category) filterParams += `&category=${encodeURIComponent(filters.category)}`;

      const data = await axiosInstance.get(
        `blog?limit=${LIMIT}&page=${pageNumber}&sort=-_id${query ? `&q=${encodeURIComponent(query)}` : ""}${filterParams}`
      );

      if (data && data.success !== false) {
        const fetchedBlogs = Array.isArray(data) ? data : data.data || [];

        if (fetchedBlogs.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (pageNumber === 1) {
          setBlogs(fetchedBlogs);
        } else {
          setBlogs((prev) => {
            const uniqueNewItems = fetchedBlogs.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem._id === newItem._id)
            );
            return [...prev, ...uniqueNewItems];
          });
        }
      } else {
        Notify.error(data?.message || "خطا در دریافت اطلاعات مقالات");
      }
    } catch (error) {
      Notify.error(error.message || "خطا در دریافت اطلاعات مقالات");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page, searchQuery, activeFilters);
  }, [page, searchQuery, activeFilters]);

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

  const handleEditBlog = (id) => {
    if (id) navigate(`update/${id}`);
  };

  const handleAddBlog = () => navigate("create");

  const handleDeleteBlog = async (id) => {
    const isConfirmed = await confirm(
      "آیا از حذف این بلاگ اطمینان دارید؟",
      "این عمل غیرقابل بازگشت است و تصویر آن نیز حذف خواهد شد.",
      "بله، حذف کن"
    );

    if (!isConfirmed) return;

    try {
      const deleteData = await axiosInstance.delete(`blog/${id}`);

      if (deleteData && deleteData.success !== false) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
        Notify.success("بلاگ با موفقیت حذف شد.");
      } else {
        Notify.error(deleteData?.message || "حذف بلاگ ناموفق بود");
      }
    } catch (error) {
      Notify.error(error.message || "حذف بلاگ ناموفق بود");
    }
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="مدیریت بلاگ‌ها و مقالات"
        subtitle="نگارش، انتشار و دسته‌بندی مقالات آموزشی و مسیرهای شغلی"
        action={
          <Button
            variant="primary"
            size="md"
            icon={<AddIcon fontSize="small" />}
            onClick={handleAddBlog}
          >
            افزودن بلاگ جدید
          </Button>
        }
      >
        <Card className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 shadow-xs">
          <Filter filterConfig={filterConfig} onFilterChange={handleFilterChange} />
          <Search onSearch={handleSearch} placeholder="جستجوی مقاله..." />
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
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
              />
            ))}
          </div>

          {blogs.length === 0 && !loading && (
            <div className="col-span-full text-center text-text-secondary py-16 bg-surface rounded-2xl border border-border/60">
              هیچ مقاله‌ای یافت نشد.
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
