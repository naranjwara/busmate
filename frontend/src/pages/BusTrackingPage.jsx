import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./BusTrackingPage.css";

const busPosition = [-6.88665, 107.6184];
const userPosition = [-6.89535, 107.60958];
const stopMarkers = [
  { label: "1", position: [-6.8818, 107.6039] },
  { label: "2", position: [-6.8926, 107.6228] },
];

function Icon({ name, filled = false }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    bus: (
      <>
        <path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
        <path d="M6 8h12" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3 2 9l10 6 10-6-10-6Z" />
        <path d="m2 15 10 6 10-6" />
        <path d="m2 11 10 6 10-6" />
      </>
    ),
    my_location: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    notifications: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 6-3 8h18c0-2-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h4a5 5 0 0 1 0 10H8" />
      </>
    ),
    star: (
      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    ),
  };

  return (
    <svg
      className={`tracking-icon ${filled ? "filled" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function BusTrackingPage() {
  const mapCenter = useMemo(() => [-6.89044, 107.6136], []);
  const busIcon = useMemo(
    () =>
      L.divIcon({
        className: "leaflet-tracking-bus-wrap",
        html: '<div class="leaflet-tracking-bus"><svg class="tracking-icon filled" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"></path><path d="M6 8h12"></path><path d="M7 14h.01"></path><path d="M17 14h.01"></path></svg></div>',
        iconAnchor: [24, 24],
        iconSize: [48, 48],
      }),
    [],
  );
  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: "leaflet-user-location-wrap",
        html: '<div class="leaflet-user-location"><span></span></div>',
        iconAnchor: [16, 16],
        iconSize: [32, 32],
      }),
    [],
  );
  const stopIcon = useMemo(
    () =>
      L.divIcon({
        className: "leaflet-stop-marker-wrap",
        html: '<div class="leaflet-stop-marker"></div>',
        iconAnchor: [12, 12],
        iconSize: [24, 24],
      }),
    [],
  );

  return (
    <main className="bus-tracking-page">
      <header className="tracking-header">
        <div className="tracking-header-left">
          <button
            className="tracking-icon-button"
            type="button"
            aria-label="Back to routes"
            onClick={() => window.location.assign("/routes")}
          >
            <Icon name="arrow_back" />
          </button>
          <h1>Track Your Bus</h1>
        </div>
      </header>

      <section className="tracking-map-section" aria-label="Live bus map">
        <MapContainer
          center={mapCenter}
          className="tracking-map"
          scrollWheelZoom={false}
          zoom={14}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={userIcon} position={userPosition} />
          <Marker icon={busIcon} position={busPosition} />
          {stopMarkers.map((stop) => (
            <Marker
              icon={stopIcon}
              key={stop.label}
              position={stop.position}
            />
          ))}
        </MapContainer>
        <div className="tracking-map-overlay" />
        {stopMarkers.map((stop, index) => (
          <div
            className={`tracking-stop-label stop-label-${index + 1}`}
            key={stop.label}
          >
            {stop.label}
          </div>
        ))}
      </section>

      <div className="tracking-controls">
        <button className="control-button" type="button" aria-label="My location">
          <Icon name="my_location" />
        </button>
        <button className="control-button" type="button" aria-label="Map layers">
          <Icon name="layers" />
        </button>
      </div>

      <section className="tracking-sheet" aria-label="Bus tracking details">
        <div className="sheet-content">
          <div className="sheet-handle" />
          <div className="tracking-status-row">
            <div>
              <p className="tracking-label">Estimated Arrival</p>
              <h2>8 mins</h2>
              <p className="tracking-subtitle">
                2.9 km away • <span>Updated 1 min ago</span>
              </p>
            </div>
            <div className="tracking-badge">
              <span />
              Normal
            </div>
          </div>

          <div className="tracking-action-grid">
            <button className="tracking-action-button primary-button" type="button">
              <Icon name="route" />
              Alternative Route
            </button>
            <button
              className="tracking-action-button secondary-button"
              type="button"
              aria-label="Notifications"
            >
              <Icon name="notifications" />
            </button>
          </div>

          <div className="tracking-divider" />

          <div className="tracking-driver-row">
            <div className="tracking-driver-card">
              <div className="driver-avatar-wrap">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFBWjVWzNygOsoLXujTc_rF0bAK6xBU_5Tt3qaUswJVRoXAbTRL_qf6lERAayxz-6ZmT8SKLvvxNcso2aJ-mpY5yIb2NRMvzFmDq7R4hxUNrwQedILxQt0ljhOZPurtSPcj-1VyFavl9H12rS4nhxWwJG2qq9XMod1fU7sBZASAYXkKeyzPlYdE3rIRvyqRvleVCJ6SU6Tj2IDgEkcY6BoffpfAzMQWHsh8dC7FHTVVapLVzy5ByjoI7yJkWDcdgUanWUWht98mE"
                  alt="Pak Budi Profile"
                />
                <span className="avatar-badge">VERIFIED</span>
              </div>
              <div className="driver-info-text">
                <h3>Pak Budi</h3>
                <div className="driver-meta">
                  <Icon filled name="star" />
                  <span>4.8/5</span>
                  <span className="meta-separator">•</span>
                  <span>Bus ID: AH123bh</span>
                </div>
              </div>
            </div>
            <button className="driver-action-button" type="button">
              <Icon filled name="star" />
              View Reviews
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
