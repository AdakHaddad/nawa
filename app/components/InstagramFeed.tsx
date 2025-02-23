"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InstagramData {
  profilePicUrl: string;
  posts: {
    imageUrl: string;
    caption: string;
  }[];
}

export default function InstagramFeed() {
  const [data, setData] = useState<InstagramData>({
    profilePicUrl: "",
    posts: [],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === data.posts.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data.posts.length]); // Run effect when posts change

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/instagram");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  if (loading)
    return <div className="text-center py-4 sm:py-6 md:py-10">Loading...</div>;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? data.posts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === data.posts.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-[95vw] md:max-w-4xl mx-auto py-2 px-4 md:px-0">
      {data.posts.length > 0 ? (
        <div className="relative w-full aspect-square md:aspect-[4/3] mx-auto overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data.posts.map((post, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center bg-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {data.posts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Arrow Buttons - Hidden on mobile, visible on larger screens */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full opacity-75 hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full opacity-75 hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            ❯
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available.</p>
      )}
    </div>
  );
}
