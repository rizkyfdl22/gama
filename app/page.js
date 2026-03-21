// app/page.js
export default function Home() {
  const heroImg = "https://images.unsplash.com/photo-1601924582975-7e2d3a6f2c90?q=80&w=1200";

  const menuImgs = [
    "https://images.unsplash.com/photo-1548365328-9f547fb0953d?q=80&w=800",
    "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=800",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800",
    "https://images.unsplash.com/photo-1603079841596-4b5a1bbfd1bb?q=80&w=800",
  ];

  return (
    <main className="px-6 md:px-12">
      
      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center gap-10 py-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Get Aroma of Fresh Pizza
          </h1>
          <p className="mb-6 text-gray-600">
            Delicious pizza with the best ingredients and authentic taste.
          </p>
          <button
            className="px-6 py-3 rounded-xl font-semibold"
            style={{ background: "var(--wood)" }}
          >
            Explore Menu
          </button>
        </div>

        <img
          src={heroImg}
          alt="Pizza"
          className="rounded-3xl shadow-lg w-full object-cover"
        />
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 py-10">
        {[
          "Fresh Ingredients",
          "Fast Delivery",
          "Best Quality",
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow bg-white text-center font-medium"
          >
            {item}
          </div>
        ))}
      </section>

      {/* MENU */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Menu</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {menuImgs.map((img, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <img
                src={img}
                alt={`Pizza ${i + 1}`}
                className="rounded-xl mb-4 h-40 w-full object-cover"
              />
              <h3 className="font-semibold">Pizza {i + 1}</h3>
              <p className="text-sm text-gray-500">
                Delicious pizza
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}