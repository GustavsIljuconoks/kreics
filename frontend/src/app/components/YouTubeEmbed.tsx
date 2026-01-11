// components/YouTubeEmbed.tsx
export default function YouTubeEmbed({ videoId, title = 'YouTube video' }: { videoId: string; title?: string }) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
