import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full py-4 mt-auto">
      <div className="flex justify-between max-w-[1280px] mx-auto px-4">
        <div className="text-left text-gray-700">
          <p>DIRECTOR OF PHOTOGRAPHY | kreics</p>
        </div>
        <div className="flex items-center space-x-4 ml-8">
          <a
            href="https://www.instagram.com/kreicsfilms/"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image alt="Instagram logo" src="/instagram.svg" width={24} height={24} />
          </a>

          <a
            href="https://www.youtube.com/channel/UCVxL93fPm0rDP31Nbh7hlVg"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <Image alt="YouTube logo" src="/youtube.svg" width={30} height={30} />
          </a>
        </div>
      </div>
    </div>
  );
}
