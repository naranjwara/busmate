import "./AppHeader.css";

function HeaderIcon({ name }) {
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
    filter: (
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
  };

  return (
    <svg className="app-header-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function AppHeader({
  actions = ["bell", "account"],
  className = "",
  locationLabel = "Near you",
  sticky = false,
  showToast,
}) {
  const handleActionClick = (action) => {
    if (action === "account") {
      window.location.href = "/profile";
      return;
    }

    if (action === "bell") {
      showToast?.({
        title: "Coming Soon",
        message: "This feature will be available soon",
        type: "info",
      });
    }
  };
  return (
    <header
      className={["app-header", sticky ? "app-header--sticky" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="app-header-location">
        <span className="app-header-location-icon">
          <HeaderIcon name="location" />
        </span>
        <span className="app-header-location-text">
          <small>Current location</small>
          <strong>{locationLabel}</strong>
        </span>
      </div>

      {actions.length > 0 && (
        <div className="app-header-actions">
          {actions.map((action) => (
            <button
              className="app-header-button"
              key={action}
              type="button"
              onClick={() => handleActionClick(action)}
              aria-label={
                action === "bell"
                  ? "Notifications"
                  : action === "account"
                    ? "Account"
                    : "Filter"
              }
            >
              <HeaderIcon name={action} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
