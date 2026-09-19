"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import styles from "./login-form.module.css";

type LoginRole = "player" | "eo";

export default function LoginForm() {
  const [role, setRole] = useState<LoginRole>("player");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles: { value: LoginRole; label: string }[] = [
    { value: "player", label: "PLAYER" },
    { value: "eo", label: "EO" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    // Ambil data dari form
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const selectedRole = formData.get("role");

    try {
      // TODO: Ganti block ini dengan Server Action / Auth Provider function (misal signIn dari NextAuth)
      // Contoh integrasi: await loginAction(formData)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mocking network delay
      
      console.log("Submitting payload:", {
        email,
        password,
        role: selectedRole,
      });

      // Simulasi error respons dari backend
      // setError("Email atau password salah.");
      
    } catch (err) {
      setError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Form */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>WELCOME BACK, COMPETITOR</span>
        <h1 className={styles.title}>ENTER THE ARENA</h1>
        <p className={styles.description}>
          Login to manage your tournaments, teams, and competitive journey.
        </p>
      </div>

      {/* Main Form */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Hidden input agar role terkirim bersama form submission standar */}
        <input type="hidden" name="role" value={role} />

        {/* Role Selector */}
        <div className={styles.roleSelector} role="group" aria-label="Pilih Role Login">
          <span className={styles.roleLabel}>LOGIN AS</span>
          <div className={styles.roleTabs}>
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                className={`${styles.roleTab} ${role === r.value ? styles.roleActive : ""}`}
                onClick={() => setRole(r.value)}
                aria-pressed={role === r.value}
                disabled={isPending}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message Area */}
        {error && (
          <div className={styles.errorMessage} role="alert">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={styles.input}
            placeholder="Masukkan email kamu"
            required
            autoComplete="email"
            disabled={isPending}
          />
        </div>

        {/* Password Field */}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.passwordInput}
              placeholder="Masukkan password kamu"
              required
              autoComplete="current-password"
              disabled={isPending}
            />
            <button
              type="button"
              className={styles.pwdToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              disabled={isPending}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className={styles.optionsRow}>
          <label className={styles.checkboxWrapper}>
            {/* Note: Checkbox remember me, backend integration ready */}
            <input 
              type="checkbox" 
              name="remember" 
              className={styles.checkbox}
              disabled={isPending} 
            />
            <span className={styles.checkboxLabel}>Ingat saya</span>
          </label>
          <Link href="/forgot-password" className={styles.forgotLink}>
            Lupa password?
          </Link>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "LOGGING IN..." : `LOGIN AS ${role.toUpperCase()}`}
        </button>
      </form>

      {/* Footer Nav */}
      <div className={styles.footer}>
        Belum punya akun?{" "}
        <Link href="/register" className={styles.registerLink}>
          Register
        </Link>
      </div>
    </div>
  );
}