"use client";

import { useState, useTransition, FormEvent } from "react";
import Link from "next/link";
import styles from "./register-form.module.css";

type RegisterRole = "player" | "eo";

const ROLES = [
  { value: "player", label: "PLAYER" },
  { value: "eo", label: "EO" },
] as const;

export default function RegisterForm() {
  const [role, setRole] = useState<RegisterRole>("player");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Konseptual payload yang akan dikirim ke backend
    // Backend yang akan melakukan hashing dari 'password' menjadi 'password_hash'
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      phone_number: formData.get("phone_number"),
      role: formData.get("role"),
    };

    startTransition(() => {
      // TODO: Implementasi pemanggilan API/Server Action sesungguhnya di sini.
      // Simulasi delay request
      setTimeout(() => {
        console.log("Submitting payload to backend:", payload);
        // Simulasi sukses atau error, ubah logika sesuai response backend
        // setError("Registrasi gagal. Silakan coba lagi.");
      }, 1500);
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>JOIN SEMESTA</span>
        <h1 className={styles.title}>CREATE YOUR ACCOUNT.</h1>
        <p className={styles.description}>Choose your role and enter the arena.</p>
      </div>

      <div className={styles.roleSelector} role="group" aria-label="Register as">
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            className={styles.roleButton}
            aria-pressed={role === r.value}
            onClick={() => setRole(r.value)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="hidden" name="role" value={role} />

        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <div className={styles.inputWrapper}>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Masukkan nama kamu"
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Masukkan email kamu"
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Buat password"
              required
              className={`${styles.input} ${styles.inputPassword}`}
            />
            <button
              type="button"
              className={styles.visibilityToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone_number" className={styles.label}>Phone Number</label>
          <div className={styles.inputWrapper}>
            <input
              id="phone_number"
              type="tel"
              name="phone_number"
              autoComplete="tel"
              placeholder="Masukkan nomor telepon"
              required
              className={styles.input}
            />
          </div>
        </div>

        {error && (
          <div className={styles.errorAlert} role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={isPending}
        >
          {isPending
            ? "CREATING ACCOUNT..."
            : role === "player"
            ? "CREATE PLAYER ACCOUNT"
            : "CREATE EO ACCOUNT"}
        </button>
      </form>

      <div className={styles.footer}>
        <span>Sudah punya akun?</span>
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      </div>
    </div>
  );
}