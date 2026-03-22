export default function Home() {
  const heroImg = "https://images.unsplash.com/photo-1601924582975-7e2d3a6f2c90?q=80&w=1400";

  const menu = [
    {
      title: "Cheese Lovers",
      img: "https://images.unsplash.com/photo-1548365328-9f547fb0953d?q=80&w=800",
      bg: "#FFF4E6",
    },
    {
      title: "Pepperoni",
      img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800",
      bg: "#FDECEC",
    },
    {
      title: "Veggie Delight",
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800",
      bg: "#EEF7F0",
    },
    {
      title: "Meat Feast",
      img: "https://images.unsplash.com/photo-1603079841596-4b5a1bbfd1bb?q=80&w=800",
      bg: "#F4F1FB",
    },
  ];

  return (
    <main className="px-6 md:px-16">

      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center gap-12 py-20">
        <div>
          <p className="text-sm mb-2" style={{ color: "var(--sage)" }}>
            🍕 Fresh & Hot
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Get Aroma of <br /> Fresh Pizza
          </h1>

          <p className="mb-8 text-gray-600 max-w-md">
            Experience the best handcrafted pizza made with premium
            ingredients and baked to perfection.
          </p>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 rounded-xl font-semibold shadow"
              style={{ background: "var(--wood)" }}
            >
              Explore Menu
            </button>

            <button className="px-6 py-3 rounded-xl border">
              View Deals
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent rounded-3xl"></div>
          <img
            src={heroImg}
            alt="Pizza"
            className="rounded-3xl shadow-xl w-full object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 py-10">
        {[
          { title: "Fresh Ingredients", icon: "🥬" },
          { title: "Fast Delivery", icon: "🚀" },
          { title: "Best Quality", icon: "⭐" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow bg-white text-center hover:shadow-lg transition"
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="font-semibold">{item.title}</p>
          </div>
        ))}
      </section>

      {/* MENU */}
      <section className="py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Popular Menu
          </h2>
          <button className="text-sm" style={{ color: "var(--sage)" }}>
            View All →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {menu.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl transition hover:scale-105"
              style={{ background: item.bg }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-xl mb-4 h-40 w-full object-cover shadow"
              />

              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">
                Delicious pizza with rich flavor
              </p>

              <button
                className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "var(--wood)" }}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
