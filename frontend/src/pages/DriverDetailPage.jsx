import BottomNavigation from "../components/BottomNavigation";
import "./DriverDetailPage.css";

const driver = {
  name: "Budi Santoso",
  title: "Driver Profile",
  rating: "4.9",
  reviews: "1.2k+ Reviews",
  experience: "12+",
  trips: "15k",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCiwJ8xppUS-ZzS9UfxFOPW_EBmJqjjye5iZhYhV1NFcFY_Q8WNaaZHtvgAj7bDHVgSnjvRS0mPMyE8KltNFVVxB3yAtco8qDH59hq-1CiJoAaH4mJjDaCU2vS9Lm-io4Dsk8Gr-7YPTknVAr-gId7OS4oyil6U2ztWcr-iVUPaRYHyRCkg5Y8ZDa0tnZvk_o0CFDh5sldUB4oWXu7Srg2QFtayVNsD18glPqnXV7W0ZGL9855rndaSbjLHsVtb567FjLqY90rRv9w",
};

const reviews = [
  {
    name: "Regular Commuter",
    icon: "person",
    date: "2 days ago",
    rating: 5,
    text: "Very polite and drives smoothly. Makes the morning commute much less stressful. Always on time!",
  },
  {
    name: "Verified Passenger",
    icon: "shield",
    date: "5 days ago",
    rating: 5,
    text: "Punctual and helpful with directions. I was lost and Pak Budi explained the route very clearly.",
  },
  {
    name: "Frequent Traveler",
    icon: "walk",
    date: "1 week ago",
    rating: 4,
    text: "The bus was very clean and the AC was at a perfect temperature. Great driving skills through heavy traffic.",
  },
  {
    name: "Office Worker",
    icon: "briefcase",
    date: "2 weeks ago",
    rating: 5,
    text: "Consistently good service. Pak Budi is one of the reasons I prefer using BusMate over other apps.",
  },
];

function Icon({ name, filled = false }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    star: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    ),
    verified: (
      <>
        <path d="M9 12l2 2 4-5" />
        <path d="M12 2l2.7 2 3.3-.2 1 3.1 2.6 2.1-1.2 3 1.2 3-2.6 2.1-1 3.1-3.3-.2-2.7 2-2.7-2-3.3.2-1-3.1L2.4 15l1.2-3-1.2-3L5 6.9l1-3.1 3.3.2L12 2Z" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    walk: (
      <>
        <circle cx="13" cy="4" r="2" />
        <path d="M9 21l2-6-2-3 3-5 3 2 2 4" />
        <path d="M14 21v-5l-3-2" />
      </>
    ),
    briefcase: (
      <>
        <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
        <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
        <path d="M3 13h18" />
      </>
    ),
  };

  return (
    <svg
      className={`driver-detail-icon ${filled ? "filled" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Stars({ rating }) {
  return (
    <div className="driver-review-stars" aria-label={`${rating} star rating`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon filled={index < rating} key={index} name="star" />
      ))}
    </div>
  );
}

export default function DriverDetailPage() {
  return (
    <main className="driver-detail-page">
      <header className="driver-detail-header">
        <button
          className="driver-back-button"
          type="button"
          aria-label="Back to bus tracking"
          onClick={() => window.location.assign("/bus-tracking/05?sheet=collapsed")}
        >
          <Icon name="arrow_back" />
        </button>
        <h1>{driver.title}</h1>
      </header>

      <div className="driver-detail-content">
        <section className="driver-hero" aria-label="Driver profile summary">
          <div className="driver-avatar-large-wrap">
            <img src={driver.avatar} alt={`${driver.name} profile`} />
            <span className="driver-top-pro-badge">
              <Icon filled name="verified" />
              Top Pro
            </span>
          </div>

          <div className="driver-hero-copy">
            <h2>{driver.name}</h2>
            <div className="driver-rating-line">
              <Icon filled name="star" />
              <strong>{driver.rating}</strong>
              <span>({driver.reviews})</span>
            </div>
          </div>
        </section>

        <section className="driver-stat-grid" aria-label="Driver stats">
          <div className="driver-stat-card">
            <strong>{driver.experience}</strong>
            <span>Years Experience</span>
          </div>
          <div className="driver-stat-card">
            <strong>{driver.trips}</strong>
            <span>Trips Completed</span>
          </div>
          <div className="driver-stat-card">
            <Icon filled name="award" />
            <span>Safety Award</span>
          </div>
        </section>

        <section className="driver-reviews-section" aria-label="Recent reviews">
          <div className="driver-section-heading">
            <h2>Recent Reviews</h2>
            <button type="button">View All</button>
          </div>

          <div className="driver-reviews-list">
            {reviews.map((review) => (
              <article className="driver-review-card" key={review.name}>
                <div className="driver-review-header">
                  <div className="driver-review-author">
                    <span className="driver-review-avatar">
                      <Icon name={review.icon} />
                    </span>
                    <div>
                      <h3>{review.name}</h3>
                      <Stars rating={review.rating} />
                    </div>
                  </div>
                  <time>{review.date}</time>
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="driver-safety-callout">
          <span>
            <Icon filled name="verified" />
          </span>
          <div>
            <h2>Certified Safe</h2>
            <p>
              Pak Budi has completed over 500 hours of specialized safety
              training in 2024.
            </p>
          </div>
        </section>
      </div>

      <BottomNavigation currentPage="Routes" />
    </main>
  );
}
