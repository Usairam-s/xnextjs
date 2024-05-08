"use client";

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

export default function Icons() {
  return (
    <div className="flex items-center justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-sky-100 hover:text-sky-500 p-2" />
      <HiOutlineHeart className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-red-100 hover:text-red-500 p-2" />
      <HiOutlineTrash className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-red-100 hover:text-red-500 p-2" />
    </div>
  );
}
