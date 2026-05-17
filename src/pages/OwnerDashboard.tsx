import data from "../data/siteData.json";

const navigation = [
  { label: "Studio", items: [["✦", "Post Editor", "/owner", true], ["▣", "Templates", "#"], ["⌁", "Media Library", "#"], ["◷", "Scheduled", "#"]] },
  { label: "Channels", items: [["◎", "Instagram", "#"], ["𝕏", "X / Twitter", "#"], ["f", "Facebook", "#"], ["in", "LinkedIn", "#"], ["M", "Medium", "#"], ["R", "Reddit", "#"]] },
  { label: "Manage", items: [["◌", "Analytics", "#"], ["⚙", "Settings", "#"], ["↗", "Preview Website", "/"]] },
];

const platformOptions = [
  ["◎", "Instagram", "Feed + Story", true],
  ["𝕏", "X / Twitter", "Text + image", true],
  ["f", "Facebook", "Page post", true],
  ["in", "LinkedIn", "Company update", true],
  ["M", "Medium", "Article draft", false],
  ["R", "Reddit", "Community post", false],
] as const;

const canvasFormats = ["Square 1080", "Story 9:16", "X 16:9", "LinkedIn 1200"];
const iconSet = ["▲", "$", "%", "↗", "◆", "●", "★", "₿"];
const colorSwatches = ["#08110f", "#12312a", "#c7f35b", "#f8faf5", "#1d4ed8", "#dc2626"];

function statusClass(status: string) {
  return `status-badge status-${status.toLowerCase()}`;
}

