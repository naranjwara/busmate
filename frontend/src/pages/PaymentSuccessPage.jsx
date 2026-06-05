import BottomNavigation from "../components/BottomNavigation";
import "./PaymentSuccessPage.css";

function Icon({ name }) {
  const paths = {
    check_circle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 6-7" />
      </>
    ),
    directions_bus: (
      <>
        <path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
        <path d="M6 8h12" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    schedule: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg
      className="payment-success-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function QrPattern() {
  const blocks = [
    0, 1, 2, 3, 4, 6, 8, 10, 11, 12, 13, 14, 16, 20, 22, 24, 26, 28, 30, 31, 34,
    35, 36, 38, 40, 42, 44, 46, 48, 50, 51, 52, 54, 56, 58, 60, 62, 64, 66, 67,
    70, 71, 72, 73, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 97, 100,
    102, 103, 105, 108, 109, 111, 113, 115, 118, 120, 122, 124, 126, 128, 130,
    132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160,
    162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190,
    192, 194, 196, 198, 200, 202,
  ];

  return (
    <div className="payment-success-qr-pattern" aria-hidden="true">
      {Array.from({ length: 225 }, (_, index) => (
        <span
          className={blocks.includes(index) ? "is-filled" : ""}
          key={index}
        />
      ))}
    </div>
  );
}

function DetailCard({ icon, tone, label, value }) {
  return (
    <article className="payment-success-detail-card">
      <div className={`payment-success-detail-icon ${tone}`}>
        <Icon name={icon} />
      </div>
      <div>
        <p>{label}</p>
        <h2>{value}</h2>
      </div>
    </article>
  );
}

export default function PaymentSuccessPage() {
  return (
    <main className="payment-success-page">
      <section className="payment-success-content" aria-label="Payment success">
        <header className="payment-success-hero">
          <div className="payment-success-check">
            <Icon name="check_circle" />
          </div>
          <h1>Payment Successful!</h1>
          <p>Your ticket is ready for boarding.</p>
        </header>

        <section
          className="payment-success-qr-card"
          aria-label="Ticket QR code"
        >
          <div className="payment-success-qr-box">
            <QrPattern />
          </div>
          <p>Transaction ID: TXN_882901</p>
        </section>

        <section className="payment-success-details" aria-label="Bus details">
          <DetailCard
            icon="directions_bus"
            tone="bus"
            label="Bus ID"
            value="AH123bh"
          />
          <DetailCard
            icon="person"
            tone="driver"
            label="Driver"
            value="Pak Budi"
          />
          <DetailCard
            icon="schedule"
            tone="arrival"
            label="Arrival"
            value="Est. 14:45 PM"
          />
        </section>

        <section className="payment-success-actions">
          <button
            type="button"
            onClick={() => window.location.assign("/tickets")}
          >
            View My Ticket
          </button>
          <button
            className="secondary"
            type="button"
            onClick={() => window.location.assign("/dashboard")}
          >
            Back to Home
          </button>
        </section>
      </section>

      <BottomNavigation currentPage="Tickets" />
    </main>
  );
}
