"use client";

import React, { useState } from "react";

import BlogSidebar from "@/components/BlogSidebar";
import ListBlogs from "@/components/ListBlogs";
import BlogDetail from "@/components/BlogDetail";
import BlogComment from "@/components/BlogComment";
import {
  Pagination,
  PaginationLink,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from "@/components/Loading";
import Breadcrumb from "../../components/Breadcrumb";

import { useBlogData } from "@/hooks/useBlogData";
import { useBlogFilter } from "@/hooks/useBlogFilter";
import { useResponsive } from "@/hooks/useResponsive";
import { MESSAGES } from "@/constants/blog";

import type { Blog } from "@/types/Blog";

const BlogPage = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức" },
  ];

  /* ---------- HOOKS ---------- */
  const { blogs, categories, tags, comments, loading, error } = useBlogData();
  const {
    selectedCategory,
    selectedTag,
    setSelectedCategory,
    setSelectedTag,
    currentPage,
    setCurrentPage,
    currentBlogs,
    totalPages,
  } = useBlogFilter(blogs);
  const { isMobile } = useResponsive();

  /* ---------- BLOG DETAIL ---------- */
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleSelectBlog = (id: number) => {
    const found = blogs.find((b) => b.id === id) || null;
    setSelectedBlog(found);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination handlers
  const handlePreviousPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  /* ---------- RENDER ---------- */
  if (loading) return <Loading message={MESSAGES.LOADING} />;
  if (error)
    return <p className="container py-10 text-red-500">Lỗi: {error}</p>;

  return (
    <ErrorBoundary>
      <section className="mx-auto max-w-[1100px] px-3 md:px-0">
        <div className="flex flex-col mt-5 gap-5 md:gap-[50px] mb-5 md:mb-[50px]">
          <Breadcrumb items={breadcrumbItems} />

          {/* -------- MOBILE: chỉ hiển thị chi tiết -------- */}
          {isMobile && selectedBlog ? (
            <div className="flex flex-col gap-5">
              <BlogDetail
                selectedBlog={selectedBlog}
                comments={comments}
                categories={categories}
                setSelectedCategory={setSelectedCategory}
                onBack={() => setSelectedBlog(null)}
              />
              <BlogComment selectedBlog={selectedBlog} comments={comments} />
            </div>
          ) : (
            /* -------- DESKTOP: sidebar + main -------- */
            <div className="flex flex-col gap-5">
              <div className="grid lg:grid-cols-[230px_1fr] gap-8">
                {/* SIDEBAR */}
                <BlogSidebar
                  blogs={blogs}
                  categories={categories}
                  tags={tags}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  setSelectedBlog={setSelectedBlog}
                />

                {/* MAIN */}
                {selectedBlog ? (
                  <div className="flex flex-col gap-5 md:gap-[50px]">
                    <BlogDetail
                      selectedBlog={selectedBlog}
                      comments={comments}
                      categories={categories}
                      setSelectedCategory={setSelectedCategory}
                      onBack={() => setSelectedBlog(null)}
                    />
                    <BlogComment
                      selectedBlog={selectedBlog}
                      comments={comments}
                    />
                  </div>
                ) : (
                  <ListBlogs
                    blogs={currentBlogs}
                    comments={comments}
                    handleSelectBlog={handleSelectBlog}
                  />
                )}
              </div>

              {/* Pagination */}
              {!selectedBlog && (
                <Pagination className="justify-end mt-5">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={handlePreviousPage}
                        aria-disabled={currentPage === 1}
                        className="
                        [&>span]:hidden                   
                        after:content-['Trang_trước']     
                        after:ml-1
                        after:hidden sm:after:inline
                      "
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          href="#"
                          onClick={() => handlePageClick(i + 1)}
                          aria-current={
                            currentPage === i + 1 ? "page" : undefined
                          }
                          aria-label={`Trang ${i + 1}`} // screen-reader tiếng Việt
                          className={`rounded-md transition-colors ${
                            currentPage === i + 1
                              ? "bg-green-600 text-white hover:bg-green-600"
                              : ""
                          }`}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={handleNextPage}
                        aria-disabled={currentPage === totalPages}
                        className="
                          [&>span]:hidden
                          before:content-['Trang_sau']
                          before:mr-1
                          before:hidden sm:before:inline
                        "
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default BlogPage;
