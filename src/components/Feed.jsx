"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { app } from "@/firebase";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newPosts = [];
      snapshot.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(newPosts);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
}
