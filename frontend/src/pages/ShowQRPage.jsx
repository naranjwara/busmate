import "./ShowQRPage.css";

const qrCodeImage =
  "https://lh3.googleusercontent.com/aida/AP1WRLvEgbQ36zaZ3A7l2SQzXH6QZ5MyGJM6quMQl059SUendovJJFFNqqWy8EgSDdOSGa8Qsr7p__y-UhvpSpRZB0H0-w6QQt-KCS55EGIelgTyDbTtivChCyxzEbD_UUV6FOKl2iYGOmDq3NPW2N7AOvDkf68yG1BN0sEiRPWnCC3Jk9l5MrBKIEVO5ZdsedsjPcYfRd0i49vu_qmDzVZHBAsyQbYvyYDAQfgYlR8PtThWNv0CKNOYPEHAgOY";

function Icon({ name }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    event_seat: (
      <>
        <path d="M7 4h10a2 2 0 0 1 2 2v9H5V6a2 2 0 0 1 2-2Z" />
        <path d="M5 15v5M19 15v5M7 20h10" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    payments: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    support: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.7 2.7 0 0 1 5 1.4c0 2-2.5 2.2-2.5 4" />
        <path d="M12 18h.01" />
      </>
    ),
  };

  return (
    <svg className="show-qr-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <article className="show-qr-info-tile">
      <div className="show-qr-info-label">
        <Icon name={icon} />
        <span>{label}</span>
      </div>
      <p>{value}</p>
    </article>
  );
}

export default function ShowQRPage() {
  return (
    <main className="show-qr-page">
      <header className="show-qr-header">
        <div className="show-qr-header-left">
          <button
            className="show-qr-icon-button"
            type="button"
            aria-label="Back to tickets"
            onClick={() => window.location.assign("/tickets")}
          >
            <Icon name="arrow_back" />
          </button>
          <h1>Tiket Digital</h1>
        </div>
        <button
          className="show-qr-icon-button"
          type="button"
          aria-label="Close ticket"
          onClick={() => window.location.assign("/tickets")}
        >
          <Icon name="close" />
        </button>
      </header>

      <section className="show-qr-content" aria-label="Digital ticket QR code">
        <article className="show-qr-ticket-card">
          <div className="show-qr-accent" />
          <div className="show-qr-code-box">
            <img src={qrCodeImage} alt="QR Code" />
          </div>

          <div className="show-qr-status" aria-label="QR status">
            <span />
            Siap di-scan
          </div>

          <div className="show-qr-divider" aria-hidden="true">
            <span />
          </div>

          <div className="show-qr-route-row">
            <div>
              <span className="show-qr-label">Rute Bus</span>
              <strong>Cicaheum - Ledeng</strong>
            </div>
            <span className="show-qr-bus-pill">Bus 05</span>
          </div>

          <div className="show-qr-detail-grid">
            <div>
              <span className="show-qr-label">ID Kendaraan</span>
              <strong>AH123bh</strong>
            </div>
            <div>
              <span className="show-qr-label">Berangkat</span>
              <strong>14:30 PM</strong>
            </div>
          </div>
        </article>

        <section className="show-qr-info-grid" aria-label="Ticket information">
          <InfoTile icon="event_seat" label="Tempat Duduk" value="12A" />
          <InfoTile icon="payments" label="Tipe Tiket" value="Reguler" />
        </section>

        <section className="show-qr-actions" aria-label="Ticket actions">
          <button
            type="button"
            onClick={() => window.location.assign("/bus-tracking/05")}
          >
            <Icon name="map" />
            Buka Peta Live
          </button>
          <button className="secondary" type="button">
            <Icon name="support" />
            Butuh Bantuan?
          </button>
        </section>
      </section>
    </main>
  );
}
