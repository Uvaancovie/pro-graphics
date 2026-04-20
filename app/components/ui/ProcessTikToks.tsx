"use client";

const videos: Array<any> = [
  {
    platform: "youtube",
    id: "0E5bTDJnz-o",
    url: "https://youtube.com/shorts/0E5bTDJnz-o?si=Yd835sl1xVON9vss",
    embedUrl: "https://www.youtube-nocookie.com/embed/0E5bTDJnz-o?rel=0&modestbranding=1",
    title: "Pro Graphics YouTube Short",
  }
];

export function ProcessTikToks() {
  return (
    <section className="py-20 bg-blue-950 border-t border-blue-900 border-b relative z-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            See Our <span className="text-amber-500">Process</span> in Action
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto font-light">
            Behind the scenes of our premium graphics, vehicle wraps, and custom print setups at Pro Graphics Durban.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="flex justify-center w-full overflow-hidden rounded-xl shadow-lg bg-black/10 items-center min-h-[580px]">
              <iframe
                src={video.embedUrl}
                title={video.title || "YouTube Short"}
                className="w-full h-[580px] rounded-xl"
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
