// import React from 'react'
// import Navbar from '../components/Navbar'

// function Home() {
//   return (
//     <div>
//       <Navbar/>
//     </div>
//   )
// }

// export default Home


import React, { useState, useMemo } from "react";
import "../style/VideoDashboard.css"; 

// YouTube videos sample data
const sampleVideos = [
  {
    id: "v1",
    title: "Disaster Management Awareness",
    thumb: "https://img.youtube.com/vi/TN_HSDSdxGw/hqdefault.jpg",
    desc: "Awareness video on disaster management.",
    link: "https://www.youtube.com/embed/TN_HSDSdxGw"
  },
  {
    id: "v2",
    title: "Flood Safety Measures",
    thumb: "https://img.youtube.com/vi/BLEPakj1YTY/hqdefault.jpg",
    desc: "Learn about flood safety precautions.",
    link: "https://www.youtube.com/embed/BLEPakj1YTY"
  },
  {
    id: "v3",
    title: "Fire Safety Training",
    thumb: "https://img.youtube.com/vi/USLHmwvpjX8/hqdefault.jpg",
    desc: "Basic fire safety and prevention tips.",
    link: "https://www.youtube.com/embed/USLHmwvpjX8"
  },
  {
    id: "v4",
    title: "Earthquake Preparedness Guide",
    thumb: "https://img.youtube.com/vi/43M5mZuzHF8/hqdefault.jpg",
    desc: "How to stay safe during earthquakes.",
    link: "https://www.youtube.com/embed/43M5mZuzHF8"
  },
  {
    id: "v5",
    title: "Tsunami Awareness Program",
    thumb: "https://img.youtube.com/vi/kE3XAwR412I/hqdefault.jpg",
    desc: "Important information about tsunami safety.",
    link: "https://www.youtube.com/embed/kE3XAwR412I"
  }
];

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 12H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 18H21" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="logo">Raksha Samiti</div>
      </div>
    </header>
  );
}

function Sidebar({ collapsed, onSelectCategory, activeCategory }) {
  const categories = ["Fire", "Flood", "Earthquakes", "Tsunami", "Other"];
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <nav>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelectCategory(c)}
            className={`sidebar-btn ${activeCategory === c ? "active" : ""}`}
          >
            {collapsed ? c[0] : c}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function VideoCard({ video, onOpen }) {
  return (
    <article className="video-card">
      <div className="thumb-wrapper">
        <img src={video.thumb} alt={video.title} className="thumb" />
      </div>
      <div className="video-info">
        <h3 className="title" onClick={() => onOpen(video)}>{video.title}</h3>
      </div>
    </article>
  );
}

function VideoGrid({ videos, onOpen }) {
  if (videos.length === 0) return <div className="empty">No videos found.</div>;
  return (
    <div className="video-grid">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} onOpen={onOpen} />
      ))}
    </div>
  );
}

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [playing, setPlaying] = useState(null);

  const filtered = useMemo(() => {
    let list = [...sampleVideos];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(q));
    }
    return list;
  }, [query]);

  return (
    <div className="dashboard">
      <Header onToggleSidebar={() => setCollapsed((s) => !s)} />

      <div className="main">
        <Sidebar collapsed={collapsed} onSelectCategory={setActiveCategory} activeCategory={activeCategory} />

        <main className="content">
          <div className="toolbar">
            <h2>Trending</h2>
            <div className="controls">
              <input
                type="search"
                placeholder="Search titles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <VideoGrid videos={filtered} onOpen={setPlaying} />

          {playing && (
            <div className="overlay">
              <div className="modal">
                <div className="modal-header">
                  <div className="modal-title">{playing.title}</div>
                  <button onClick={() => setPlaying(null)}>Close</button>
                </div>
                <div className="modal-body">
                  <div className="video-frame">
                    <iframe
                      src={playing.link}
                      title={playing.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <p>{playing.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
