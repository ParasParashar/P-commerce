"use client";

import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteReview } from "@/actions/user.action";
import React from "react";

type props = {
  reviewId: string;
};
const DeleteReview = ({ reviewId }: props) => {
  const router = useRouter();
  const deleteHandle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      await deleteReview(reviewId);
      toast.success("Review Deleted");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Button
      onClick={deleteHandle}
      type="button"
      size={"sm"}
      className="hover:text-rose-300 hover:bg-[#292b2d] text-rose-400 p-1 rounded-lg"
    >
      <RiDeleteBin5Line size={30} />
    </Button>
  );
};

export default DeleteReview;
