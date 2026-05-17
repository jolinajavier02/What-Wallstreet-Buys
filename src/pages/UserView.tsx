import data from "../data/siteData.json";
import type { CSSProperties } from "react";

type Post = (typeof data.posts)[number];
type StockDirection = "up" | "down" | "flat";

function directionClass(direction: string) {
  const safeDirection: StockDirection = direction === "up" || direction === "down" ? direction : "flat";
  return safeDirection;
}

function categoryClass(categoryKey: string) {
  return ["post-category", categoryKey !== "stock" ? categoryKey : ""].filter(Boolean).join(" ");
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card finance-post">
      <div className="post-card-body">
        <div className="post-meta">
          <span className={categoryClass(post.categoryKey)}>{post.category}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.excerpt}</p>
        {post.stocks.length > 0 && (
          <div className="stock-row">
            {post.stocks.map((stock) => (
              <span className={`stock-mention ${directionClass(stock.direction)}`} key={stock.symbol}>
                {stock.symbol} {stock.change}
              </span>
            ))}
          </div>
        )}
        <div className="post-footer">
          <div className="post-actions">
            <button className="post-action">Save</button>
            <button className="post-action">Share</button>
          </div>
          <button className="read-more-btn">Read Analysis</button>
        </div>
      </div>
    </article>
  );
}

export default function UserView() {
  const visiblePosts = data.posts.filter((post) => post.status !== "Scheduled").slice(0, 4);

  return (
    <div className="site-page finance-site">
      <nav className="user-nav finance-nav">
        <a className="nav-logo" href="/">
          <div className="logo-circle">
            <span>WWB</span>
          </div>
          <span className="nav-brand">{data.brand}</span>
        </a>
        <ul className="nav-links">
          <li><a href="#markets">Markets</a></li>
          <li><a href="#analysis">Analysis</a></li>
          <li><a href="#insights">Insights</a></li>
          <li><a href="#watchlist">Watchlist</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn btn-outline">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </nav>

      <header className="finance-hero">
        <div className="hero-market-grid" aria-hidden="true">
          {data.marketPulse.map((market) => (
            <div className="hero-market-tile" key={market.label}>
              <span>{market.label}</span>
              <strong>{market.value}</strong>
              <em className={directionClass(market.direction)}>{market.change}</em>
            </div>
          ))}
        </div>

        <div className="hero-copy">
          <span className="eyebrow">Institutional flow intelligence</span>
          <h1>What Wall Street Is Buying Before It Becomes Obvious</h1>
          <p>Track institutional moves, sector rotation, earnings setups, and stock analysis in one clean finance workspace.</p>
          <div className="hero-actions">
            <button className="btn btn-primary">Create Free Account</button>
            <button className="btn btn-ghost">View Market Signals</button>
          </div>
        </div>

        <div className="hero-terminal" aria-label="Featured stock analysis">
          <div className="terminal-top">
            <span>Live Analysis</span>
            <strong>NVDA</strong>
          </div>
          <div className="price-row">
            <div>
              <span className="muted-label">Current signal</span>
              <strong>Strong Buy</strong>
            </div>
            <div className="price-change up">+4.2%</div>
          </div>
          <div className="chart-frame">
            <span className="bar h40" />
            <span className="bar h55" />
            <span className="bar h48" />
            <span className="bar h70" />
            <span className="bar h64" />
            <span className="bar h86" />
            <span className="bar h78" />
            <span className="bar h92" />
          </div>
          <div className="terminal-stats">
            <div><span>Inst. Flow</span><strong>$3.8B</strong></div>
            <div><span>Momentum</span><strong>91</strong></div>
            <div><span>Quality</span><strong>88</strong></div>
          </div>
        </div>
      </header>

      <section className="market-strip" id="markets" aria-label="Market overview">
        {data.marketPulse.map((market) => (
          <article className="market-card" key={market.label}>
            <span>{market.label}</span>
            <strong>{market.value}</strong>
            <em className={directionClass(market.direction)}>{market.change}</em>
          </article>
        ))}
      </section>

      <main className="finance-main">
        <section className="analysis-section" id="analysis">
          <div className="section-heading">
            <span className="eyebrow">Stock analysis display</span>
            <h2>Top Wall Street Signals</h2>
          </div>
          <div className="analysis-grid">
            {data.stockAnalysis.map((stock) => (
              <article className="analysis-card" key={stock.symbol}>
                <div className="analysis-card-head">
                  <div>
                    <span className="ticker">{stock.symbol}</span>
                    <p>{stock.company}</p>
                  </div>
                  <div className={`price-change ${directionClass(stock.direction)}`}>{stock.change}</div>
                </div>
                <div className="analysis-price">
                  <strong>{stock.price}</strong>
                  <span>{stock.rating}</span>
                </div>
                <div className="score-ring" style={{ "--score": `${stock.score}%` } as CSSProperties}>
                  <span>{stock.score}</span>
                  <small>WWSB Score</small>
                </div>
                <p className="signal-copy">{stock.signal}</p>
                <div className="metric-list">
                  {stock.metrics.map((metric) => (
                    <div className="metric-item" key={metric.label}>
                      <div><span>{metric.label}</span><strong>{metric.value}</strong></div>
                      <div className="metric-track"><span style={{ width: `${metric.value}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="flow-row">
                  <span>Institutional Flow</span>
                  <strong>{stock.institutionalFlow}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="finance-layout">
          <div className="insights-column" id="insights">
            <div className="section-heading compact">
              <span className="eyebrow">Latest research</span>
              <h2>Market Intelligence Feed</h2>
            </div>
            <div className="feed finance-feed" aria-label="Market intelligence feed">
              {visiblePosts.map((post) => (
                <PostCard post={post} key={post.title} />
              ))}
            </div>
          </div>

          <aside className="finance-sidebar" id="watchlist">
            <div className="widget finance-widget">
              <div className="widget-header">Trending Tickers</div>
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

            <div className="widget finance-widget">
              <div className="widget-header">Sector Flow</div>
              <div className="widget-body sector-list">
                {data.sectors.map((sector) => (
                  <div className="sector-item" key={sector.name}>
                    <div>
                      <strong>{sector.name}</strong>
                      <span>{sector.flow}</span>
                    </div>
                    <div className="metric-track"><span style={{ width: `${sector.strength}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="widget finance-widget auth-panel">
              <div className="widget-header">Start Tracking</div>
              <div className="widget-body">
                <p>Build a watchlist, save analysis, and get weekly institutional flow alerts.</p>
                <input type="email" placeholder="Email address" />
                <button className="btn btn-primary">Sign Up Free</button>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <footer>
        <div className="footer-brand">{data.brand}</div>
        <p>Institutional market intelligence and equity research signals for everyday investors. Not financial advice.</p>
        <p className="copyright">© 2026 What-Wallstreet-Buys. All rights reserved.</p>
      </footer>
    </div>
  );
}
