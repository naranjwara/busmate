import { useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import "./RoutesResult.css";

const availableRoutes = [
  {
    id: 1,
    number: "05",
    name: "Bus 05 - Dago",
    frequency: "Every 8 mins",
    eta: "4",
    status: "Normal",
    statusVariant: "normal",
    duration: "15 mins",
    price: "Rp 5.000",
    isFull: false,
  },
  {
    id: 2,
    number: "12",
    name: "Bus 12 - Sukajadi",
    frequency: "Every 12 mins",
    eta: "12",
    status: "Full",
    statusVariant: "full",
    duration: "20 mins",
    price: "Rp 5.000",
    isFull: true,
  },
  {
    id: 3,
    number: "01",
    name: "Bus 01 - Ledeng",
    frequency: "Every 10 mins",
    eta: "15",
    status: "Normal",
    statusVariant: "normal",
    duration: "18 mins",
    price: "Rp 5.000",
    isFull: false,
  },
];

function Icon({ name }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
      </>
    ),
    schedule: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    payments: (
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
    swap: (
      <>
        <path d="M8 3v14" />
        <path d="M4 13l4 4 4-4" />
        <path d="M16 21V7" />
        <path d="m12 11 4-4 4 4" />
      </>
    ),
    radio: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    star: (
      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    ),
    arrow_forward: <path d="M5 12h14M12 5l7 7-7 7" />,
    bus: (
      <>
        <path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
        <path d="M6 8h12" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
      </>
    ),
  };

  return (
    <svg
      className="route-result-icon dashboard-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function RoutesResult() {
  const [searchStart, setSearchStart] = useState("");
  const [searchDest, setSearchDest] = useState("");

  useEffect(() => {
    // Get query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from") || "Kos Dina, Bandung";
    const to = params.get("to") || "Kampus ITB";
    setSearchStart(from);
    setSearchDest(to);
  }, []);

  const handleSwap = () => {
    const temp = searchStart;
    setSearchStart(searchDest);
    setSearchDest(temp);
  };

  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  const handleSearch = () => {
    if (searchDest.trim()) {
      const searchParams = new URLSearchParams({
        from: searchStart,
        to: searchDest,
      });
      window.location.href = `/routes/search?${searchParams.toString()}`;
    }
  };

  const handleDestinationKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleStartingPointKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="routes-result-page">
      {/* Header */}
      <header className="routes-result-header">
        <div className="routes-result-header-content">
          <button
            className="routes-result-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <Icon name="arrow_back" />
          </button>
          <h1 className="routes-result-title">BusMate</h1>
        </div>
      </header>

      {/* Main Content */}
      <section className="routes-result-content">
        {/* Search Summary Card */}
        <section
          className="dashboard-route-search routes-result-search"
          aria-label="Trip search"
        >
          <label
            className="dashboard-route-field"
            htmlFor="result-starting-point"
          >
            <Icon name="radio" />
            <span>
              <small>Starting Point</small>
              <input
                id="result-starting-point"
                type="text"
                value={searchStart}
                onChange={(event) => setSearchStart(event.target.value)}
                onKeyPress={handleStartingPointKeyPress}
              />
            </span>
          </label>
          <div className="dashboard-route-divider" />
          <label className="dashboard-route-field" htmlFor="result-destination">
            <Icon name="location" />
            <span>
              <small>Destination</small>
              <input
                id="result-destination"
                type="text"
                placeholder="Where are you going?"
                value={searchDest}
                onChange={(event) => setSearchDest(event.target.value)}
                onKeyPress={handleDestinationKeyPress}
              />
            </span>
          </label>
          <button
            className="dashboard-swap-button"
            type="button"
            aria-label="Swap starting point and destination"
            onClick={handleSwap}
          >
            <Icon name="swap" />
          </button>
        </section>

        {/* Filter Pills */}
        <div className="filter-pills">
          <button className="pill pill-active">Fastest First</button>
          <button className="pill">AC Only</button>
          <button className="pill">Less Walking</button>
        </div>

        {/* Routes List */}
        <section className="routes-list-section">
          <h2 className="routes-list-title">Available Routes</h2>

          {availableRoutes.map((route) => (
            <article
              className={`route-card ${route.isFull ? "route-card-full" : ""}`}
              key={route.id}
              onClick={() => {
                window.location.href = `/routes/${route.id}`;
              }}
              role="button"
              tabIndex={0}
            >
              <div className="route-card-top">
                <div className="route-bus-info">
                  <div className="route-bus-box" aria-hidden="true">
                    <Icon name="bus" />
                    <span className="route-bus-number">{route.number}</span>
                  </div>
                  <div className="route-text">
                    <h3 className="route-name">{route.name}</h3>
                    <p className="route-frequency">{route.frequency}</p>
                  </div>
                </div>

                <div className="route-eta-section">
                  <p className="route-eta">
                    {route.eta} <span className="eta-unit">mins</span>
                  </p>
                  <span className={`status-badge status-${route.statusVariant}`}>
                    {route.status}
                  </span>
                </div>
              </div>

              <div className="route-card-divider" />

              <div className="route-card-bottom">
                <div className="route-details">
                  <div className="detail-item">
                    <Icon name="schedule" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="detail-item">
                    <Icon name="payments" />
                    <span>{route.price}</span>
                  </div>
                </div>

                <button className="select-button">
                  {route.isFull ? "Detail" : "Select"}
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Promo Section */}
        <section className="promo-section">
          <div className="promo-card">
            <div className="promo-content">
              <h3 className="promo-title">BusMate Prime</h3>
              <p className="promo-description">
                Unlimited rides for just Rp 150k/month.
              </p>
              <button className="promo-button">Upgrade Now</button>
            </div>
            <div className="promo-icon">
              <Icon name="bus" />
            </div>
          </div>
        </section>
      </section>

      <BottomNavigation currentPage="Routes" />
    </main>
  );
}
