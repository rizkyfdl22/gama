"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminNavbar.module.css";

export default function AdminNavbar() {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", path: "/admin" },
    { name: "Tournaments", path: "/admin/tournaments" },
    { name: "Participants", path: "/admin/teams" },
    { name: "Brackets", path: "/admin/matches" },
  ];

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
    </aside>
  );
}