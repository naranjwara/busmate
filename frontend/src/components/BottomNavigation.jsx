import "./BottomNavigation.css";

const navItems = [
  { label: "Home", icon: "home", href: "/dashboard" },
  { label: "Routes", icon: "bus", href: "/routes" },
  { label: "Tickets", icon: "ticket", href: "/tickets" },
  { label: "Profile", icon: "profile", href: "/profile" },
];

function Icon({ name }) {
  const paths = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h4a5 5 0 0 1 0 10H8" />
      </>
    ),
    bus: (
      <>
        <path d="M6 4h12a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" />
        <path d="M6 8h12" />
        <path d="M7 14h.01" />
        <path d="M17 14h.01" />
        <path d="M7 19v2" />
        <path d="M17 19v2" />
      </>
    ),
    ticket: (
      <>
        <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 1 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 1 0 0-4V7Z" />
        <path d="M13 5v14" />
      </>
    ),
    profile: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };

  return (
    <svg className="bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function BottomNavigation({ currentPage }) {
  return (
    <nav className="bottom-navigation" aria-label="Main navigation">
      {navItems.map((item) => (
        <a
          className={
            currentPage === item.label ? "nav-link active" : "nav-link"
          }
          href={item.href}
          key={item.label}
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
