import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getRouteTracking } from "../services/routeTrackingService";
import AppHeader from "../components/AppHeader";
import BottomNavigation from "../components/BottomNavigation";
import "./RoutesPage.css";

const routeResults = [
  {
    id: 1,
    number: "Bus 05",
    code: "AH123bh",
    eta: "5 mins away",
    distance: "1.2 km",
    status: "Normal",
    statusVariant: "normal",
    driver: "Pak Budi",
    rating: "4.8",
    driverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDer5xcBJ8tkBebcG99BUauYWh2KH3UgfutZz5Bn6S0UfqjOpSJC9z1wTF_4RvkIV5nF1GLBEp4WQdX43gouIRI3bUBaIyw_FUhXfHoxZRJLVZwSbcKCg8eZgSl7E717--arnQKcBHS9xRBHdqIk_6l-Dw_Iw1bSXh7N_aKNgVe9TaWT2H5cv4NoGUWSYAzq0xjsiEeQkgrOxXMvT7Cx3kjN7B8keSOUT3fv9qAVrLUszow3K8bNu1REhxnC1g9HS0yCOE9tqRljUI",
  },
  {
    id: 2,
    number: "Bus 12",
    code: "BK992xz",
    eta: "12 mins away",
    distance: "3.4 km",
    status: "Full",
    statusVariant: "full",
    driver: "Ibu Siti",
    rating: "4.9",
    driverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4uycg-tnF26t4DSpWEOu2o5v3yyV7Xd1QKHW7r8KHniqa_-4uqvWKbm00RgriTVyqB5iSFyHejKcOH69WUGb9qyxdp0-5Mth3JKRRRyAlKnsU3mzGfpuc1_jfPIHmJBW1cBHUg9ER2Pgwo4e9p8_wqMRJNDDCLZMcBk1X43JcODS4HtUwUINSypz472fZwVJzouGnN_M7CYeUAY-i9E-iS-g9si4MhUu2sv-uqMiPRGbV8SPOmGqfCQAchSLrLwTVQq71qQvY-c",
  },
  {
    id: 3,
    number: "Bus 08",
    code: "CH441lk",
    eta: "18 mins away",
    distance: "5.1 km",
    status: "Normal",
    statusVariant: "normal",
    driver: "Pak Agus",
    rating: "4.7",
    driverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUFFBr-2l9l4F2P3Cmo93We2xW0X0NpBAK9QV_nkNXeOpR4DMadS-1cbodsNsQ8QjPzTDfJ-pNVHFYLPfvjSvOV67w4OTm496QBusFTqiZxk_xt98gYwP6o2vDCyZdQpKua7ddemlxWGoMO7_h466U2bOsmz4XNdEbZULI7mBvy3ASlmvCDVu1tU8qhLBulHL4tgtW6_m2I9dSssU2ZL32Cp9Axae8NcKLGNO1ccrPwdm4OIqO_pGACSHoW2W4P2R_vsdqO_T1AW0",
  },
  {
    id: 4,
    number: "Bus 03",
    code: "DK204mn",
    eta: "22 mins away",
    distance: "6.0 km",
    status: "Normal",
    statusVariant: "normal",
    driver: "Pak Rudi",
    rating: "4.6",
    driverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDer5xcBJ8tkBebcG99BUauYWh2KH3UgfutZz5Bn6S0UfqjOpSJC9z1wTF_4RvkIV5nF1GLBEp4WQdX43gouIRI3bUBaIyw_FUhXfHoxZRJLVZwSbcKCg8eZgSl7E717--arnQKcBHS9xRBHdqIk_6l-Dw_Iw1bSXh7N_aKNgVe9TaWT2H5cv4NoGUWSYAzq0xjsiEeQkgrOxXMvT7Cx3kjN7B8keSOUT3fv9qAVrLUszow3K8bNu1REhxnC1g9HS0yCOE9tqRljUI",
  },
  {
    id: 5,
    number: "Bus 16",
    code: "EF781qp",
    eta: "27 mins away",
    distance: "7.3 km",
    status: "Full",
    statusVariant: "full",
    driver: "Ibu Maya",
    rating: "4.8",
    driverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBp4uycg-tnF26t4DSpWEOu2o5v3yyV7Xd1QKHW7r8KHniqa_-4uqvWKbm00RgriTVyqB5iSFyHejKcOH69WUGb9qyxdp0-5Mth3JKRRRyAlKnsU3mzGfpuc1_jfPIHmJBW1cBHUg9ER2Pgwo4e9p8_wqMRJNDDCLZMcBk1X43JcODS4HtUwUINSypz472fZwVJzouGnN_M7CYeUAY-i9E-iS-g9si4MhUu2sv-uqMiPRGbV8SPOmGqfCQAchSLrLwTVQq71qQvY-c",
  },
];

