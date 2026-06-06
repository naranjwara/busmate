import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./BusTrackingPage.css";

const busPosition = [-6.932887326792079, 107.62664590189593];
const userPosition = [-6.9382236191933435, 107.6163467734631];
const userStopId = "halte-user";
const stopMarkers = [
  {
    id: "north-stop",
    label: "1",
    position: [-6.932887326792079, 107.62664590189593],
  },
  {
    id: "halte-user",
    label: "2",
    position: [-6.9382236191933435, 107.6163467734631],
  },
];

const directionPath = [
  busPosition,
  [-6.932887326792079, 107.62664590189593],
  [-6.932633276019135, 107.62575015254055],
  [-6.9346372199865645, 107.62522784720778],
  [-6.936985649504373, 107.62272727877148],
  [-6.938161266372351, 107.62020830518279],
  [-6.938021127280993, 107.61636598222468],
  stopMarkers.find((stop) => stop.id === userStopId).position,
];
const trackingBuses = {
  "05": {
    number: "05",
    routeName: "Dipatiukur - Jatinangor",
    eta: "4 mins",
    distance: "1.4 km away",
    status: "Normal",
    driver: "Pak Budi",
    busId: "AH123bh",
  },
  12: {
    number: "12",
    routeName: "Leuwipanjang - Dago",
    eta: "11 mins",
    distance: "3.2 km away",
    status: "Full",
    driver: "Pak Asep",
    busId: "BD120sk",
  },
  "08": {
    number: "08",
    routeName: "Cijerah - Derwati",
    eta: "9 mins",
    distance: "2.1 km away",
    status: "Normal",
    driver: "Pak Agus",
    busId: "CH441lk",
  },
};

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
    ticket: (
      <>
        <path d="M3 8a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
        <path d="M13 5v14" />
        <path d="M13 9h.01" />
        <path d="M13 15h.01" />
      </>
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

function FitTrackingBounds({ path, points }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds([...path, ...points]);

    map.fitBounds(bounds, {
      animate: false,
      paddingBottomRight: [24, 320],
      paddingTopLeft: [24, 84],
    });
  }, [map, path, points]);

  return null;
}

