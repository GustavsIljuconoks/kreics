"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/ui/nav-bar";

import { db } from "@/utils/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "About me",
// };

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      const docRef = doc(db, "test", "about_me");
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
    <div className="lg:flex w-full">
      <NavBar />

      <div className="lg:w-5/6 text-left">
        <div className="text-start text-md lg:text-xl px-10">
          <div id="bio-section" className="mt-6">
            <div id="photo-box" className="flex justify-start mb-6">
              <Image
                src={imageUrl}
                alt="photo of kreics"
                width={1000}
                height={100}
                className="my-4"
              />
            </div>
            <p className="mt-2 max-w-[1000px]">
              hello! i am ingus, a <b>filmmaker</b> and a <b>photographer</b>{" "}
              that specializes in capturing life in its purest form. love
              abstract and alternative approaches to video and photo products. i
              believe that everyone has a unique perspective, if you are
              interested in what i can produce -
              <Link href="/contact" className="underline hover:text-black-90">
                contact me
              </Link>
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
