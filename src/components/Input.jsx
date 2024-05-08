"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useRef } from "react";
import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function Input() {
  const { data: session } = useSession();
  const imageRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };
  if (!session) {
    return null;
  }

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex border-b border-gray-300 p-3 space-x-3 w-full">
      <img
        src={session.user.image}
        alt="user_image"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full outline-none tracking-wide min-h-[50px] text-gray-700"
          placeholder="Whats happening?"
          rows="2"
        ></textarea>
        {selectedFile && (
          <img
            src={imageFileUrl}
            alt="preview_image"
            className="cursor-pointer max-h-[250px] w-full object-cover"
          />
        )}
        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imageRef.current.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            className="hidden"
            onChange={addImageToPost}
          />
          <button
            disabled
            className="bg-blue-400 text-white px-4 py-1 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
