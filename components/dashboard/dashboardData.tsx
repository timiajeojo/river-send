import type { ReactNode } from "react"
import type { Transaction, QuickAction, NavTap } from "@/types"



export function formatData(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) 
}

export function formatTime(h: number, m: number, ampm: "AM" | "PM"): string {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${apm}`
}


export const transactions: Transaction[] = [
  {
    
  }
  ]; 