"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface InstagramData {
  profilePicUrl: string;
}

export default function Navbar() {
  const [profileData, setProfileData] = useState<InstagramData>({
    profilePicUrl: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch("/api/instagram");
        const data = await response.json();
        setProfileData({ profilePicUrl: data.profilePicUrl });
        setLoading(false);
      } catch (error) {
        console.error("Navbar error:", error); // ✅ Log the error instead of leaving it unused
      }
    }
    fetchProfileData();
  }, []);

  return (
    <nav className="bg-white text-gray-900 space-x-7 px-6 flex justify-between items-center shadow-md">
      {/* Left: Profile Picture & Title */}
      <div className="flex items-center space-x-4">
        {loading ? (
          <div className="w-auto rounded-full bg-gray-300 animate-pulse" />
        ) : (
          <Image
            src={profileData.profilePicUrl || "/default-profile.png"}
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
        <span className="text-xl font-semibold">nawa.fuku</span>
      </div>

      {/* Right: WhatsApp Button */}
      <a
        href={`https://wa.me/6285694481583?text=${encodeURIComponent(
          "Permisi MinWa apakah Nawa Fuku masih tersedia?"
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-green-500 px-4 py-2 rounded-lg shadow-md hover:bg-slate-50 transition"
      >
        Order Now
      </a>
    </nav>
  );
}
