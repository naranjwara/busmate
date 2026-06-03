import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import BottomNavigation from "../components/BottomNavigation";
import "./RouteDetailPage.css";

const routeDetails = {
  1: {
    title: "Bus 05 - AH123bh",
    cost: "Rp 5.000",
    duration: "45 mins total",
    lastUpdated: "Last updated 1 min ago",
    progress: 0.75,
    path: [
      [-6.89044, 107.60958],
      [-6.89215, 107.61384],
      [-6.89524, 107.61231],
      [-6.89867, 107.61029],
    ],
    stops: [
      {
        title: "Central Terminal",
        subtitle: "Starting point • 10:30 AM",
        status: "On Time",
        coords: [-6.89044, 107.60958],
      },
      {
        title: "Green Park Station",
        subtitle: "Current location • 10:45 AM",
        status: "Next Stop",
        detail: "2.4 km",
        active: true,
        coords: [-6.89215, 107.61384],
      },
      {
        title: "West Junction",
        subtitle: "ETA 11:05 AM",
        coords: [-6.89524, 107.61231],
      },
      {
        title: "Business District",
        subtitle: "ETA 11:15 AM",
        coords: [-6.89867, 107.61029],
      },
    ],
  },
  2: {
    title: "Bus 12 - BK992xz",
    cost: "Rp 6.000",
    duration: "55 mins total",
    lastUpdated: "Last updated 2 mins ago",
    progress: 0.5,
    path: [
      [-6.89044, 107.60958],
      [-6.89312, 107.61544],
      [-6.89683, 107.61403],
      [-6.89998, 107.6112],
    ],
    stops: [
      {
        title: "Central Terminal",
        subtitle: "Starting point • 09:30 AM",
        status: "On Time",
        coords: [-6.89044, 107.60958],
      },
      {
        title: "Green Park Station",
        subtitle: "Current location • 09:45 AM",
        status: "Next Stop",
        detail: "3.2 km",
        active: true,
        coords: [-6.89312, 107.61544],
      },
      {
        title: "West Junction",
        subtitle: "ETA 10:05 AM",
        coords: [-6.89683, 107.61403],
      },
      {
        title: "Business District",
        subtitle: "ETA 10:20 AM",
        coords: [-6.89998, 107.6112],
      },
    ],
  },
  3: {
    title: "Bus 08 - CH441lk",
    cost: "Rp 5.500",
    duration: "50 mins total",
    lastUpdated: "Last updated 3 mins ago",
    progress: 0.33,
    path: [
      [-6.89044, 107.60958],
      [-6.89298, 107.61488],
      [-6.8961, 107.61312],
      [-6.89912, 107.61075],
    ],
    stops: [
      {
        title: "Central Terminal",
        subtitle: "Starting point • 08:30 AM",
        status: "On Time",
        coords: [-6.89044, 107.60958],
      },
      {
        title: "Green Park Station",
        subtitle: "Current location • 08:45 AM",
        status: "Next Stop",
        detail: "4.1 km",
        active: true,
        coords: [-6.89298, 107.61488],
      },
      {
        title: "West Junction",
        subtitle: "ETA 09:05 AM",
        coords: [-6.8961, 107.61312],
      },
      {
        title: "Business District",
        subtitle: "ETA 09:15 AM",
        coords: [-6.89912, 107.61075],
      },
    ],
  },
};

