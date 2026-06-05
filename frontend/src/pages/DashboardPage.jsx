import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import avatar from "../assets/figma-dashboard/commuter-avatar.png";
import AppHeader from "../components/AppHeader";
import BottomNavigation from "../components/BottomNavigation";

const favoriteRoutes = [
  { name: "Kos - Kampus", eta: "12 min", icon: "homeWork" },
  { name: "Kampus - Mall", eta: "24 min", icon: "school" },
];

const nearbyBuses = [
  { number: "05", name: "Bus 05 - Dago", eta: "4 mins", status: "NORMAL" },
  { number: "12", name: "Bus 12 - Sukajadi", eta: "11 mins", status: "FULL" },
];

function Icon({ name }) {
  const paths = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 6-3 8h18c0-2-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    account: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    bus: (
      <>
        <path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
        <path d="M6 8h12" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
      </>
    ),
    chevronRight: <path d="m9 18 6-6-6-6" />,
    chat: (
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    heart: (
      <path d="M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    ),
    homeWork: (
      <>
        <path d="M3 21V9l8-6 8 6v12" />
        <path d="M9 21v-7h4v7" />
        <path d="M15 21v-9h6v9" />
        <path d="M17 15h2" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15" />
        <path d="M15 6v15" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h4a5 5 0 0 1 0 10H8" />
      </>
    ),
    openFull: (
      <>
        <path d="M15 3h6v6" />
        <path d="m21 3-7 7" />
        <path d="M9 21H3v-6" />
        <path d="m3 21 7-7" />
      </>
    ),
    qr: (
      <>
        <path d="M4 4h6v6H4z" />
        <path d="M14 4h6v6h-6z" />
        <path d="M4 14h6v6H4z" />
        <path d="M14 14h2v2h-2z" />
        <path d="M18 14h2v6h-6v-2h4z" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    school: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v4c1.6 1.4 3.6 2 6 2s4.4-.6 6-2v-4" />
      </>
    ),
    radio: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
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
    ticket: (
      <>
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 1 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 1 0 0-4V7Z" />
        <path d="M13 5v14" />
      </>
    ),
    thumbsUp: (
      <>
        <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        <path d="M7 11 12 2a3 3 0 0 1 3 3v4h4a3 3 0 0 1 3 3l-2 7a3 3 0 0 1-3 3H7V11Z" />
      </>
    ),
  };

  return (
    <svg className="dashboard-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function DashboardPage() {
  const mapCenter = useMemo(() => [-6.89044, 107.60958], []);
  const [startingPoint, setStartingPoint] = useState("Kos Dina, Bandung");
  const [destination, setDestination] = useState("");

  const handleSwapLocations = () => {
    setStartingPoint(destination);
    setDestination(startingPoint);
  };

  const handleSearch = () => {
    if (destination.trim()) {
      const searchParams = new URLSearchParams({
        from: startingPoint,
        to: destination,
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
    <main className="dashboard-page">
      <section className="dashboard-screen" aria-label="BusMate dashboard">
        <div className="dashboard-content">
          <header className="dashboard-top dashboard-trip-search">
            <AppHeader
              actions={["bell", "account"]}
              className="dashboard-app-header"
              locationLabel="Kos Dina, Bandung"
            />

            <section
              className="dashboard-route-search"
              aria-label="Trip search"
            >
              <label className="dashboard-route-field" htmlFor="starting-point">
                <Icon name="radio" />
                <span>
                  <small>Starting Point</small>
                  <input
                    id="starting-point"
                    type="text"
                    value={startingPoint}
                    onChange={(event) => setStartingPoint(event.target.value)}
                    onKeyPress={handleStartingPointKeyPress}
                  />
                </span>
              </label>
              <div className="dashboard-route-divider" />
              <label className="dashboard-route-field" htmlFor="destination">
                <Icon name="location" />
                <span>
                  <small>Destination</small>
                  <input
                    id="destination"
                    type="text"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                    onKeyPress={handleDestinationKeyPress}
                  />
                </span>
              </label>
              <button
                className="dashboard-swap-button"
                type="button"
                aria-label="Swap starting point and destination"
                onClick={handleSwapLocations}
              >
                <Icon name="swap" />
              </button>
            </section>
          </header>

          <section className="map-card" aria-label="Live map preview">
            <div className="map-image-wrap">
              <MapContainer
                center={mapCenter}
                className="interactive-leaflet-map"
                key="dashboard-map-preview"
                scrollWheelZoom={false}
                zoom={15}
                zoomControl={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
              <div className="tracking-chip">
                <span></span>
                Live Tracking Active
              </div>
            </div>
            <div className="map-card-footer">
              <div className="map-meta">
                <span className="map-icon-box">
                  <Icon name="map" />
                </span>
                <div>
                  <h2>Interactive Map</h2>
                  <p>Tap to view full screen</p>
                </div>
              </div>
              <button
                className="dashboard-icon-button"
                type="button"
                aria-label="Open map"
              >
                <Icon name="openFull" />
              </button>
            </div>
          </section>

          <section className="dashboard-section favorite-section">
            <div className="section-heading">
              <h2>Rute Favorit</h2>
              <button type="button">View All</button>
            </div>
            <div className="favorite-scroll">
              {favoriteRoutes.map((route) => (
                <article className="favorite-card" key={route.name}>
                  <Icon name={route.icon} />
                  <h3>{route.name}</h3>
                  <p>
                    <Icon name="clock" />
                    {route.eta}
                  </p>
                </article>
              ))}
              <button className="add-route-card" type="button">
                <span>
                  <Icon name="plus" />
                </span>
                Add Route
              </button>
            </div>
          </section>

          <section className="dashboard-section">
            <h2>Bus Terdekat</h2>
            <div className="nearby-list">
              {nearbyBuses.map((bus) => (
                <article className="bus-item" key={bus.number}>
                  <div className="bus-item-main">
                    <span className="bus-number">{bus.number}</span>
                    <div>
                      <h3>{bus.name}</h3>
                      <div className="bus-detail-row">
                        <p>
                          ETA: <strong>{bus.eta}</strong>
                        </p>
                        <span
                          className={`status-pill ${bus.status.toLowerCase()}`}
                        >
                          <i></i>
                          {bus.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Icon name="chevronRight" />
                </article>
              ))}
            </div>
          </section>

          <section className="dashboard-section commuter-section">
            <div className="section-heading">
              <h2>Commuter Talk</h2>
              <button type="button">Forum</button>
            </div>
            <article className="talk-card">
              <div className="talk-author">
                <img src={avatar} alt="" />
                <div>
                  <h3>Budi Santoso</h3>
                  <p>5 mins ago • Dago Station</p>
                </div>
              </div>
              <p className="talk-message">
                {
                  '"Bus 05 is quite crowded today due to the rain. Better take the 07 or wait another 15 mins for the next 05 empty fleet!"'
                }
              </p>
              <div className="talk-actions">
                <button type="button">
                  <Icon name="thumbsUp" />
                  12
                </button>
                <button type="button">
                  <Icon name="chat" />4
                </button>
              </div>
            </article>
          </section>
        </div>

        <button
          className="dashboard-fab"
          type="button"
          aria-label="Scan QR code"
        >
          <Icon name="qr" />
        </button>

        <BottomNavigation currentPage="Home" />
      </section>
    </main>
  );
}

export default DashboardPage;
