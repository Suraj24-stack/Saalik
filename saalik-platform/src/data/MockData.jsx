export const mockData = {

// Navbar Data
  navbar: {
    logo: "/saaliklogo.png", // Place your logo in public folder
    brandName: "SAALIK"
  },

  // Hero Carousel Slides
  heroSlides: [
    {
      id: 1,
      title: "DURBAR SQUARE'S",
      highlight: "KAAL BHAIRAB",
      subtitle: "Discover the Untold Stories of Nepal",
      image: "/1.jpeg", // Place image in public folder
      icon: "🏛️"
    },
    {
      id: 2,
      title: "THE SHADOWS OF",
      highlight: "KHYAK",
      subtitle: "Discover the Untold Stories of Nepal",
      image: "/natrajan.png", // Place image in public folder
      icon: "👹"
    },
    {
      id: 3,
      title: "THE TALE OF",
      highlight: "HIMALAYAN YETI",
      subtitle: "Discover the Untold Stories of Nepal",
      image: "/", // Place image in public folder
      icon: "🦍"
    }
  ],

  // About Section Image
  aboutImage: "/natrajan.png", // Place deity statue image in public folder

  // Stories for Stories Section
  stories: [
    {
      id: 1,
      title: "The Tale of Himalayan Yeti",
      image: "/untold.png",
      excerpt: "Ancient legends of the mysterious creature that roams the Himalayas...",
      content: `The Himalayan Yeti, also known as the "Abominable Snowman," represents one of the most enduring mysteries of the Himalayan region. Local communities have passed down stories of this elusive creature for generations, describing it as a large, ape-like being that inhabits the remote mountain regions of Nepal.`,
      category: "Mythology",
      location: "Himalayan Region",
      date: "Ancient"
    },
    {
      id: 2,
      title: "The Shadows of Khyak",
      image: "/6.png",
      excerpt: "Dark mysteries surrounding the ancient temple...",
      content: `The temple of Khyak holds centuries of untold stories and mysterious occurrences. Located in a remote valley, this ancient structure has been a site of worship and mystery, with local legends speaking of supernatural events and guardian spirits that protect the sacred grounds.`,
      category: "Mystery",
      location: "Khyak Valley",
      date: "12th Century"
    },
    {
      id: 3,
      title: "Durbar Square's Tale of Kaal Bhairab",
      image: "/stories/kaal-bhairab.jpg",
      excerpt: "The fierce protector deity's origin and significance...",
      content: `Kaal Bhairab, the fierce manifestation of Lord Shiva, stands as the eternal guardian of Kathmandu's Durbar Square. This imposing stone statue dates back to the 17th century and is believed to possess the power to compel truth from those who stand before it.`,
      category: "Heritage",
      location: "Kathmandu Durbar Square",
      date: "17th Century"
    },
    {
      id: 4,
      title: "The Self-Emerging Statue of Kali",
      image: "/stories/kali.jpg",
      excerpt: "A miraculous archaeological phenomenon...",
      content: `The self-emerging statue of Kali at Pashupatinath Temple represents one of the most enigmatic archaeological mysteries in Nepal. According to legend, this statue emerged from the ground on its own, growing taller with each passing year, defying conventional explanations.`,
      category: "Archaeology",
      location: "Pashupatinath Temple",
      date: "Ancient"
    },
    {
      id: 5,
      title: "The Living Goddess Kumari",
      image: "/stories/kumari.jpg",
      excerpt: "The tradition of worshipping a young girl as a living deity...",
      content: `The Kumari tradition represents a unique aspect of Nepalese culture where a young girl is selected to be worshipped as a living goddess. This centuries-old practice continues to fascinate scholars and devotees alike.`,
      category: "Tradition",
      location: "Kathmandu",
      date: "Ongoing"
    },
    {
      id: 6,
      title: "The Sleeping Vishnu",
      image: "/stories/vishnu.jpg",
      excerpt: "The magnificent reclining statue at Budhanilkantha...",
      content: `The Sleeping Vishnu statue at Budhanilkantha is a masterpiece of ancient Nepali sculpture, depicting Lord Vishnu in a cosmic sleep, reclining on the coils of the serpent Ananta.`,
      category: "Heritage",
      location: "Budhanilkantha",
      date: "5th Century"
    }
  ],

  // Partners/Associations
  partners: [
    { 
      id: 1, 
      name: "Department of Archaeology", 
      logo: "/3.png",
      description: "Government department preserving Nepal's archaeological heritage"
    },
    { 
      id: 2, 
      name: "National Archives", 
      logo: "/3.png",
      description: "Repository of Nepal's historical documents"
    },
    { 
      id: 3, 
      name: "Kageshwori Manohara Municipality", 
      logo: "/4.png",
      description: "Local municipality supporting cultural preservation"
    },
    { 
      id: 4, 
      name: "Tokha Municipality", 
      logo: "/5.png",
      description: "Local municipality promoting heritage tourism"
    }
  ],

  // Initiatives
  initiatives: [
    { 
      id: 1, 
      name: "openlipi", 
      description: "Digital preservation of ancient Nepali scripts and languages",
      logo: "/2.png",
      link: "https://openlipi.org"
    },
    { 
      id: 2, 
      name: "openabhilekh", 
      description: "Open access platform for historical inscriptions and records",
      logo: "/initiatives/openabhilekh.svg",
      link: "https://openabhilekh.org"
    },
    { 
      id: 3, 
      name: "SANKET", 
      description: "Cultural heritage documentation and storytelling platform",
      logo: "/initiatives/sanket.svg",
      link: "https://sanket.org"
    },
    { 
      id: 4, 
      name: "RISTI AI", 
      description: "AI-powered heritage analysis and restoration technology",
      logo: "/initiatives/risti-ai.svg",
      link: "https://risti.ai"
    }
  ],

  // Guide Booking Section Data
  guideBooking: {
    title: "GUIDE BOOKING",
    subtitle: "Discover Nepal with Confidence",
    description: "Book certified local guides through SAALIK. Our curated guides bring culture, history, and spirituality to life while ensuring your safety and comfort. From heritage walks to temple tours, they help you experience Nepal beyond the surface.",
    buttonText: "LAUNCHING SOON",
    image: "/guide.png"
  },

  // Footer Data
  footer: {
    description: "Delivering innovative technology solutions with excellence and integrity.",
    quickLinks: [
      { name: "Home", link: "/" },
      { name: "Stories", link: "/stories" },
      { name: "Guide Booking", link: "/guide-booking" },
      { name: "Contact", link: "/contact" }
    ],
    company: [
      { name: "About", link: "/about" },
      { name: "Team", link: "/team" }
    ],
    social: [
      { name: "Facebook", handle: "/saalik", link: "https://facebook.com/saalik" },
      { name: "YouTube", handle: "/saalik0", link: "https://youtube.com/@saalik0" },
      { name: "Instagram", handle: "/saalik0", link: "https://instagram.com/saalik0" }
    ],
    copyright: "© 2025 SAALIK TECH PVT. LTD. All rights reserved",
    links: {
      privacy: "/privacy-policy",
      terms: "/terms-of-service"
    }
  }
};

// Default export for convenience
export default mockData;