export default function OwnerDashboard() {
  return (
    <div className="owner-dashboard creator-dashboard">
      <aside className="owner-sidebar creator-sidebar">
        <div className="sidebar-logo">
          <div className="brand">{data.brand}</div>
          <span className="role-badge">Creator Studio</span>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((section) => (
            <div className="nav-section" key={section.label}>
              <div className="nav-section-label">{section.label}</div>
              {section.items.map(([icon, label, href, active]) => (
                <a className={`owner-nav-item ${active ? "active" : ""}`} href={String(href)} key={String(label)}>
                  <span className="icon">{icon}</span> {label}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-user">
          <div className="owner-user-avatar">W</div>
          <div>
            <div className="user-name">WWSB Owner</div>
            <div className="user-role">Publishing admin</div>
          </div>
        </div>
      </aside>

      <div className="owner-main creator-main">
        <header className="topbar creator-topbar">
          <div>
            <div className="topbar-title">Post Editor</div>
            <p className="topbar-subtitle">Create website posts and resize them for linked social media channels.</p>
          </div>
          <div className="topbar-actions">
            <a className="button-link" href="/"><button className="btn btn-outline">Preview Website</button></a>
            <button className="btn btn-outline">Save Draft</button>
            <button className="btn btn-green">Publish</button>
          </div>
        </header>

        <main className="page-content creator-content">
          <section className="creator-studio" aria-label="Post creator workspace">
            <aside className="tool-panel">
              <div className="tool-panel-header">
                <strong>Design Tools</strong>
                <span>Canvas controls</span>
              </div>

              <div className="tool-group">
                <label className="form-label" htmlFor="format">Format</label>
                <select id="format" className="form-select">
                  {canvasFormats.map((format) => <option key={format}>{format}</option>)}
                </select>
              </div>

              <div className="tool-group">
                <span className="form-label">Background</span>
                <div className="swatch-grid">
                  {colorSwatches.map((color) => (
                    <button className="color-swatch" style={{ background: color }} aria-label={`Use ${color} background`} key={color} />
                  ))}
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Text Style</span>
                <div className="segmented-control">
                  <button className="active">Bold</button>
                  <button>Serif</button>
                  <button>Mono</button>
                </div>
                <div className="range-row">
                  <label htmlFor="font-size">Size</label>
                  <input id="font-size" type="range" min="24" max="88" defaultValue="48" />
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Icons</span>
                <div className="icon-grid">
                  {iconSet.map((icon) => <button key={icon}>{icon}</button>)}
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Upload Image / Video</span>
                <label className="upload-zone creator-upload">
                  <input type="file" accept="image/*,video/*" />
                  <span className="upload-icon">▧</span>
                  <span className="upload-text">Drop media or browse</span>
                  <span className="upload-sub">Images, clips, logos, charts</span>
                </label>
              </div>
            </aside>

            <section className="canvas-workspace">
              <div className="canvas-toolbar">
                <div className="canvas-tabs">
                  <button className="active">Design</button>
                  <button>Caption</button>
                  <button>Preview</button>
                </div>
                <div className="canvas-actions">
                  <button title="Undo">↶</button>
                  <button title="Redo">↷</button>
                  <button title="Zoom out">−</button>
                  <span>82%</span>
                  <button title="Zoom in">+</button>
                </div>
              </div>

              <div className="canvas-stage">
                <article className="social-canvas">
                  <div className="canvas-bg-lines" />
                  <div className="canvas-brand-row">
                    <span className="canvas-logo">WWB</span>
                    <span>WHAT WALLSTREET BUYS</span>
                  </div>
                  <div className="canvas-market-card">
                    <span className="canvas-chip">Stock Analysis</span>
                    <h1>NVDA Is Still Wall Street's Favorite AI Trade</h1>
                    <p>Institutional flow remains positive as data center demand keeps accelerating.</p>
                    <div className="canvas-ticker-row">
                      <strong>NVDA</strong>
                      <span>+4.2%</span>
                    </div>
                  </div>
                  <div className="canvas-chart">
                    <span className="c1" />
                    <span className="c2" />
                    <span className="c3" />
                    <span className="c4" />
                    <span className="c5" />
                  </div>
                  <div className="canvas-footer">Not financial advice • Follow for market intelligence</div>
                </article>
              </div>
            </section>

            <aside className="publish-panel">
              <div className="tool-panel-header">
                <strong>Post Setup</strong>
                <span>Website + social channels</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="post-title">Website Post Title</label>
                <input id="post-title" className="form-input" type="text" defaultValue="Why NVIDIA Is Wall Street's Undisputed Top Pick Right Now" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="post-caption">Social Caption</label>
                <textarea id="post-caption" className="form-textarea" defaultValue={"NVDA keeps showing up in institutional accumulation data.\n\nKey signal: AI infrastructure demand is still pulling capital toward high-quality semiconductor names."} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="post-category">Website Category</label>
                <select id="post-category" className="form-select">
                  <option>Stock Insight</option>
                  <option>Earnings Update</option>
                  <option>Insider Trading</option>
                  <option>Dividend Alert</option>
                  <option>Market News</option>
                  <option>Long-form Article</option>
                </select>
              </div>

              <div className="form-group">
                <span className="form-label">Publish To</span>
                <div className="publish-channel-list">
                  <label className="channel-check website-channel">
                    <input type="checkbox" defaultChecked />
                    <span className="channel-icon">W</span>
                    <span><strong>Website</strong><small>Public WWSB post</small></span>
                  </label>
                  {platformOptions.map(([icon, name, detail, checked]) => (
                    <label className="channel-check" key={name}>
                      <input type="checkbox" defaultChecked={checked} />
                      <span className="channel-icon">{icon}</span>
                      <span><strong>{name}</strong><small>{detail}</small></span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="publish-time">Schedule</label>
                <input id="publish-time" className="form-input" type="datetime-local" />
              </div>

              <div className="publish-actions stacked">
                <button className="btn btn-outline">Export PNG</button>
                <button className="btn btn-outline">Schedule Post</button>
                <button className="btn btn-green">Publish Website + Social</button>
              </div>
            </aside>
          </section>

          <section className="creator-bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Linked Social Accounts</span>
                <button className="btn btn-outline">Connect Account</button>
              </div>
              <div className="social-account-grid">
                {platformOptions.slice(0, 6).map(([icon, name, detail, checked]) => (
                  <div className="social-account-card" key={name}>
                    <span className="channel-icon">{icon}</span>
                    <div>
                      <strong>{name}</strong>
                      <small>{checked ? "Connected" : "Not connected"} • {detail}</small>
                    </div>
                    <button className="action-btn">{checked ? "Manage" : "Link"}</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Recent Website Posts</span>
                <button className="btn btn-outline">View All</button>
              </div>
              <div className="table-wrap compact-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.posts.slice(0, 4).map((post) => (
                      <tr key={post.title}>
                        <td><strong>{post.shortTitle}</strong></td>
                        <td><span className={statusClass(post.status)}>{post.status}</span></td>
                        <td>{post.status === "Draft" ? "—" : post.date}</td>
                        <td><button className="action-btn">Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
