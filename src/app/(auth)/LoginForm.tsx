"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Compass, LogIn } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { loginUser } from "@/actions/auth";
import styles from "./auth.module.css";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginInput) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("email", data.email);
    formData.set("password", data.password);

    startTransition(async () => {
      const result = await loginUser(formData);
      if (result && !result.success) setServerError(result.message);
    });
  };

  return (
    <div className={styles["wayfarly-auth-card"]}>
      <Link href="/" className={styles["wayfarly-auth-logo"]}>
        <span className={styles["wayfarly-auth-logo-mark"]}>
          <Compass size={16} strokeWidth={2.5} />
        </span>
        Wayfarly
      </Link>
      <h1 className={styles["wayfarly-auth-title"]}>Welcome back</h1>
      <p className={styles["wayfarly-auth-sub"]}>Log in to pick up your trips where you left off.</p>

      {serverError && <div className={styles["wayfarly-auth-banner"]}>{serverError}</div>}

      <form className={styles["wayfarly-auth-form"]} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className={styles["wayfarly-auth-input"]} placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className={styles["wayfarly-auth-error"]}>{errors.email.message}</p>}
        </div>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className={styles["wayfarly-auth-input"]} placeholder="••••••••" {...register("password")} />
          {errors.password && <p className={styles["wayfarly-auth-error"]}>{errors.password.message}</p>}
        </div>
        <div className={styles["wayfarly-auth-row-between"]}>
          <span />
          <Link href="/" className={styles["wayfarly-auth-link"]}>
            Forgot password?
          </Link>
        </div>
        <button type="submit" className={styles["wayfarly-auth-submit"]} disabled={isPending}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%" }}>
            <LogIn size={16} /> {isPending ? "Logging in..." : "Log in"}
          </span>
        </button>
      </form>

      <p className={styles["wayfarly-auth-footer-text"]}>
        New to Wayfarly?{" "}
        <Link href="/register" className={styles["wayfarly-auth-link"]}>
          Create an account
        </Link>
      </p>
    </div>
  );
}
