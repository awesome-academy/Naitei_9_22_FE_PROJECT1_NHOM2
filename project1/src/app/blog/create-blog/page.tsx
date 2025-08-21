"use client";

import BlogForm from "@/components/BlogForm";
import Breadcrumb from "@/components/Breadcrumb";

const CreateBlogPage = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/blog" },
    { label: "Tạo blog" },
  ];
  return (
    <section className="mx-auto max-w-[700px] px-3 md:px-0 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <BlogForm />
    </section>
  );
};

export default CreateBlogPage;
