"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const menus = [
    { name: "Dashboard", path: "/admin" },
    { name: "Tournaments", path: "/admin/tournaments" },
    { name: "Brackets", path: "/admin/matches" },
    { name: "Blogs", path: "/admin/blogs/" },
  ];

  // 🔥 LOGOUT FUNCTION
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      router.push("/login"); // redirect ke login
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel</h2>

      <nav>
        {menus.map((menu) => {
          const isActive = pathname === menu.path;

          return (
            <Link
              key={menu.path}
              href={menu.path}
              className={`${styles.link} ${
                isActive ? styles.active : ""
              }`}
            >
              {menu.name}
            </Link>
          );
        })}
      </nav>

      {/* 🔥 LOGOUT BUTTON */}
      <button onClick={handleLogout} className={styles.logout}>
        Logout
      </button>
    </aside>
  );
}