"use client";

import {
  HiOutlineChat,
  HiOutlineHeart,
  HiHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import { app } from "@/firebase";

import {
  getFirestore,
  setDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  collection,
  deleteDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function Icons({ id, uid }) {
  const db = getFirestore(app);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session?.user?.uid === uid) {
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Delted Successfully");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("You are not authorized to delete this post");
      }
    }
  };
  return (
    <div className="flex items-center justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-sky-100 hover:text-sky-500 p-2" />
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
      {session?.user?.uid === uid && (
        <HiOutlineTrash
          onClick={deletePost}
          className="h-8 w-8 cursor-pointer rounded-full transition-all ease-in-out duration-300 hover:bg-red-100 hover:text-red-500 p-2"
        />
      )}
    </div>
  );
}
