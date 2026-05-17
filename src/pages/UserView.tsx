import data from "../data/siteData.json";

type Post = (typeof data.posts)[number];
type StockDirection = "up" | "down" | "flat";

function categoryClass(categoryKey: string) {
  return ["post-category", categoryKey !== "stock" ? categoryKey : ""].filter(Boolean).join(" ");
}

function stockClass(direction: string) {
  const safeDirection: StockDirection = direction === "up" || direction === "down" ? direction : "flat";
  return ["stock-mention", safeDirection !== "flat" ? safeDirection : ""].filter(Boolean).join(" ");
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <div className="post-card-image">{post.imageIcon}</div>
      <div className="post-card-body">
        <div className="post-meta">
          <span className={categoryClass(post.categoryKey)}>{post.category}</span>
          <span className="post-date">{post.date}</span>
          <div className="platform-pills">
            {post.platforms.map((platform) => (
              <span className="platform-pill" key={`${post.title}-${platform}`}>
                {platform}
              </span>
            ))}
          </div>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.excerpt}</p>
        {post.stocks.length > 0 && (
          <div className="stock-row">
            {post.stocks.map((stock) => (
              <span className={stockClass(stock.direction)} key={stock.symbol}>
                {stock.symbol} {stock.change}
              </span>
            ))}
          </div>
        )}
        <div className="post-footer">
          <div className="post-actions">
            <button className="post-action">❤️ {post.likes}</button>
            <button className="post-action">💬 {post.comments}</button>
            <button className="post-action">🔗 Share</button>
          </div>
          <button className="read-more-btn">Read Full Post →</button>
        </div>
      </div>
    </article>
  );
}

export default function UserView() {
  const visiblePosts = data.posts.filter((post) => post.status !== "Scheduled");

  return (
    <div className="site-page user-view">
      <nav className="user-nav">
        <a className="nav-logo" href="/">
          <div className="logo-circle">
            <span>WWB</span>
          </div>
          <span className="nav-brand">{data.brand}</span>
        </a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Stocks</a></li>
          <li><a href="/">Insights</a></li>
          <li><a href="/">Trending</a></li>
          <li><a href="/">Community</a></li>
        </ul>
        <div className="nav-actions">
          <button className="user-chip">
            <span className="user-chip-avatar">U</span>
            My Account
          </button>
          <a className="button-link" href="/owner">
            <button className="btn btn-primary">Owner Login</button>
          </a>
        </div>
      </nav>

      <header className="user-hero">
        <h1>What <span>Wall Street</span><br />Is Really Buying</h1>
        <p>Your daily feed of institutional stock moves, earnings alerts, and market intelligence - curated by WWSB.</p>
        <div className="hero-meta">
          <div className="hero-meta-item"><div className="hero-meta-num">{data.stats.postsPublished}</div><div className="hero-meta-label">Posts Published</div></div>
          <div className="hero-meta-item"><div className="hero-meta-num">{data.stats.totalFollowers}</div><div className="hero-meta-label">Total Followers</div></div>
          <div className="hero-meta-item"><div className="hero-meta-num">Daily</div><div className="hero-meta-label">New Content</div></div>
        </div>
      </header>

      <section className="filter-bar" aria-label="Post filters">
        {["🏠 All Posts", "📊 Stock Insights", "📈 Earnings", "🏦 Insider Trades", "💰 Dividends", "🌍 Market News", "📝 Long-form"].map((filter, index) => (
          <button className={`filter-tab ${index === 0 ? "active" : ""}`} key={filter}>{filter}</button>
        ))}
        <div className="filter-right">
          <label className="search-mini">
            🔍 <input type="text" placeholder="Search posts or tickers..." />
          </label>
        </div>
      </section>

      <main className="content-wrapper">
        <section className="feed" aria-label="User feed">
          <div className="readonly-notice">
            👁️ <span>You are viewing as a <strong>User Account</strong>. Content is published by the WWSB Owner. You can read, like, and share posts.</span>
          </div>

          {visiblePosts.map((post) => (
            <PostCard post={post} key={post.title} />
          ))}
        </section>

        <aside className="user-sidebar">
          <div className="widget">
            <div className="widget-header">🔥 Trending This Week</div>
            <div className="widget-body">
              <div className="trending-mini">
                {data.trending.map((stock, index) => (
                  <div className="trending-mini-item" key={stock.symbol}>
                    <span className="t-rank">{String(index + 1).padStart(2, "0")}</span>
                    <div className="t-info"><div className="t-name">{stock.symbol}</div><div className="t-sector">{stock.sector}</div></div>
                    <span className={stock.direction === "down" ? "t-change-down" : "t-change-up"}>{stock.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">🌐 Follow WWSB</div>
            <div className="widget-body">
              <div className="social-follow-list">
                {data.socialLinks.map((social) => (
                  <a href={social.url} target={social.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="social-follow-item" key={social.name}>
                    <span className="sf-icon">{social.icon}</span>
                    <div className="sf-info"><div className="sf-name">{social.name}</div><div className="sf-followers">{social.label}</div></div>
                    <span className="sf-follow-btn">Follow</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">📧 Weekly Digest</div>
            <div className="widget-body newsletter-widget">
              <p>Get WWSB's top stock picks and Wall Street moves delivered every Sunday - free.</p>
              <input type="email" placeholder="your@email.com" />
              <button>Subscribe Free</button>
            </div>
          </div>
        </aside>
      </main>

      <footer>
        <div className="footer-brand">{data.brand}</div>
        <p>Tracking institutional moves and translating Wall Street intelligence for everyday investors. Not financial advice.</p>
        <div className="footer-socials">
          {data.socialLinks.map((social) => (
            <a className="fsocial" href={social.url} target={social.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={social.name}>{social.icon}</a>
          ))}
        </div>
        <p className="copyright">© 2026 What-Wallstreet-Buys. All rights reserved.</p>
      </footer>
    </div>
  );
}
