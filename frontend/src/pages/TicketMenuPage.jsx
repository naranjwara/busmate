import BottomNavigation from "../components/BottomNavigation";
import AppHeader from "../components/AppHeader";
import AppToast from "../components/AppToast";
import { useToast } from "../hooks/useToast";
import "./TicketMenuPage.css";

const recentTrips = [
  {
    route: "Ledeng - Cicaheum",
    date: "May 12, 2024 • 09:15 AM",
    bus: "Bus 12",
    rating: 4,
    action: "Rate Driver",
    actionVariant: "primary",
  },
  {
    route: "Dipatiukur - Jatinangor",
    date: "May 10, 2024 • 17:40 PM",
    bus: "Bus 08",
    rating: 5,
    action: "Rated",
    actionVariant: "muted",
  },
  {
    route: "Kampus - Cibiru",
    date: "May 08, 2024 • 13:20 PM",
    bus: "Bus 05",
    rating: 4,
    action: "Rate Driver",
    actionVariant: "primary",
  },
];

function Icon({ name, filled = false }) {
  const paths = {
    account: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 6-3 8h18c0-2-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
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
    location: (
      <>
        <path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h4a5 5 0 0 1 0 10H8" />
      </>
    ),
    stars: (
      <path d="M12 2.5 14.72 8l6.08.88-4.4 4.29 1.04 6.06L12 16.37l-5.44 2.86 1.04-6.06-4.4-4.29L9.28 8 12 2.5Z" />
    ),
    star: (
      <path d="M12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
    ),
    wallet: (
      <>
        <path d="M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
        <path d="M16 13h5" />
      </>
    ),
  };

  return (
    <svg
      className={`ticket-menu-icon ${filled ? "filled" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function RatingStars({ value }) {
  return (
    <div className="ticket-trip-stars" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon filled={index < value} key={index} name="star" />
      ))}
    </div>
  );
}

export default function TicketMenuPage() {
  const { toast, showToast, hideToast } = useToast();

  return (
    <main className="ticket-menu-page">
      <section className="ticket-menu-screen" aria-label="My tickets">
        <AppHeader
          actions={["bell", "account"]}
          className="dashboard-app-header"
          locationLabel="Kos Dina, Bandung"
          showToast={showToast}
          sticky
        />

        <div className="ticket-menu-content">
          <section className="ticket-section">
            <h2>Your Ticket</h2>
            <article className="active-ticket-card">
              <div className="active-ticket-head">
                <div>
                  <p className="active-ticket-bus">Bus 05</p>
                  <p className="active-ticket-id">Bus ID: AH123bh</p>
                </div>
                <span className="active-ticket-bus-icon">
                  <Icon name="bus" />
                </span>
              </div>

              <div className="active-ticket-body">
                <div className="active-ticket-route">
                  <p className="ticket-eyebrow">Route</p>
                  <div className="route-stack">
                    <div className="route-pins" aria-hidden="true">
                      <span className="route-pin start" />
                      <span className="route-line" />
                      <span className="route-pin end" />
                    </div>
                    <div>
                      <p>Cicaheum</p>
                      <p>Ledeng</p>
                    </div>
                  </div>
                </div>
                <div className="active-ticket-departure">
                  <p className="ticket-eyebrow">Departure</p>
                  <strong>14:30 PM</strong>
                </div>
              </div>

              <div className="active-ticket-actions">
                <button
                  className="ticket-primary-button"
                  type="button"
                  onClick={() => window.location.assign("/show-qr")}
                >
                  Show QR
                </button>
                <button
                  className="ticket-outline-button"
                  type="button"
                  onClick={() =>
                    showToast({
                      title: "Ticket Details",
                      message: "This feature will be available soon",
                      type: "info",
                    })
                  }
                >
                  Details
                </button>
              </div>
            </article>
          </section>

          <section className="loyalty-card">
            <div className="loyalty-head">
              <div>
                <Icon filled name="stars" />
                <h3>Loyalty Rewards</h3>
              </div>
              <span>8/10 trips</span>
            </div>
            <div className="loyalty-progress" aria-hidden="true">
              <span />
            </div>
            <p>
              <strong>2 trips away</strong> from a free ticket!
            </p>
          </section>

          <section className="ticket-section">
            <h3>Deals for You</h3>
            <div className="deals-scroll" aria-label="Ticket deals">
              <article className="deal-card deal-primary">
                <div>
                  <p>Voucher code</p>
                  <strong>10% OFF</strong>
                </div>
                <span>Next Trip Reward</span>
              </article>
              <article className="deal-card deal-secondary">
                <div>
                  <p>Flash sale</p>
                  <strong>WEEKEND</strong>
                </div>
                <span>Special Fare Rp 5.000</span>
              </article>
            </div>
          </section>

          <section className="ticket-section">
            <div className="ticket-section-row">
              <h3>Recent Trips</h3>
              <a href="/tickets">View All</a>
            </div>
            <div className="recent-trips-list">
              {recentTrips.map((trip) => (
                <article className="recent-trip-card" key={trip.route}>
                  <div className="recent-trip-head">
                    <div>
                      <p>{trip.route}</p>
                      <span>{trip.date}</span>
                    </div>
                    <strong>{trip.bus}</strong>
                  </div>
                  <div className="recent-trip-footer">
                    <RatingStars value={trip.rating} />
                    <div className="recent-trip-actions">
                      <button type="button">Report</button>
                      <button className={trip.actionVariant} type="button">
                        {trip.action}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="savings-card">
            <span>
              <Icon name="wallet" />
            </span>
            <div>
              <p>Smart Savings</p>
              <strong>
                Total Saved: <b>Rp 150.000</b> compared to private car
              </strong>
            </div>
          </section>
        </div>

        <BottomNavigation currentPage="Tickets" />
        <AppToast
          isOpen={toast.open}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      </section>
    </main>
  );
}
