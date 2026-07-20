"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Compass, UserPlus } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { registerUser } from "@/actions/auth";
import styles from "./auth.module.css";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = (data: RegisterInput) => {
    setServerError(null);
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);

    startTransition(async () => {
      const result = await registerUser(formData);
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
      <h1 className={styles["wayfarly-auth-title"]}>Create your account</h1>
      <p className={styles["wayfarly-auth-sub"]}>Start organizing your first trip in a couple of minutes.</p>

      {serverError && <div className={styles["wayfarly-auth-banner"]}>{serverError}</div>}

      <form className={styles["wayfarly-auth-form"]} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="name">Name</label>
          <input id="name" className={styles["wayfarly-auth-input"]} placeholder="Ada Lovelace" {...register("name")} />
          {errors.name && <p className={styles["wayfarly-auth-error"]}>{errors.name.message}</p>}
        </div>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className={styles["wayfarly-auth-input"]} placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className={styles["wayfarly-auth-error"]}>{errors.email.message}</p>}
        </div>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className={styles["wayfarly-auth-input"]} placeholder="At least 8 characters" {...register("password")} />
          {errors.password && <p className={styles["wayfarly-auth-error"]}>{errors.password.message}</p>}
        </div>
        <div className={styles["wayfarly-auth-field"]}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input id="confirmPassword" type="password" className={styles["wayfarly-auth-input"]} placeholder="Repeat password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className={styles["wayfarly-auth-error"]}>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className={styles["wayfarly-auth-submit"]} disabled={isPending}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, justifyContent: "center", width: "100%" }}>
            <UserPlus size={16} /> {isPending ? "Creating account..." : "Create account"}
          </span>
        </button>
      </form>

      <p className={styles["wayfarly-auth-footer-text"]}>
        Already have an account?{" "}
        <Link href="/login" className={styles["wayfarly-auth-link"]}>
          Log in
        </Link>
      </p>
    </div>
  );
}
