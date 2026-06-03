import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import "./PaymentMethodPage.css";

function Icon({ name }) {
  const paths = {
    arrow_back: <path d="M19 12H5M12 19l-7-7 7-7" />,
    remove: <path d="M5 12h14" />,
    add: <path d="M12 5v14M5 12h14" />,
    account_balance_wallet: (
      <>
        <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
        <path d="M16 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </>
    ),
    qr_code_2: (
      <>
        <rect x="3" y="3" width="8" height="8" />
        <rect x="13" y="3" width="8" height="8" />
        <rect x="3" y="13" width="8" height="8" />
        <path d="M13 13h8M13 21h8M21 13v8" />
      </>
    ),
    lock: (
      <>
        <path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Z" />
        <circle cx="12" cy="16" r="1" />
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

function PaymentOptionTrailing({ isSelected, status }) {
  if (isSelected) {
    return (
      <div className="payment-radio checked" aria-hidden="true">
        <div className="payment-radio-dot" />
      </div>
    );
  }

  if (status) {
    return <span className="payment-option-status">{status}</span>;
  }

  return <div className="payment-radio" aria-hidden="true" />;
}

export default function PaymentMethodPage() {
  const [quantity, setQuantity] = useState(2);
  const [selectedPayment, setSelectedPayment] = useState("qris");

  const ticketPrice = 5000;
  const totalAmount = ticketPrice * quantity;

  return (
    <main className="payment-method-page">
      {/* Top Navigation Bar */}
      <header className="payment-header">
        <button
          className="payment-back-button"
          type="button"
          onClick={() => window.location.assign("/routes")}
        >
          <Icon name="arrow_back" />
        </button>
        <h1>Payment Method</h1>
      </header>

      {/* Main Content */}
      <div className="payment-main-content">
        {/* Summary Section */}
        <section className="payment-summary-section">
          <div className="payment-summary-card">
            <div className="payment-summary-header">
              <span className="payment-label">Ticket Summary</span>
              <h2 className="payment-title">Campus Bus</h2>
              <div className="payment-bus-info">Bus ID: B-204 • No. 12A</div>
            </div>

            {/* Quantity Control */}
            <div className="payment-quantity-control">
              <span className="payment-quantity-label">Quantity</span>
              <div className="payment-quantity-buttons">
                <button
                  className="payment-qty-btn payment-qty-minus"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Icon name="remove" />
                </button>
                <span className="payment-qty-value">{quantity}</span>
                <button
                  className="payment-qty-btn payment-qty-plus"
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="add" />
                </button>
              </div>
            </div>

            {/* Total Amount */}
            <div className="payment-total-section">
              <span className="payment-total-label">Total Amount</span>
              <span className="payment-total-amount">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section className="payment-options-section">
          <h3 className="payment-options-title">Select Payment Method</h3>
          <div className="payment-options-list">
            {/* GoPay */}
            <button
              className={`payment-option ${selectedPayment === "gopay" ? "active" : ""}`}
              type="button"
              onClick={() => setSelectedPayment("gopay")}
            >
              <div className="payment-option-left">
                <div className="payment-option-icon gopay-icon">
                  <Icon name="account_balance_wallet" />
                </div>
                <span className="payment-option-name">GoPay</span>
              </div>
              <PaymentOptionTrailing
                isSelected={selectedPayment === "gopay"}
                status="Linked"
              />
            </button>

            {/* OVO */}
            <button
              className={`payment-option ${selectedPayment === "ovo" ? "active" : ""}`}
              type="button"
              onClick={() => setSelectedPayment("ovo")}
            >
              <div className="payment-option-left">
                <div className="payment-option-icon ovo-icon">
                  <Icon name="account_balance_wallet" />
                </div>
                <span className="payment-option-name">OVO</span>
              </div>
              <PaymentOptionTrailing
                isSelected={selectedPayment === "ovo"}
                status="Link Account"
              />
            </button>

            {/* QRIS */}
            <button
              className={`payment-option ${selectedPayment === "qris" ? "active" : ""}`}
              type="button"
              onClick={() => setSelectedPayment("qris")}
            >
              <div className="payment-option-left">
                <div className="payment-option-icon qris-icon">
                  <Icon name="qr_code_2" />
                </div>
                <span className="payment-option-name">QRIS</span>
              </div>
              <PaymentOptionTrailing isSelected={selectedPayment === "qris"} />
            </button>
          </div>
        </section>

        {/* Security Note */}
        <section className="payment-security-note">
          <Icon name="lock" />
          <span>Secure 256-bit SSL Encrypted Payment</span>
        </section>
      </div>

      {/* Pay Now Button */}
      <div className="payment-action-container">
        <button className="payment-button-pay" type="button">
          PAY NOW
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="Tickets" />
    </main>
  );
}
