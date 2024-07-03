"use client";

import Image from "next/image";
import NavBar from "@/ui/nav-bar";

import { db } from "@/utils/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const docRef = doc(db, "test", "index");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setImageUrl(docSnap.data().imageUrl);
      } else {
        console.log("No such document!");
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <main className="flex flex-col">
      <div className="lg:flex w-full">
        <NavBar />

        <div className="lg:w-5/6 text-center mt-16">
          <h1 className="text-orange text-6xl lg:text-8xl font-bold mb-4">
            KREICS
          </h1>

          <h4 className="text-black-70 text-md lg:text-2xl font-bold mb-8">
            portraying a feeling
          </h4>

          <div id="photo-box" className="flex justify-center mb-6">
            <Image
              src={imageUrl}
              alt="photo of kreics"
              width={1000}
              height={100}
              className="my-4"
            />
          </div>

          <p className="text-black-40 font-semibold text-md lg:text-2.5xl">
            check out my work{" "}
            <a href="/works" className="underline hover:text-black-70">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
