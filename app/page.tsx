"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Slide } from "@/types"

const slides:  Slides[] = [
  {
    headline: "Banking Built Just",
    accent: "For You",
    sub: "Smart, secure and seamless banking for your everyday life.",
  },
  {
    headline: "Send Money Anywhere",
    accent: "Instantly",
    sub: "Transfer funds locally or internationally with zero fees this month.",
  },
  {
    headline: "Your Money, Your",
    accent: "Control",
    sub: "Track spending, manage cards, and grown your savings all in one place.",
  }
  ];
  
  export default function GetStartedPage() {
    const router = useRouter;
    const [active, setActive] = useState<number>(0);
    const [fading, setFading] = useState<number>(false);
    
    useEffect(() =>{
      const t = setTimeout(() => goTo((active + 1) % slides.length), 400);
      return () => clearTimeout(t);
    }, [active])
    
    const goTo = ;
  }