import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to CropAdvisor! 🌱 I can help you choose crops using soil, weather, location and market conditions.",
    },
  ]);

  const sendMessage = (text = input) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
    ]);

    setInput("");
    setLoading(true);

    setTimeout(() => {
      let reply =
        "🌱 I can help analyze your farm conditions and recommend suitable crops.";

      const q = text.toLowerCase();

      if (q.includes("weather")) {
        reply =
          "🌦️ Weather analysis is ready. Temperature, rainfall and humidity can be used to determine suitable crops.";
      } else if (q.includes("soil")) {
        reply =
          "🌱 Tell me your soil type and I'll match it with suitable crops.";
      } else if (q.includes("market")) {
        reply =
          "💰 Market insights can help compare crop prices and selling opportunities.";
      } else if (q.includes("crop") || q.includes("best")) {
        reply =
          "🌾 I can recommend crops based on your location, soil, weather and current season.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply },
      ]);

      setLoading(false);
    }, 1200);
  };

  /* =========================
     CROP ADVISOR CHAT PAGE
     ========================= */

  if (page === "chat") {
    return (
      <div className="advisor-page">

        <div className="advisor-background">
          <div className="advisor-sun"></div>
          <div className="advisor-cloud cloud-a">☁️</div>
          <div className="advisor-cloud cloud-b">☁️</div>
          <div className="flying-bird bird-a">🐦</div>
          <div className="flying-bird bird-b">🐦</div>
          <div className="advisor-tree tree-a">🌳</div>
          <div className="advisor-tree tree-b">🌴</div>
          <div className="advisor-crops">
            🌾 🌾 🌾 🌾 🌾 🌾 🌾
          </div>
        </div>

        <header className="advisor-header">

          <button
            className="home-back"
            onClick={() => setPage("home")}
          >
            ← Home
          </button>

          <div className="advisor-brand">
            <div className="advisor-logo">🌱</div>

            <div>
              <h2>CropAdvisor</h2>
              <span>● AI Farming Intelligence</span>
            </div>
          </div>

          <div className="ai-online">
            ● AI ONLINE
          </div>

        </header>

        <main className="advisor-main">

          <section className="advisor-intro">

            <div>
              <span>SMART AGRICULTURAL ASSISTANCE</span>

              <h1>
                Your farm.
                <br />
                <strong>Our intelligence.</strong>
              </h1>

              <p>
                Get personalized farming recommendations using
                AI-powered agricultural insights.
              </p>
            </div>

          </section>


          {/* FARM OVERVIEW */}

          <section className="farm-overview">

            <div className="overview-card weather">
              <div className="big-icon">🌦️</div>

              <div>
                <small>WEATHER</small>
                <h3>Favorable</h3>
                <p>Good farming conditions</p>
              </div>
            </div>


            <div className="overview-card soil">
              <div className="big-icon">🌱</div>

              <div>
                <small>SOIL HEALTH</small>
                <h3>Healthy</h3>
                <p>Suitable for crops</p>
              </div>
            </div>


            <div className="overview-card crop">
              <div className="big-icon">🌾</div>

              <div>
                <small>CROP ADVISORY</small>
                <h3>AI Ready</h3>
                <p>Find your best crop</p>
              </div>
            </div>


            <div className="overview-card market">
              <div className="big-icon">💰</div>

              <div>
                <small>MARKET</small>
                <h3>Updated</h3>
                <p>Price insights</p>
              </div>
            </div>

          </section>


          {/* AI PANEL */}

          <section className="ai-panel">

            <div className="ai-panel-top">

              <div className="ai-title">

                <div className="large-ai-icon">
                  🤖
                </div>

                <div>
                  <h2>AI Farming Assistant</h2>
                  <span>
                    Agricultural intelligence system
                  </span>
                </div>

              </div>

              <div className="analysis-badge">
                ✨ READY TO ANALYZE
              </div>

            </div>


            {/* ACTION BUTTONS */}

            <div className="advisor-actions">

              <button
                onClick={() => sendMessage("Check Weather")}
                className="action weather-action"
              >
                <span>🌦️</span>

                <div>
                  <strong>Weather</strong>
                  <small>Check conditions</small>
                </div>
              </button>


              <button
                onClick={() => sendMessage("Best Crop")}
                className="action crop-action"
              >
                <span>🌾</span>

                <div>
                  <strong>Best Crop</strong>
                  <small>Get recommendations</small>
                </div>
              </button>


              <button
                onClick={() => sendMessage("Soil Analysis")}
                className="action soil-action"
              >
                <span>🌱</span>

                <div>
                  <strong>Soil Analysis</strong>
                  <small>Analyze your soil</small>
                </div>
              </button>


              <button
                onClick={() => sendMessage("Market Prices")}
                className="action market-action"
              >
                <span>💰</span>

                <div>
                  <strong>Market Prices</strong>
                  <small>Explore markets</small>
                </div>
              </button>

            </div>


            {/* CONVERSATION */}

            <div className="conversation">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={`chat-message ${message.sender}`}
                >

                  {message.sender === "bot" && (
                    <div className="chat-avatar">
                      🌱
                    </div>
                  )}

                  <div className="bubble">
                    {message.text}
                  </div>

                </div>

              ))}


              {loading && (

                <div className="chat-message bot">

                  <div className="chat-avatar">
                    🌱
                  </div>

                  <div className="bubble typing-bubble">

                    <div className="dots">
                      <i></i>
                      <i></i>
                      <i></i>
                    </div>

                    <span>
                      AI is analyzing your farm...
                    </span>

                  </div>

                </div>

              )}

            </div>


            {/* INPUT */}

            <div className="advisor-input">

              <div className="input-icon">
                🌱
              </div>

              <input
                value={input}
                placeholder="Ask CropAdvisor anything about your farm..."
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={() => sendMessage()}
              >
                ➤
              </button>

            </div>

          </section>

        </main>

      </div>
    );
  }


  /* =========================
     HOME PAGE
     ========================= */

  return (
    <div className="website">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="brand">
          🌱 CropAdvisor
        </div>

        <div className="nav-links">

          <button
            className="active"
            onClick={() => setPage("home")}
          >
            🏠 Home
          </button>

          <button
            onClick={() =>
              document
                .getElementById("features")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ✨ Features
          </button>

          <button
            onClick={() =>
              document
                .getElementById("how")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            ⚙️ How it works
          </button>

          <button
            onClick={() =>
              document
                .getElementById("about")
                .scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            🌍 About
          </button>

        </div>


        <button
          className="nav-cta"
          onClick={() => setPage("chat")}
        >
          🤖 Ask CropAdvisor →
        </button>

      </nav>


      {/* HERO */}

      <section className="hero-section">

        <div className="hero-cloud cloud1">
          ☁️
        </div>

        <div className="hero-cloud cloud2">
          ☁️
        </div>

        <div className="hero-bird">
          🐦
        </div>

        <div className="hero-sun">
          ☀️
        </div>


        <div className="hero-content">

          <span className="badge">
            🌾 AI-POWERED FARMING
          </span>

          <h1>
            Smart farming.
            <br />
            <span>Better decisions.</span>
          </h1>

          <p>
            AI-powered crop recommendations using weather,
            soil, location and market intelligence.
          </p>


          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => setPage("chat")}
            >
              🌱 Start CropAdvisor
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Features →
            </button>

          </div>

        </div>


        <div className="hero-land">

          <div className="hero-tree">
            🌳
          </div>

          <div className="hero-tree tree-right">
            🌴
          </div>

          <div className="hero-crops">
            🌾 🌾 🌾 🌾 🌾 🌾
          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section
        id="features"
        className="features-section"
      >

        <div className="section-heading">

          <span>
            CROPADVISOR FEATURES
          </span>

          <h2>
            Everything farmers need
          </h2>

          <p>
            AI-powered tools for smarter agricultural decisions.
          </p>

        </div>


        <div className="feature-cards">

          <div className="feature-card">
            <div>🌾</div>
            <h3>AI Crop Advisor</h3>
            <p>
              Find crops suited to your farm.
            </p>
          </div>


          <div className="feature-card">
            <div>🌦️</div>
            <h3>Weather Intelligence</h3>
            <p>
              Understand weather conditions.
            </p>
          </div>


          <div className="feature-card">
            <div>🌱</div>
            <h3>Soil Analysis</h3>
            <p>
              Match crops to your soil.
            </p>
          </div>


          <div className="feature-card">
            <div>💰</div>
            <h3>Market Insights</h3>
            <p>
              Understand crop prices.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section
        id="how"
        className="how-section"
      >

        <span>
          HOW IT WORKS
        </span>

        <h2>
          From farm data to smart decisions
        </h2>


        <div className="steps">

          <div>
            <b>01</b>
            <h3>Enter farm details</h3>
            <p>
              Location, soil and season.
            </p>
          </div>


          <div>
            <b>02</b>
            <h3>AI analyzes</h3>
            <p>
              Weather, soil and market data.
            </p>
          </div>


          <div>
            <b>03</b>
            <h3>Get advice</h3>
            <p>
              Receive personalized recommendations.
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT */}

      <section
        id="about"
        className="about-section"
      >

        <span>
          ABOUT CROPADVISOR
        </span>

        <h2>
          Making agricultural intelligence accessible.
        </h2>

        <p>
          CropAdvisor brings artificial intelligence
          and agricultural information together to support
          smarter farming decisions.
        </p>

      </section>


      {/* FOOTER */}

      <footer>

        <div className="brand">
          🌱 CropAdvisor
        </div>

        <p>
          Smart farming assistance.
        </p>

        <small>
          Hackathon 2026
        </small>

      </footer>

    </div>
  );
}

export default App;