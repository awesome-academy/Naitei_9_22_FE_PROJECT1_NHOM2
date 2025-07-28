"use client";
import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";
interface NewsCardProps {
  image: StaticImageData | string;
  date: string;
  title: string;
  description: string;
  link?: string;
}

export default function NewsCard({
  image,
  date,
  title,
  description,
  link = "#",
}: NewsCardProps) {
  return (
    <div className="flex flex-col">
      <div className="rounded overflow-hidden shadow-sm">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full object-cover aspect-[4/3]"
        />
      </div>
      <p className="italic text-gray-500 text-sm mt-2">{date}</p>
      <h3 className="text-green-700 font-semibold mt-1 text-base hover:underline cursor-pointer">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <Link href={link} className="text-green-500 text-sm mt-1 hover:underline">
        Đọc tiếp
      </Link>
    </div>
  );
}


