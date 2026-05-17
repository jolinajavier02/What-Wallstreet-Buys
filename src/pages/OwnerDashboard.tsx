import { useMemo, useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import data from "../data/siteData.json";

const navigation = [
  { label: "Create", items: [["✦", "Post Editor", "/owner", true], ["▣", "Templates", "#"], ["⌁", "Media Library", "#"], ["◷", "Scheduled Posts", "#"]] },
  { label: "Manage", items: [["◌", "Post Analytics", "#"], ["⚙", "Studio Settings", "#"], ["↗", "Preview Website", "/"]] },
];

const platformOptions = [
  ["◎", "Instagram", "Feed + Story", true],
  ["𝕏", "X / Twitter", "Text + image", true],
  ["f", "Facebook", "Page post", true],
  ["in", "LinkedIn", "Company update", true],
  ["M", "Medium", "Article draft", false],
  ["R", "Reddit", "Community post", false],
] as const;

const canvasFormats = [
  { label: "Square 1080", className: "format-square" },
  { label: "Story 9:16", className: "format-story" },
  { label: "X 16:9", className: "format-wide" },
  { label: "LinkedIn 1200", className: "format-linkedin" },
];

const fontStyles = [
  { label: "Inter Bold", value: '"Inter", sans-serif', weight: 900 },
  { label: "Playfair", value: '"Playfair Display", serif', weight: 800 },
  { label: "System", value: "system-ui, sans-serif", weight: 800 },
  { label: "Georgia", value: "Georgia, serif", weight: 700 },
  { label: "Arial Black", value: '"Arial Black", sans-serif', weight: 900 },
  { label: "Trebuchet", value: '"Trebuchet MS", sans-serif', weight: 800 },
  { label: "Verdana", value: "Verdana, sans-serif", weight: 800 },
  { label: "Courier", value: '"Courier New", monospace', weight: 800 },
  { label: "Impact", value: "Impact, fantasy", weight: 700 },
  { label: "Times", value: '"Times New Roman", serif', weight: 800 },
];

const iconSet = [
  "💵", "💰", "🪙", "🏦", "🏛", "🥇", "💳", "📈", "📉", "📊",
  "🧾", "🔔", "💎", "🚀", "⚖", "↗", "↘", "$", "%", "▲",
  "▼", "BUY", "SELL", "AI", "EPS", "ROI", "NVDA", "AAPL", "TSLA", "MSFT"
];

const colorSwatches = ["#08110f", "#12312a", "#c7f35b", "#f8faf5", "#1d4ed8", "#dc2626", "#111827", "#ffffff", "#f59e0b", "#14b8a6", "#7c3aed", "#ec4899"];
const backgroundEffects = ["Grid", "Gradient", "Solid", "Glass", "Transparent"];

function statusClass(status: string) {
  return `status-badge status-${status.toLowerCase()}`;
}

type CanvasIcon = {
  id: number;
  icon: string;
  x: number;
  y: number;
  color: string;
  size: number;
};

export default function OwnerDashboard() {
  const [format, setFormat] = useState(canvasFormats[0]);
  const [backgroundColor, setBackgroundColor] = useState("#08110f");
  const [accentColor, setAccentColor] = useState("#c7f35b");
  const [textColor, setTextColor] = useState("#ffffff");
  const [effect, setEffect] = useState("Grid");
  const [fontIndex, setFontIndex] = useState(0);
  const [fontSize, setFontSize] = useState(42);
  const [opacity, setOpacity] = useState(100);
  const [headline, setHeadline] = useState("NVDA Is Still Wall Street's Favorite AI Trade");
  const [subhead, setSubhead] = useState("Institutional flow remains positive as data center demand keeps accelerating.");
  const [ticker, setTicker] = useState("NVDA");
  const [tickerChange, setTickerChange] = useState("+4.2%");
  const [caption, setCaption] = useState("NVDA keeps showing up in institutional accumulation data.\n\nKey signal: AI infrastructure demand is still pulling capital toward high-quality semiconductor names.");
  const [selectedIcons, setSelectedIcons] = useState<CanvasIcon[]>([
    { id: 1, icon: "📈", x: 78, y: 16, color: "#c7f35b", size: 34 },
    { id: 2, icon: "💰", x: 10, y: 72, color: "#f59e0b", size: 30 },
    { id: 3, icon: "AI", x: 72, y: 74, color: "#c7f35b", size: 28 },
  ]);
  const [selectedIconId, setSelectedIconId] = useState(1);
  const [mediaUrl, setMediaUrl] = useState("");
  const [activeTab, setActiveTab] = useState("Design");
  const [zoom, setZoom] = useState(82);
  const [message, setMessage] = useState("Ready to create.");
  const [platforms, setPlatforms] = useState(() => Object.fromEntries(platformOptions.map(([, name, , checked]) => [name, checked])));
  const [publishWebsite, setPublishWebsite] = useState(true);

  const font = fontStyles[fontIndex];
  const canvasStyle = {
    "--bg": backgroundColor,
    "--accent": accentColor,
    "--canvas-text": textColor,
    "--headline-font": font.value,
    "--headline-weight": font.weight,
    "--headline-size": `${fontSize}px`,
    "--media-opacity": opacity / 100,
    transform: `scale(${zoom / 100})`,
  } as CSSProperties;

  const activeChannels = useMemo(() => {
    const names = Object.entries(platforms).filter(([, checked]) => checked).map(([name]) => name);
    return [publishWebsite ? "Website" : "", ...names].filter(Boolean);
  }, [platforms, publishWebsite]);

  function handleMediaUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMediaUrl(URL.createObjectURL(file));
    setMessage(`${file.name} added to the canvas.`);
  }

  const selectedIcon = selectedIcons.find((item) => item.id === selectedIconId);

  function addIcon(icon: string) {
    const nextIcon = {
      id: Date.now(),
      icon,
      x: 18 + (selectedIcons.length % 4) * 18,
      y: 18 + (selectedIcons.length % 5) * 12,
      color: accentColor,
      size: icon.length > 2 ? 24 : 32,
    };
    setSelectedIcons((current) => [...current, nextIcon]);
    setSelectedIconId(nextIcon.id);
    setMessage(`${icon} added to the design.`);
  }

  function updateSelectedIcon(updates: Partial<CanvasIcon>) {
    setSelectedIcons((current) => current.map((item) => item.id === selectedIconId ? { ...item, ...updates } : item));
  }

  function removeSelectedIcon() {
    setSelectedIcons((current) => {
      const next = current.filter((item) => item.id !== selectedIconId);
      setSelectedIconId(next[0]?.id ?? 0);
      return next;
    });
    setMessage("Icon removed from the canvas.");
  }

  function clearCanvas() {
    setMediaUrl("");
    setSelectedIcons([]);
    setSelectedIconId(0);
    setMessage("Canvas media and icons cleared.");
  }

  function publishNow() {
    setMessage(`Publishing to ${activeChannels.join(", ") || "no channels selected"}.`);
  }

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
            <p className="topbar-subtitle">{message}</p>
          </div>
          <div className="topbar-actions">
            <a className="button-link" href="/"><button className="btn btn-outline">Preview Website</button></a>
            <button className="btn btn-outline" onClick={() => setMessage("Draft saved locally.")}>Save Draft</button>
            <button className="btn btn-green" onClick={publishNow}>Publish</button>
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
                <select
                  id="format"
                  className="form-select"
                  value={format.label}
                  onChange={(event) => setFormat(canvasFormats.find((item) => item.label === event.target.value) ?? canvasFormats[0])}
                >
                  {canvasFormats.map((item) => <option key={item.label}>{item.label}</option>)}
                </select>
              </div>

              <div className="tool-group">
                <span className="form-label">Background Color</span>
                <div className="color-control">
                  <input type="color" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
                  <input className="form-input" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
                </div>
                <div className="swatch-grid">
                  {colorSwatches.map((color) => (
                    <button className="color-swatch" style={{ background: color }} aria-label={`Use ${color} background`} key={color} onClick={() => setBackgroundColor(color)} />
                  ))}
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Text & Accent Color</span>
                <div className="two-color-row">
                  <label><span>Text</span><input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} /></label>
                  <label><span>Accent</span><input type="color" value={accentColor} onChange={(event) => setAccentColor(event.target.value)} /></label>
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Background Effect</span>
                <div className="effect-grid">
                  {backgroundEffects.map((item) => (
                    <button className={effect === item ? "active" : ""} key={item} onClick={() => setEffect(item)}>{item}</button>
                  ))}
                </div>
              </div>

              <div className="tool-group">
                <label className="form-label" htmlFor="font-style">Font Style</label>
                <select id="font-style" className="form-select" value={fontIndex} onChange={(event) => setFontIndex(Number(event.target.value))}>
                  {fontStyles.map((item, index) => <option value={index} key={item.label}>{index + 1}. {item.label}</option>)}
                </select>
                <div className="range-row">
                  <label htmlFor="font-size">Size</label>
                  <input id="font-size" type="range" min="24" max="88" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} />
                </div>
              </div>

              <div className="tool-group">
                <span className="form-label">Finance Icon Library</span>
                <div className="icon-grid expanded">
                  {iconSet.map((icon) => <button key={icon} onClick={() => addIcon(icon)}>{icon}</button>)}
                </div>
              </div>

              <div className="tool-group icon-editor">
                <span className="form-label">Selected Icon</span>
                {selectedIcon ? (
                  <>
                    <div className="selected-icon-preview">
                      <span style={{ color: selectedIcon.color, fontSize: selectedIcon.size }}>{selectedIcon.icon}</span>
                      <button className="action-btn" onClick={removeSelectedIcon}>Remove</button>
                    </div>
                    <div className="range-row">
                      <label htmlFor="icon-x">X</label>
                      <input id="icon-x" type="range" min="0" max="92" value={selectedIcon.x} onChange={(event) => updateSelectedIcon({ x: Number(event.target.value) })} />
                    </div>
                    <div className="range-row">
                      <label htmlFor="icon-y">Y</label>
                      <input id="icon-y" type="range" min="0" max="92" value={selectedIcon.y} onChange={(event) => updateSelectedIcon({ y: Number(event.target.value) })} />
                    </div>
                    <div className="range-row">
                      <label htmlFor="icon-size">Size</label>
                      <input id="icon-size" type="range" min="16" max="72" value={selectedIcon.size} onChange={(event) => updateSelectedIcon({ size: Number(event.target.value) })} />
                    </div>
                    <div className="color-control single-color">
                      <input type="color" value={selectedIcon.color} onChange={(event) => updateSelectedIcon({ color: event.target.value })} />
                      <input className="form-input" value={selectedIcon.color} onChange={(event) => updateSelectedIcon({ color: event.target.value })} />
                    </div>
                  </>
                ) : (
                  <p className="empty-tool-note">Add a finance icon, then select it on the canvas to edit placement and color.</p>
                )}
              </div>

              <div className="tool-group">
                <span className="form-label">Upload Image / Video</span>
                <label className="upload-zone creator-upload">
                  <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
                  <span className="upload-icon">▧</span>
                  <span className="upload-text">Drop media or browse</span>
                  <span className="upload-sub">Images, clips, logos, charts</span>
                </label>
                <div className="range-row">
                  <label htmlFor="media-opacity">Opacity</label>
                  <input id="media-opacity" type="range" min="0" max="100" value={opacity} onChange={(event) => setOpacity(Number(event.target.value))} />
                </div>
              </div>

              <div className="tool-group">
                <button className="btn btn-outline full-width" onClick={clearCanvas}>Clear Canvas Assets</button>
              </div>
            </aside>

            <section className="canvas-workspace">
              <div className="canvas-toolbar">
                <div className="canvas-tabs">
                  {["Design", "Caption", "Preview"].map((tab) => (
                    <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>
                  ))}
                </div>
                <div className="canvas-actions">
                  <button title="Undo" onClick={() => setMessage("Undo history will be added when persistence is connected.")}>↶</button>
                  <button title="Redo" onClick={() => setMessage("Redo history will be added when persistence is connected.")}>↷</button>
                  <button title="Zoom out" onClick={() => setZoom((value) => Math.max(50, value - 10))}>−</button>
                  <span>{zoom}%</span>
                  <button title="Zoom in" onClick={() => setZoom((value) => Math.min(120, value + 10))}>+</button>
                </div>
              </div>

              <div className="canvas-stage">
                <article className={`social-canvas ${format.className} effect-${effect.toLowerCase()}`} style={canvasStyle}>
                  {mediaUrl && <img className="canvas-media" src={mediaUrl} alt="Uploaded design media" />}
                  <div className="canvas-bg-lines" />
                  <div className="canvas-brand-row">
                    <span className="canvas-logo">WWB</span>
                    <span>WHAT WALLSTREET BUYS</span>
                  </div>
                  <div className="floating-icons">
                    {selectedIcons.map((item) => (
                      <button
                        className={item.id === selectedIconId ? "selected" : ""}
                        style={{
                          "--icon-x": `${item.x}%`,
                          "--icon-y": `${item.y}%`,
                          "--icon-color": item.color,
                          "--icon-size": `${item.size}px`,
                        } as CSSProperties}
                        key={item.id}
                        onClick={() => setSelectedIconId(item.id)}
                        title="Select icon"
                      >
                        {item.icon}
                      </button>
                    ))}
                  </div>
                  <div className="canvas-market-card">
                    <span className="canvas-chip">Stock Analysis</span>
                    <h1>{headline}</h1>
                    <p>{subhead}</p>
                    <div className="canvas-ticker-row">
                      <strong>{ticker}</strong>
                      <span>{tickerChange}</span>
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
                <span>{activeTab} mode</span>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="post-title">Website Post Title</label>
                <input id="post-title" className="form-input" type="text" value={headline} onChange={(event) => setHeadline(event.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="canvas-subhead">Canvas Subtitle</label>
                <textarea id="canvas-subhead" className="form-textarea compact-textarea" value={subhead} onChange={(event) => setSubhead(event.target.value)} />
              </div>

              <div className="form-group two-input-grid">
                <label className="form-label" htmlFor="ticker-symbol">Ticker<input id="ticker-symbol" className="form-input" value={ticker} onChange={(event) => setTicker(event.target.value.toUpperCase())} /></label>
                <label className="form-label" htmlFor="ticker-change">Change<input id="ticker-change" className="form-input" value={tickerChange} onChange={(event) => setTickerChange(event.target.value)} /></label>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="post-caption">Social Caption</label>
                <textarea id="post-caption" className="form-textarea" value={caption} onChange={(event) => setCaption(event.target.value)} />
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
                <span className="form-label">Publish Destinations</span>
                <div className="publish-channel-list">
                  <label className="channel-check website-channel">
                    <input type="checkbox" checked={publishWebsite} onChange={(event) => setPublishWebsite(event.target.checked)} />
                    <span className="channel-icon">W</span>
                    <span><strong>Website</strong><small>Public WWSB post</small></span>
                  </label>
                  {platformOptions.map(([icon, name, detail]) => (
                    <label className="channel-check" key={name}>
                      <input
                        type="checkbox"
                        checked={platforms[name]}
                        onChange={(event) => setPlatforms((current) => ({ ...current, [name]: event.target.checked }))}
                      />
                      <span className="channel-icon">{icon}</span>
                      <span><strong>{name}</strong><small>Connected • {detail}</small></span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="publish-time">Schedule</label>
                <input id="publish-time" className="form-input" type="datetime-local" />
              </div>

              <div className="publish-actions stacked">
                <button className="btn btn-outline" onClick={() => setMessage(`Export prepared for ${format.label}.`)}>Export PNG</button>
                <button className="btn btn-outline" onClick={() => setMessage(`Scheduled for selected channels: ${activeChannels.join(", ")}.`)}>Schedule Post</button>
                <button className="btn btn-green" onClick={publishNow}>Publish Selected Destinations</button>
              </div>
            </aside>
          </section>

          <section className="creator-bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Post Readiness</span>
                <button className="btn btn-outline" onClick={() => setMessage("Post checklist reviewed.")}>Review</button>
              </div>
              <div className="readiness-list">
                <div className="readiness-item complete">
                  <span>✓</span>
                  <div><strong>Design canvas ready</strong><small>{format.label} creative prepared</small></div>
                </div>
                <div className="readiness-item complete">
                  <span>✓</span>
                  <div><strong>Website content ready</strong><small>Title, category, and caption filled</small></div>
                </div>
                <div className="readiness-item complete">
                  <span>✓</span>
                  <div><strong>Destinations selected</strong><small>{activeChannels.length} destination{activeChannels.length === 1 ? "" : "s"} active</small></div>
                </div>
                <div className="readiness-item">
                  <span>◷</span>
                  <div><strong>Final compliance check</strong><small>Confirm sources and disclaimer before publish</small></div>
                </div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Recent Website Posts</span>
                <button className="btn btn-outline" onClick={() => setMessage("Opening all website posts.")}>View All</button>
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
                        <td><button className="action-btn" onClick={() => setHeadline(post.title)}>Edit</button></td>
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
