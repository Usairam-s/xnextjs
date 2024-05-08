import React, { useState, useEffect } from "react";
import { HiDotsHorizontal, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { app } from "@/firebase";
import {
  getFirestore,
  onSnapshot,
  collection,
  deleteDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useSession, signIn } from "next-auth/react";

function Comment({ comment, commentId, originalPostId }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState([]);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);
  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);
  return (
    <div className="flex p-3 border-b border-gray-200 hover:bg-gray-50 pl-10 ">
      <img
        src={comment?.userImg}
        alt="user_img"
        className="h-8 w-8 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-xs truncate">{comment?.name}</h4>
            <span className="text-xs truncate">@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>

        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>
        <div className="flex items-center">
          {isLiked ? (
            <>
              {" "}
              <HiHeart
                onClick={likePost}
                className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-red-100 text-red-600 hover:text-red-500 p-2"
              />
            </>
          ) : (
            <>
              {" "}
              <HiOutlineHeart
                onClick={likePost}
                className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-red-100 hover:text-red-500 p-2"
              />
            </>
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && "text-red-500"}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
