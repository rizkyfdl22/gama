// app/page.js
export default function Home() {
  return (
    <main className="px-8">
      {/* HERO */}
      <section className="grid md:grid-cols-2 items-center gap-10 py-16">
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Get Aroma of Fresh Pizza
          </h1>
          <p className="mb-6">
            Delicious pizza with the best ingredients and authentic taste.
          </p>
          <button className="px-6 py-3 rounded-xl" style={{ background: "var(--wood)" }}>
            Explore Menu
          </button>
        </div>
        <img src="/pizza.png" className="rounded-2xl" />
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          "Fresh Ingredients",
          "Fast Delivery",
          "Best Quality",
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl shadow bg-white">
            {item}
          </div>
        ))}
      </section>

      {/* MENU */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Menu</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow">
              <img src="/pizza.png" className="rounded-xl mb-4" />
              <h3 className="font-semibold">Pizza {i}</h3>
              <p className="text-sm">Delicious pizza</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
