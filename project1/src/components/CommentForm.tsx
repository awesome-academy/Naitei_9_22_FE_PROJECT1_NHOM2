import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FORM_PLACEHOLDERS, MESSAGES } from "@/constants/blog";

interface CommentFormProps {
  onSubmit?: (formData: {
    name: string;
    email: string;
    phone: string;
    comment: string;
  }) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      comment: formData.get("comment") as string,
    };

    onSubmit?.(data);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="uppercase text-gray-500 font-semibold">viết bình luận</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:gap-4">
          <Input
            name="name"
            placeholder={FORM_PLACEHOLDERS.NAME}
            className="w-full md:w-1/3"
            required
          />
          <Input
            name="email"
            type="email"
            placeholder={FORM_PLACEHOLDERS.EMAIL}
            className="w-full md:w-1/3"
            required
          />
          <Input
            name="phone"
            placeholder={FORM_PLACEHOLDERS.PHONE}
            className="w-full md:w-1/3"
          />
        </div>

        <Textarea
          name="comment"
          placeholder={FORM_PLACEHOLDERS.COMMENT}
          className="h-[200px]"
          required
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="w-[150px] h-[50px] rounded-[20px] bg-green-600 hover:bg-green-700 text-white"
          >
            {MESSAGES.SUBMIT_BUTTON}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
