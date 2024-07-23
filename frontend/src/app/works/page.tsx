"use client";

import NavBar from "@/ui/nav-bar";
import Thumbnail from "@/ui/thumbnail-image";

export default function Page() {

  return (
    <div className="lg:flex w-full">
      <NavBar />

      <div className="lg:w-5/6 text-center lg:ml-2">
        <section
          id="photo-showcase"
          className="w-full md:flex flex-wrap lg:flex-nowrap items-start"
        >
          {/* {loading && "Loading..."} */}

          <h1 className="project-type text-[30vw] lg:text-[5vw]">photo</h1>

          <div className="image-collection-container md:-mt-[6.5rem] lg:grid-cols-2 lg:mt-0">
            {/* {docs?.map((doc: IThumbnail) => (
              <Thumbnail
                thumbnail={doc.imageUrl}
                key={doc.event_name}
                eventName={doc.event_name}
                alt={doc.event_name}
                description={doc.description}
                type="Photo"
              />
            ))} */}
          </div>
        </section>

        <section
          id="video-showcase"
          className="w-full md:flex flex-wrap lg:flex-nowrap items-start mt-8"
        >
          {/* {loading && "Loading..."} */}

          <h1 className="project-type w-100 text-[30vw] lg:text-[5vw]">
            video
          </h1>

          <div className="image-collection-container md:-mt-[6.5rem] lg:grid-cols-2 lg:mt-0">
            {/* {videos?.map((video: IThumbnail) => (
              <Thumbnail
                thumbnail={video.imageUrl}
                key={video.event_name}
                eventName={video.event_name}
                alt={video.event_name}
                type="Video"
              />
            ))} */}
          </div>
        </section>
      </div>
    </div>
  );
}
