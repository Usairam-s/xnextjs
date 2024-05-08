"use client";
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/modelAtom";

function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <h1>Comment Modal</h1>
      {open && <h1>open is modal</h1>}
    </div>
  );
}

export default CommentModal;
