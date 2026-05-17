import data from "../data/siteData.json";

const navigation = [
  { label: "Main", items: [["🏠", "Dashboard", "/owner", true], ["✏️", "Create Post", "#"], ["📋", "All Posts", "#"], ["📅", "Scheduled", "#"]] },
  { label: "Platforms", items: [["📸", "Instagram", "#"], ["🐦", "X / Twitter", "#"], ["📘", "Facebook", "#"], ["💼", "LinkedIn", "#"], ["📝", "Medium", "#"], ["🟠", "Reddit", "#"]] },
  { label: "Manage", items: [["👥", "Users", "#"], ["📊", "Analytics", "#"], ["⚙️", "Settings", "#"], ["👁️", "Preview as User", "/"]] },
];

const platformOptions = [
  ["📸", "Instagram", true],
  ["🐦", "X / Twitter", true],
  ["📘", "Facebook", true],
  ["💼", "LinkedIn", true],
  ["📝", "Medium", false],
  ["🟠", "Reddit", false],
] as const;

function statusClass(status: string) {
  return `status-badge status-${status.toLowerCase()}`;
}

export default function OwnerDashboard() {
  return (
    <div className="owner-dashboard">
      <aside className="owner-sidebar">
        <div className="sidebar-logo">
          <div className="brand">{data.brand}</div>
          <span className="role-badge">Owner Account</span>
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
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </aside>

      <div className="owner-main">
        <header className="topbar">
          <div className="topbar-title">Dashboard Overview</div>
          <div className="topbar-actions">
            <button className="notification-btn" aria-label="Notifications">🔔<span className="notif-dot" /></button>
            <a className="button-link" href="/"><button className="btn btn-outline">Preview Site</button></a>
            <button className="btn btn-primary">+ Create Post</button>
          </div>
        </header>

        <main className="page-content">
          <section className="stats-row" aria-label="Dashboard stats">
            <div className="stat-card">
              <div className="stat-label">Total Posts</div>
              <div className="stat-value">{data.stats.postsPublished}</div>
              <div className="stat-change up">↑ 12 this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Followers</div>
              <div className="stat-value">{data.stats.totalFollowers}</div>
              <div className="stat-change up">↑ +3.2K this month</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Registered Users</div>
              <div className="stat-value">{data.stats.registeredUsers}</div>
              <div className="stat-change up">↑ +210 this week</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Scheduled Posts</div>
              <div className="stat-value">{data.stats.scheduledPosts}</div>
              <div className="stat-change">Next: Today 6:00 PM</div>
            </div>
          </section>

          <section className="three-col">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">✏️ Create & Publish Post</span>
                <span className="panel-note">Publishes to website + selected platforms</span>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="post-title">Post Title</label>
                  <input id="post-title" className="form-input" type="text" placeholder="e.g. Why NVDA is Wall Street's Top Pick This Week" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="post-content">Content / Caption</label>
                  <textarea id="post-content" className="form-textarea" placeholder="Write your financial insight, stock analysis, or market update here..." />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="post-category">Category</label>
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
                  <span className="form-label">Upload Media</span>
                  <button className="upload-zone">
                    <span className="upload-icon">📎</span>
                    <span className="upload-text">Click to upload or drag & drop</span>
                    <span className="upload-sub">PNG, JPG, MP4 - Max 50MB</span>
                  </button>
                </div>
                <div className="form-group">
                  <span className="form-label">Publish To Platforms</span>
                  <div className="platform-grid">
                    {platformOptions.map(([icon, name, checked]) => (
                      <label className="platform-check" key={name}>
                        <input type="checkbox" defaultChecked={checked} />
                        <span className="plat-icon">{icon}</span>
                        <span className="plat-name">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="publish-actions">
                  <button className="btn btn-outline">Save as Draft</button>
                  <button className="btn btn-outline">⏰ Schedule</button>
                  <button className="btn btn-green">🚀 Publish Now</button>
                </div>
              </div>
            </div>

            <div className="dashboard-side">
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">📊 Platform Reach</span>
                </div>
                <div className="panel-body">
                  <div className="analytics-row">
                    {data.platformReach.map((platform) => (
                      <div className="analytics-item" key={platform.name}>
                        <span className="analytics-platform">{platform.icon}</span>
                        <div className="analytics-info">
                          <div className="analytics-name">{platform.name}</div>
                          <div className="analytics-track"><div className="analytics-fill" style={{ width: `${platform.percent}%` }} /></div>
                        </div>
                        <span className="analytics-count">{platform.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">📅 Upcoming Scheduled</span>
                </div>
                <div className="panel-body">
                  <div className="schedule-list">
                    {data.schedule.map((item) => (
                      <div className="schedule-item" key={item.title}>
                        <span className="schedule-time">{item.time}</span>
                        <span className="schedule-title">{item.title}</span>
                        <div className="schedule-platforms">{item.platforms}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <div className="panel-header">
              <span className="panel-title">📋 Recent Posts</span>
              <button className="btn btn-outline">View All Posts</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Platforms</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.posts.map((post) => (
                    <tr key={post.title}>
                      <td><strong>{post.shortTitle}</strong></td>
                      <td>{post.category}</td>
                      <td>
                        <div className="platform-tags">
                          {post.platformLabels.map((platform) => <span className="platform-tag" key={platform}>{platform}</span>)}
                        </div>
                      </td>
                      <td><span className={statusClass(post.status)}>{post.status}</span></td>
                      <td>{post.status === "Draft" ? "—" : post.date}</td>
                      <td><button className="action-btn">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
