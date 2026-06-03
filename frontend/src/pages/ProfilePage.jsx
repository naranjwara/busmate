import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import "./ProfilePage.css";

function Icon({ name }) {
  const paths = {
    edit: <path d="M12 2l3 3M3 20h18v1H3M5 17l10-10M7 19h10" />,
    emoji_events: (
      <>
        <path d="M12 1c6.6 0 11 4.4 11 11s-4.4 11-11 11S1 18.6 1 12 5.4 1 12 1Z" />
        <path d="M12 5v7l5 3" />
      </>
    ),
    arrow_forward: <path d="M5 12h14M12 5l7 7-7 7" />,
    history: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    account_balance_wallet: (
      <>
        <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
        <path d="M16 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </>
    ),
    chevron_right: <path d="M10 6l6 6-6 6" />,
    data_usage: (
      <>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" />
        <path d="M12 4v8M7.5 11.5a4.5 4.5 0 0 1 9 0" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    notifications: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 6-3 8h18c0-2-3-1-3-8" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    chat: (
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    ),
    open_in_new: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L20 4" />
      </>
    ),
    star: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    ),
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
    <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function ProfilePage() {
  const [toggles, setToggles] = useState({
    dataSaving: true,
    offlineMaps: false,
    pushNotifications: true,
  });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const userName = "Dina";
  const userEmail = "dina@example.com";
  const userPoints = "1,250";
  const appVersion = "v2.4.0";

  return (
    <main className="profile-page">
      <div className="profile-content">
        {/* Profile Header */}
        <section className="profile-header">
          <div className="profile-avatar-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUWADtwEiSueTWlfjnTNaCYOzVO9f74EdJH-NZXJeYIVdEoUBVHPVmpiSegkGsebqYki8HYtftZeWlYZ1FLBAbyb_-6a6QIU-3UOrVwmabzDWoKW2zR5PEFSEQQlEnS-XN3VO0XOVcy9bQP2GnNrAlGW7cgCPQp-h0-gUVi11ZJ-5FRlzcprjy43zd3lHNz858obA5BmbP26Lfxk7fAVL-IlOy6is2w4BYae_HlNoZkT4q5gsj88scgg4RYeNwhoFJmQsO8OlzzOM"
              alt={userName}
              className="profile-avatar"
            />
            <button className="profile-edit-button" type="button">
              <Icon name="edit" />
            </button>
          </div>
          <h1 className="profile-name">{userName}</h1>
          <p className="profile-email">{userEmail}</p>
        </section>

        {/* Rewards & Loyalty Section */}
        <section className="profile-section rewards-section">
          <div className="rewards-card">
            <div className="rewards-content">
              <div>
                <p className="rewards-label">My Points</p>
                <h2 className="rewards-amount">{userPoints}</h2>
              </div>
              <div className="rewards-icon">
                <Icon name="emoji_events" />
              </div>
            </div>
            <button className="redeem-button" type="button">
              Redeem Vouchers
              <Icon name="arrow_forward" />
            </button>
          </div>
        </section>

        {/* Activity & Payments */}
        <section className="profile-section">
          <h3 className="section-title">Activity & Payments</h3>
          <div className="profile-list">
            <button className="profile-list-item" type="button">
              <div className="profile-list-icon">
                <Icon name="history" />
              </div>
              <div className="profile-list-content">
                <p className="profile-list-title">Travel History</p>
                <p className="profile-list-subtitle">View your last 30 trips</p>
              </div>
              <Icon name="chevron_right" />
            </button>
            <button className="profile-list-item" type="button">
              <div className="profile-list-icon">
                <Icon name="account_balance_wallet" />
              </div>
              <div className="profile-list-content">
                <p className="profile-list-title">Payment Methods</p>
                <p className="profile-list-subtitle">GoPay, OVO, QRIS</p>
              </div>
              <Icon name="chevron_right" />
            </button>
          </div>
        </section>

        {/* Settings Section */}
        <section className="profile-section">
          <h3 className="section-title">Settings</h3>
          <div className="profile-list">
            <div className="profile-toggle-item">
              <div className="profile-toggle-content">
                <div className="profile-list-icon">
                  <Icon name="data_usage" />
                </div>
                <p className="profile-list-title">Data Saving Mode</p>
              </div>
              <button
                className={`profile-toggle ${toggles.dataSaving ? "active" : ""}`}
                type="button"
                onClick={() => toggleSwitch("dataSaving")}
              >
                <div className="toggle-knob" />
              </button>
            </div>
            <div className="profile-toggle-item">
              <div className="profile-toggle-content">
                <div className="profile-list-icon">
                  <Icon name="map" />
                </div>
                <p className="profile-list-title">Offline Maps</p>
              </div>
              <button
                className={`profile-toggle ${toggles.offlineMaps ? "active" : ""}`}
                type="button"
                onClick={() => toggleSwitch("offlineMaps")}
              >
                <div className="toggle-knob" />
              </button>
            </div>
            <div className="profile-toggle-item">
              <div className="profile-toggle-content">
                <div className="profile-list-icon">
                  <Icon name="notifications" />
                </div>
                <p className="profile-list-title">Push Notifications</p>
              </div>
              <button
                className={`profile-toggle ${toggles.pushNotifications ? "active" : ""}`}
                type="button"
                onClick={() => toggleSwitch("pushNotifications")}
              >
                <div className="toggle-knob" />
              </button>
            </div>
          </div>
        </section>

        {/* Support & Feedback */}
        <section className="profile-section">
          <h3 className="section-title">Support & Feedback</h3>
          <div className="profile-list">
            <button className="profile-list-item" type="button">
              <div className="profile-list-icon">
                <Icon name="chat" />
              </div>
              <div className="profile-list-content">
                <p className="profile-list-title">Customer Support Chat</p>
              </div>
              <Icon name="open_in_new" />
            </button>
            <button className="profile-list-item" type="button">
              <div className="profile-list-icon">
                <Icon name="star" />
              </div>
              <div className="profile-list-content">
                <p className="profile-list-title">View My Reviews</p>
              </div>
              <Icon name="chevron_right" />
            </button>
          </div>
        </section>

        {/* Sign Out */}
        <section className="profile-section signout-section">
          <button className="signout-button" type="button">
            Sign Out
          </button>
          <p className="app-version">BusMate {appVersion}</p>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="Profile" />
    </main>
  );
}
