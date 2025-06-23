export const siteConfig = {
  business: {
    name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nawa Fuku",
    tagline: process.env.NEXT_PUBLIC_BUSINESS_TAGLINE || "Kue Kering & Cheese Cake",
    description: process.env.NEXT_PUBLIC_BUSINESS_DESCRIPTION || 
      "Nawa Fuku brings you delightful homemade treats in Jakarta. We specialize in traditional kue kering and freshly baked cheese cakes, made with love and the finest ingredients.",
    location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || "Jakarta, Indonesia",
  },
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285694481583",
    instagram: {
      handle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "nawa.fuku",
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/nawa.fuku",
      sourceUrl: process.env.INSTAGRAM_SOURCE_URL || "https://www.instagram.com/nawa.fuku/",
    },
  },
  messages: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE || 
      "Assalamualaikum, saya ingin memesan kue. Apakah ada yang tersedia?",
  },
  metadata: {
    title: process.env.NEXT_PUBLIC_META_TITLE || "Nawa Fuku | Kue Kering & Cheese Cake di Jakarta",
    description: process.env.NEXT_PUBLIC_META_DESCRIPTION || 
      "Nawa Fuku menyediakan kue kering dan cheese cake lezat di Jakarta. Dibuat dengan bahan berkualitas! Hubungi kami via WhatsApp.",
    keywords: (process.env.NEXT_PUBLIC_META_KEYWORDS || 
      "Nawa Fuku, kue kering, cheese cake, kue lebaran, Jakarta, homemade cookies").split(",").map(k => k.trim()),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nawafuku.vercel.app",
  },
} as const; 