function Icon({ name }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    filter_list: (
      <>
        <path d="M4 6h16" />
        <path d="M10 12h10" />
        <path d="M14 18h6" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    schedule: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    star: (
      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    ),
    arrow_forward: <path d="M5 12h14M12 5l7 7-7 7" />,
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h4a5 5 0 0 1 0 10H8" />
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
    <svg className="routes-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function RoutesPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedRoute = routeResults[selectedIndex];

  useEffect(() => {
    const loadTracking = async () => {
      if (!selectedRoute) return;
      try {
        await getRouteTracking(selectedRoute.id);
      } catch {
        // ignore for now, keep demo behavior
      }
    };

    loadTracking();
  }, [selectedRoute]);

  const mapCenter = useMemo(() => [-6.89044, 107.60958], []);

  return (
    <main className="routes-page">
      <AppHeader
        actions={["filter"]}
        className="routes-nav"
        locationLabel="Near you"
        sticky
      />

      <section className="routes-user-context" aria-label="Nearby buses summary">
        <span className="routes-context-eyebrow">Live nearby routes</span>
        <h1>Nearest buses around you</h1>
        <p>See the 5 closest active buses and pick the fastest ride from your current area.</p>
      </section>

      <section className="routes-map-card">
        <div className="map-image-wrap">
          <MapContainer
            center={mapCenter}
            className="interactive-leaflet-map"
            key="routes-map"
            scrollWheelZoom={false}
            zoom={13}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          <div className="tracking-chip">
            <span />
            Live tracking active
          </div>
        </div>
      </section>

      <section className="routes-result-list">
        {routeResults.map((route, index) => (
          <article
            className="route-result-card"
            key={route.id}
            role="button"
            tabIndex={0}
            onClick={() => window.location.assign(`/routes/${route.id}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                window.location.assign(`/routes/${route.id}`);
              }
            }}
          >
            <div className="route-result-top">
              <div>
                <div className="route-result-title-row">
                  <span className="route-number">{route.number}</span>
                  <span className="route-code">{route.code}</span>
                </div>
                <div className="route-result-meta-row">
                  <span className="route-result-meta-item">
                    <Icon name="schedule" />
                    {route.eta}
                  </span>
                  <span className="route-result-dot">•</span>
                  <span className="route-result-meta-item">
                    {route.distance}
                  </span>
                </div>
              </div>
              <span className={`status-pill ${route.statusVariant}`}>
                {route.status}
              </span>
            </div>
            <div className="route-result-footer">
              <div className="driver-card">
                <div className="driver-avatar">
                  <img src={route.driverImage} alt={route.driver} />
                </div>
                <div>
                  <p className="driver-name">{route.driver}</p>
                  <div className="driver-rating">
                    <Icon name="star" />
                    <span>{route.rating}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="track-button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedIndex(index);
                  window.location.assign(`/routes/${route.id}`);
                }}
              >
                Track
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="routes-banner-grid">
        <article className="banner-card banner-subscribe">
          <div>
            <h3>Save with Subscriptions</h3>
            <p>Get 20% off all rides to Kampus this month.</p>
          </div>
          <button type="button" className="banner-link">
            Learn more
            <Icon name="arrow_forward" />
          </button>
        </article>
        <article className="banner-card banner-ticket">
          <div>
            <h3>Instant Ticket</h3>
            <p>Purchase your fare now and skip the queue.</p>
          </div>
          <Icon name="confirmation_number" />
        </article>
      </section>

      <BottomNavigation currentPage="Routes" />
    </main>
  );
}
