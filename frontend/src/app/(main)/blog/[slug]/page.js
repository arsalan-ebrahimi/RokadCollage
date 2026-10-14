import { Suspense } from "react";
import BlogArticleClient from "./BlogArticleClient";

export default async function SingleArticleRoute({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || "");

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-['IRANSansX'] text-stone-500">در حال بارگذاری مقاله...</div>}>
      <BlogArticleClient slug={decodedSlug} />
    </Suspense>
  );
}
