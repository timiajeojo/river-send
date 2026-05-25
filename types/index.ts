import type { ReactNode } from "react";

export type AuthMode = "signin" | "signup";
export type Page = "getstarted" | "auth" | "dashboard";
export type TabId = "home" | "activity" | "transfer" | "profile";

export interface Slide {
  headline: string;
  accent: string;
  sub: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

export interface Transaction {
  id: number;
  name: string;
  date: string;
  time: string;
  amount: string;
  positive: boolean;
  bg: string;
  initials?: string;
  logo?: "spotify" | "amazon" | "netflix";
}

export interface QuickAction {
  label: string;
  icon: ReactNode;
}

export interface NavTab {
  id: TabId;
  label: string;
  icon: ReactNode;
}