"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/auth";
import BlogForm from "@/components/BlogForm";
import Breadcrumb from "@/components/Breadcrumb";

const CreateBlogPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, []);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/blog" },
    { label: "Tạo blog" },
  ];

  if (!checked) return null;

  return (
    <section className="mx-auto max-w-[700px] px-3 md:px-0 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <BlogForm />
    </section>
  );
};

export default CreateBlogPage;
