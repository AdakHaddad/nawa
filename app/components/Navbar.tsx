"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/app/config/site";

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
        console.error("Navbar error:", error);
      }
    }
    fetchProfileData();
  }, []);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Profile Picture & Title */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2">
              <Image
                src={profileData.profilePicUrl || "/default-profile.png"}
                alt={`${siteConfig.business.name} Profile Picture`}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-blue-900">{siteConfig.business.name}</span>
            <span className="text-sm text-gray-600">{siteConfig.business.tagline}</span>
          </div>
        </div>

        {/* Right: WhatsApp Button */}
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
            siteConfig.messages.whatsapp
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          Order Now
        </a>
      </div>
    </nav>
  );
}