function Icon({ name }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    share: (
      <>
        <path d="M18 8a3 3 0 1 0-2.83-4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10.17A3 3 0 1 0 18 8Z" />
        <path d="M9 14h6" />
      </>
    ),
    my_location: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
    layers: (
      <>
        <path d="M12 3 2 9l10 6 10-6-10-6Z" />
        <path d="m2 15 10 6 10-6" />
        <path d="m2 11 10 6 10-6" />
      </>
    ),
    schedule: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    history: <path d="M12 8V4l4 4-4 4v-4a8 8 0 1 0 8 8h-2a6 6 0 1 1-6-6Z" />,
    navigation: <path d="M12 2 19 21 12 17 5 21 12 2Z" />,
    notifications: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 6-3 8h18c0-2-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    home: (
      <path d="M3 12 12 3l9 9v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2v-8Z" />
    ),
    directions_bus: (
      <>
        <path d="M3 10h18v8a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2h-8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
        <path d="M5 12v4h2v-4H5Zm12 0v4h2v-4h-2Z" />
        <path d="M7 6h10v4H7V6Z" />
      </>
    ),
    confirmation_number: (
      <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v2H9v-2H7a2 2 0 0 1-2-2v-4Z" />
    ),
    person: (
      <>
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
        <path d="M7 18c0-2.2 2.7-4 5-4s5 1.8 5 4v2H7v-2Z" />
      </>
    ),
  };
  return (
    <svg className="detail-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function RouteDetailPage() {
  const currentPath = window.location.pathname;
  const routeId = Number(currentPath.split("/").pop());
  const route = routeDetails[routeId] || routeDetails[1];
  const completedWidth = `${Math.round((route.progress ?? 0.5) * 100)}%`;
  const mapCenter = useMemo(() => [-6.89044, 107.60958], []);

  return (
    <main className="route-detail-page">
      <header className="route-detail-header">
        <div className="route-detail-header-left">
          <button
            className="icon-button"
            type="button"
            onClick={() => window.location.assign("/routes")}
          >
            <Icon name="arrow_back" />
          </button>
          <h1>{route.title}</h1>
        </div>
        <button className="icon-button" type="button">
          <Icon name="share" />
        </button>
      </header>

      <section className="route-detail-map-section">
        <div className="route-detail-map-overlay">
          <MapContainer
            center={mapCenter}
            className="route-detail-map"
            scrollWheelZoom={false}
            zoom={13}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
              positions={route.path}
              pathOptions={{ color: "#f59e0b", weight: 5, opacity: 0.85 }}
            />
            {route.stops.map((stop, index) => (
              <CircleMarker
                key={index}
                center={stop.coords}
                pathOptions={{
                  color: stop.active ? "#a04100" : "#8e7164",
                  fillColor: stop.active ? "#ffe07f" : "#ffffff",
                  fillOpacity: 1,
                  weight: 2,
                }}
                radius={stop.active ? 8 : 6}
              >
                <Popup>
                  <strong>{stop.title}</strong>
                  <div>{stop.subtitle}</div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className="route-detail-map-controls">
            <button className="map-control-button" type="button">
              <Icon name="my_location" />
            </button>
            <button className="map-control-button" type="button">
              <Icon name="layers" />
            </button>
          </div>
        </div>
      </section>

      <section className="route-detail-summary">
        <div className="route-detail-summary-top">
          <div>
            <p>Estimated Cost</p>
            <h2>{route.cost}</h2>
          </div>
          <div className="route-detail-summary-chip">
            <Icon name="schedule" />
            <span>{route.duration}</span>
          </div>
        </div>
        <div className="route-detail-update-row">
          <div className="route-detail-update-left">
            <div className="route-detail-update-icon">
              <Icon name="history" />
            </div>
            <p>{route.lastUpdated}</p>
          </div>
          <div className="route-detail-progress-bar">
            <div
              className="route-detail-progress-fill"
              style={{ width: completedWidth }}
            />
          </div>
        </div>
        <div className="route-detail-actions">
          <button
            className="track-live-button"
            type="button"
            onClick={() => window.location.assign("/bus-tracking")}
          >
            <Icon name="navigation" />
            Track Live
          </button>
          <button className="notification-button" type="button">
            <Icon name="notifications" />
          </button>
        </div>
      </section>

      <section className="route-detail-stops">
        <h3>Route Stops</h3>
        <div className="route-detail-stop-list">
          <div className="route-detail-connector" />
          {route.stops.map((stop, index) => (
            <div
              key={index}
              className={`route-detail-stop ${index === 0 ? "completed-stop" : ""} ${
                stop.active ? "active-stop" : ""
              }`}
            >
              <div className="route-detail-stop-marker">
                {stop.active ? (
                  <div className="route-detail-bus-marker">
                    <Icon name="directions_bus" />
                  </div>
                ) : (
                  <div className="route-detail-stop-dot" />
                )}
              </div>
              <div className="route-detail-stop-content">
                <p className="stop-title">{stop.title}</p>
                <p className="stop-subtitle">{stop.subtitle}</p>
              </div>
              {stop.detail ? (
                <div className="stop-detail-right">
                  <span>{stop.status}</span>
                  <strong>{stop.detail}</strong>
                </div>
              ) : stop.status ? (
                <span className="stop-status">{stop.status}</span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <div className="route-detail-buy-button-container">
        <button
          className="buy-ticket-button"
          type="button"
          onClick={() => window.location.assign("/payment-method")}
        >
          <Icon name="confirmation_number" />
          BUY TICKET
        </button>
      </div>

      <BottomNavigation currentPage="Routes" />
    </main>
  );
}
