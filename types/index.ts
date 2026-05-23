export type AuthMode = "signin" | "signup";
export type Page = "getstarted" | "auth";

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
