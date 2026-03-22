export default function Home() {
  return (
    <main>
      {/* HERO DARK */}
      <section className="hero-dark">
        <div className="container hero">
          <div className="hero-text dark">
            <h1>
              Get Aroma of <br />
              <span>Fresh Pizza</span>
            </h1>
            <p>
              Delicious handmade pizza with fresh ingredients and authentic taste
            </p>
            <button className="btn-yellow">Order Now</button>
          </div>

          <div className="hero-img">
            <img src="/hero.jpeg" alt="pizza" />
          </div>
        </div>

        {/* FLOATING CARDS */}
        <div className="feature-floating container">
          <div className="feature-card">Fresh Ingredients</div>
          <div className="feature-card">Best Quality</div>
          <div className="feature-card yellow">Fast Delivery</div>
          <div className="feature-card yellow">Hot & Fresh</div>
        </div>
      </section>

      {/* LIGHT SECTION */}
      <section className="light-section container">
        <h2>Our Special Pizza</h2>
        <p>Try our best menu with premium taste</p>
      </section>

      {/* SECTION 2 */}
<section className="section-two container">
  <div className="section-two-grid">
    <div className="section-text">
      <h2>Italian Pizza Special</h2>
      <p>
        Enjoy the best Italian pizza with premium ingredients and authentic taste
      </p>
      <div className="section-btns">
        <button className="btn-yellow">Order Now</button>
        <button className="btn-outline">View Menu</button>
      </div>
    </div>

    <div className="section-img">
      <img src="/hero.jpeg" alt="pizza" />
    </div>
  </div>
</section>

{/* MENU */}
<section className="menu container">
  <h2>Popular Menu</h2>

  <div className="menu-grid">
    {[
      {
        name: "Pizza",
        img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
        tag: "Best",
      },
      {
        name: "Fries",
        img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
        tag: "New",
      },
      {
        name: "Burger",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        tag: "Hot",
      },
      {
        name: "Double Burger",
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
        tag: "Sale",
      },
    ].map((item, i) => (
      <div className="menu-card" key={i}>
        <div className="menu-tag">{item.tag}</div>
        <img src={item.img} alt={item.name} />
        <h4>{item.name}</h4>
        <p>$12.00</p>
        <button className="btn-secondary">Order</button>
      </div>
    ))}
  </div>
</section>
    </main>
  );
}