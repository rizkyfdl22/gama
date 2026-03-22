export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero container">
        <div className="hero-text">
          <h1>
            Get Aroma of <br /> <span>Fresh Pizza</span>
          </h1>
          <p>
            Discover the taste of delicious handmade pizza with fresh
            ingredients and authentic recipes.
          </p>
          <button className="btn-primary">Order Now</button>
        </div>

  <div className="hero-img">
  <img src="/hero.jpeg" alt="pizza hero" />
</div>
      </section>

      {/* FEATURES */}
      <section className="features container">
        <div className="feature-card">
          <h3>Fresh Ingredients</h3>
          <p>We use only the best quality ingredients</p>
        </div>
        <div className="feature-card">
          <h3>Fast Delivery</h3>
          <p>Hot pizza delivered to your door</p>
        </div>
        <div className="feature-card">
          <h3>Best Chefs</h3>
          <p>Made by experienced chefs</p>
        </div>
      </section>

      {/* MENU */}
      <section className="menu container">
        <h2>Our Popular Menu</h2>

        <div className="menu-grid">
          {[
            {
              name: "Pepperoni Pizza",
              img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
            },
            {
              name: "French Fries",
              img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5",
            },
            {
              name: "Burger",
              img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            },
            {
              name: "Double Burger",
              img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
            },
          ].map((item, i) => (
            <div className="menu-card" key={i}>
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <button className="btn-secondary">Order</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-box">
          <div>
            <h3>Special Offer</h3>
            <p>Get 20% off on your first order</p>
          </div>
          <button className="btn-primary">Claim Now</button>
        </div>
      </section>
    </main>
  );
}