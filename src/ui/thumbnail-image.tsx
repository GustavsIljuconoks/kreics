import Image from "next/image";
import Link from "next/link";
import style from "@/styles/thumbnail-image.module.css";

interface IProps {
  thumbnail: string;
  alt: string;
  eventName: string;
  description?: string;
  type: string;
}

export default function Thumbnail(thumbnail: IProps) {
  return (
    <Link
      href={{
        pathname: `/work/${thumbnail.type}/${thumbnail.eventName}`,
      }}
    >
      <div className="project-cover">
        <div className="cover-container">
          <div className="cover-image-wrap w-full h-full relative">
            <div className="cover-image relative">
              <div className="cover-image-normal" key={thumbnail.alt}>
                <Image
                  src={thumbnail.thumbnail}
                  alt={thumbnail.alt}
                  className="object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>

          <div className="details-wrap">
            <div className={style.details}>
              <div className="details-inner w-full p-[0%]">
                <div
                  className="title-preserver-whitespace text-black-70"
                  key={thumbnail.eventName}
                >
                  <p>{thumbnail.eventName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
