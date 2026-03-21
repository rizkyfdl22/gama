// app/components/Navbar.js
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <h1 className="font-bold text-xl" style={{ color: "var(--sage)" }}>
        PizzaBrand
      </h1>
      <ul className="flex gap-6">
        <li>Home</li>
        <li>Menu</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <button className="px-4 py-2 rounded-xl" style={{ background: "var(--wood)" }}>
        Order Now
      </button>
    </nav>
  );
}
