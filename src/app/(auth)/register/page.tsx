import type { Metadata } from "next";
import RegisterForm from "../RegisterForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create a free Wayfarly account and start planning your next trip.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
