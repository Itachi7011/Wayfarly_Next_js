import styles from "./auth.module.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles["wayfarly-auth-shell"]}>{children}</div>;
}