export default function BusTrackingPage() {
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const selectedBusId = window.location.pathname.split("/").filter(Boolean)[1];
  const selectedBus = trackingBuses[selectedBusId] ?? trackingBuses["05"];
  const mapCenter = useMemo(() => [-6.942903283169671, 107.62358908321805], []);
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
  const destinationStopIcon = useMemo(
    () =>
      L.divIcon({
        className: "leaflet-destination-stop-wrap",
        html: '<div class="leaflet-destination-stop"></div>',
        iconAnchor: [15, 15],
        iconSize: [30, 30],
      }),
    [],
  );
  const trackingBoundsPoints = useMemo(
    () => [
      busPosition,
      userPosition,
      ...stopMarkers.map((stop) => stop.position),
    ],
    [],
  );
  const handleAlternativeRoute = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

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
          <div className="tracking-title-group">
            <span className="tracking-bus-number">{selectedBus.number}</span>
            <div>
              <p>Bus {selectedBus.number}</p>
              <h1>{selectedBus.routeName}</h1>
            </div>
          </div>
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
          <FitTrackingBounds
            path={directionPath}
            points={trackingBoundsPoints}
          />
          <Polyline
            className="tracking-direction-shadow"
            pathOptions={{
              color: "#1a1c1d",
              opacity: 0.18,
              weight: 10,
            }}
            positions={directionPath}
          />
          <Polyline
            className="tracking-direction-line"
            pathOptions={{
              color: "#a04100",
              dashArray: "1 12",
              lineCap: "round",
              lineJoin: "round",
              opacity: 0.95,
              weight: 6,
            }}
            positions={directionPath}
          />
          <Marker icon={userIcon} position={userPosition} />
          <Marker icon={busIcon} position={busPosition} />
          {stopMarkers.map((stop) => (
            <Marker
              icon={stop.id === userStopId ? destinationStopIcon : stopIcon}
              key={stop.label}
              position={stop.position}
            >
              {stop.id === userStopId ? (
                <Tooltip direction="top" offset={[0, -18]} permanent>
                  Halte tujuan
                </Tooltip>
              ) : null}
            </Marker>
          ))}
        </MapContainer>
        <div className="tracking-map-overlay" />
      </section>

      <div className="tracking-controls">
        <button
          className="control-button"
          type="button"
          aria-label="My location"
        >
          <Icon name="my_location" />
        </button>
        <button
          className="control-button"
          type="button"
          aria-label="Map layers"
        >
          <Icon name="layers" />
        </button>
      </div>

      <section
        className={`tracking-sheet ${isSheetCollapsed ? "collapsed" : ""}`}
        aria-label="Bus tracking details"
      >
        <div className="sheet-content">
          <button
            className="sheet-handle"
            type="button"
            aria-expanded={!isSheetCollapsed}
            aria-label={
              isSheetCollapsed
                ? "Expand tracking sheet"
                : "Collapse tracking sheet"
            }
            onClick={() => setIsSheetCollapsed((current) => !current)}
          />

          {isSheetCollapsed && (
            <div className="tracking-sheet-summary">
              <div className="tracking-summary-content">
                <p className="tracking-label">Estimated Arrival</p>
                <h2>{selectedBus.eta}</h2>
                <p className="tracking-subtitle">
                  {selectedBus.distance} • Updated 1 min ago
                </p>
              </div>

              <div
                className={`tracking-badge status-${selectedBus.status.toLowerCase()}`}
              >
                <span />
                {selectedBus.status}
              </div>
            </div>
          )}

          <div className="sheet-body">
            <div className="tracking-status-row">
              <div>
                <p className="tracking-route-name">{selectedBus.routeName}</p>
                <p className="tracking-label">Estimated Arrival</p>
                <h2>{selectedBus.eta}</h2>
                <p className="tracking-subtitle">
                  {selectedBus.distance} • <span>Updated 1 min ago</span>
                </p>
              </div>
              <div
                className={`tracking-badge status-${selectedBus.status.toLowerCase()}`}
              >
                <span />
                {selectedBus.status}
              </div>
            </div>

            <div className="tracking-action-grid">
              <button
                className="tracking-action-button ticket-button"
                type="button"
                onClick={() => window.location.assign("/payment-method")}
              >
                <Icon name="ticket" />
                <span>Get a Ticket</span>
              </button>

              <button
                className="tracking-action-button primary-button"
                type="button"
                onClick={handleAlternativeRoute}
              >
                <Icon name="route" />
                <span>Alternative Route</span>
              </button>
              <button
                className="tracking-action-button secondary-button"
                type="button"
                aria-label="Notifications"
                onClick={handleAlternativeRoute}
              >
                <Icon name="notifications" />
              </button>
            </div>

            {showMessage && (
              <div className="coming-soon-toast">
                This feature will be available soon.
              </div>
            )}

            <div className="tracking-divider" />

            <div className="tracking-driver-row">
              <div className="tracking-driver-card">
                <div className="driver-avatar-wrap">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmFBWjVWzNygOsoLXujTc_rF0bAK6xBU_5Tt3qaUswJVRoXAbTRL_qf6lERAayxz-6ZmT8SKLvvxNcso2aJ-mpY5yIb2NRMvzFmDq7R4hxUNrwQedILxQt0ljhOZPurtSPcj-1VyFavl9H12rS4nhxWwJG2qq9XMod1fU7sBZASAYXkKeyzPlYdE3rIRvyqRvleVCJ6SU6Tj2IDgEkcY6BoffpfAzMQWHsh8dC7FHTVVapLVzy5ByjoI7yJkWDcdgUanWUWht98mE"
                    alt={`${selectedBus.driver} Profile`}
                  />
                  <span className="avatar-badge">VERIFIED</span>
                </div>
                <div className="driver-info-text">
                  <h3>{selectedBus.driver}</h3>
                  <div className="driver-meta">
                    <Icon filled name="star" />
                    <span>4.8/5</span>
                    <span className="meta-separator">•</span>
                    <span>Bus ID: {selectedBus.busId}</span>
                  </div>
                </div>
              </div>
              <button className="driver-action-button" type="button">
                <Icon filled name="star" />
                View Reviews
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
