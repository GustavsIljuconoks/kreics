// components/YouTubeEmbed.tsx
export default function YouTubeEmbed({ videoId, title = 'YouTube video' }: { videoId: string; title?: string }) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-black pt-[56.25%] shadow-[0_16px_48px_rgba(0,0,0,0.14)]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
