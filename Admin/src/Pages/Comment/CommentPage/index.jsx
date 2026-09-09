import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../../../Utils/axiosInstance";
import CommentCard from "../CommentCard";
import Notify from "../../../Utils/notify";
import confirm from "../../../Utils/confirm";
import Search from "../../../Components/Search";
import Loading from "../../../Components/Loading";
import { Button, PageHeader, Card } from "../../../Components/UI";

export default function CommentPage() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const LIMIT = 12;

  const fetchComments = async (pageNumber, query) => {
    if (pageNumber === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const data = await axiosInstance.get(
        `comment?limit=${LIMIT}&page=${pageNumber}&sort=-_id${query ? `&q=${encodeURIComponent(query)}` : ""}`
      );

      if (data && data.success !== false) {
        const fetchedComments = Array.isArray(data) ? data : data.data || [];

        if (fetchedComments.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (pageNumber === 1) {
          setComments(fetchedComments);
        } else {
          setComments((prev) => {
            const uniqueNewItems = fetchedComments.filter(
              (newItem) =>
                !prev.some((existingItem) => existingItem._id === newItem._id)
            );
            return [...prev, ...uniqueNewItems];
          });
        }
      } else {
        Notify.error(data?.message || "خطا در دریافت اطلاعات نظرات");
      }
    } catch (error) {
      Notify.error(error.message || "خطا در دریافت اطلاعات نظرات");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchComments(page, searchQuery);
  }, [page, searchQuery]);

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

  const handleEditComment = (id) => {
    if (id) navigate(`update/${id}`);
  };

  const handleAddComment = () => navigate("create");

  const handleDeleteComment = async (id) => {
    const isConfirmed = await confirm(
      "آیا از حذف این نظر اطمینان دارید؟",
      "این نظر از بخش نظرات دوره مربوطه حذف خواهد شد.",
      "بله، حذف کن"
    );

    if (!isConfirmed) return;

    try {
      const deleteData = await axiosInstance.delete(`comment/${id}`);

      if (deleteData && deleteData.success !== false) {
        setComments((prev) => prev.filter((c) => c._id !== id));
        Notify.success("نظر با موفقیت حذف شد.");
      } else {
        Notify.error(deleteData?.message || "حذف نظر ناموفق بود");
      }
    } catch (error) {
      Notify.error(error.message || "حذف نظر ناموفق بود");
    }
  };

  return (
    <div dir="rtl" className="p-6 md:p-8 w-full bg-background min-h-screen">
      <PageHeader
        title="مدیریت نظرات"
        subtitle="بررسی، ثبت و ویرایش نظرات دانشجویان و اساتید درباره دوره‌ها"
        action={
          <Button
            variant="primary"
            size="md"
            icon={<AddIcon fontSize="small" />}
            onClick={handleAddComment}
          >
            افزودن نظر جدید
          </Button>
        }
      >
        <Card className="flex justify-end p-4 shadow-xs">
          <Search onSearch={handleSearch} placeholder="جستجو در نظرات..." />
        </Card>
      </PageHeader>

      {/* Main Content Area */}
      {loading && page === 1 ? (
        <div className="flex justify-center mt-20">
          <Loading size={12} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </div>

          {comments.length === 0 && !loading && (
            <div className="col-span-full text-center text-text-secondary py-16 bg-surface rounded-2xl border border-border/60">
              هیچ نظری یافت نشد.
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
