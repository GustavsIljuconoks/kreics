'use client';

const qs = require('qs');
import { flattenAttributes } from "@/lib/utils";
import { BASE_URL } from "@/lib/definitions";
import { StrapiImage } from "../../components/StrapiImage";
import Masonry from 'react-masonry-css';
import ScrollButton from "@/app/components/ScrollButton";

async function getStrapiData(path: string, eventName: string) {
    const query = qs.stringify({
        populate: {
            event: {
                populate: '*',
            },
        }
    }, { encodeValuesOnly: true });

  const res = await fetch(`${BASE_URL}${path}?${query}`);

  if (!res.ok) {
    console.error(`Error: ${res.status} - ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const flattenedData = flattenAttributes(data);

  const filteredEvents = flattenedData.event.filter((event: { name: string; }) => event.name === decodeURIComponent(eventName));

  return filteredEvents;
}


interface ProjectPageParams {
    params: {
        name: string;
    };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
    const { name } = params;
    const eventArray = await getStrapiData("/api/photo", name);
    let event = eventArray[0];

    return (
        <div id="content" className="w-full px-8 pt-20 pb-16 md:px-16 xl:px-32">
            <div className="lg:flex w-full">

                <div className="w-full lg:w-5/6 text-center">
                    <div className="project-module w-full bg-black-10 mb-8">
                        <StrapiImage 
                            src={BASE_URL + event.thumbnail.url}
                            alt={event.thumbnail.alternativeText}
                            width={1000}
                            height={1000}
                        />
                    </div>

                    <div className="description mb-32 p-6 text-start lg:mb-56 lg:p-0">
                        <h1 className="text-2xl font-bold mb-4">
                            {event.name}
                        </h1>
                        <p>{event.description}</p>
                    </div>

                    <Masonry
                        breakpointCols={{ default: 3, 1024: 1, 1600: 2 }}
                        className="flex gap-2">

                        {event.media.data?.map((image: any, idx: number) => (
                            <div key={idx}>
                                <StrapiImage
                                    src={BASE_URL + image.url}
                                    alt={image.alternativeText}
                                    width={1000}
                                    height={1000}
                                    className="my-4 hover:opacity-70 cursor-pointer"
                                />
                            </div>
                        ))}
                    </Masonry>
                    <ScrollButton />
                </div>
            </div>
        </div>
    );
}
