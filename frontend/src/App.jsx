import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoutesPage from "./pages/RoutesPage";
import RouteDetailPage from "./pages/RouteDetailPage";
import BusTrackingPage from "./pages/BusTrackingPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProfilePage from "./pages/ProfilePage";
import TicketMenuPage from "./pages/TicketMenuPage";
import { isAuthenticated } from "./utils/auth";
import "./App.css";

function App() {
  const currentPath = window.location.pathname.toLowerCase();
  const isPublicPath = currentPath === "/login" || currentPath === "/register";

  // Handle root path
  if (currentPath === "/" || currentPath === "") {
    if (isAuthenticated()) {
      window.location.replace("/dashboard");
    } else {
      window.location.replace("/login");
    }
    return null;
  }

  if (!isPublicPath && !isAuthenticated()) {
    window.location.replace("/login");
    return null;
  }

  if (currentPath === "/login") {
    if (isAuthenticated()) {
      window.location.replace("/dashboard");
      return null;
    }

    return <LoginPage />;
  }

  if (currentPath === "/register") {
    if (isAuthenticated()) {
      window.location.replace("/dashboard");
      return null;
    }

    return <RegisterPage />;
  }

  if (currentPath === "/dashboard") {
    return <DashboardPage />;
  }

  if (currentPath === "/routes") {
    return <RoutesPage />;
  }

  if (currentPath.startsWith("/routes/")) {
    return <RouteDetailPage />;
  }

  if (currentPath === "/bus-tracking") {
    return <BusTrackingPage />;
  }

  if (currentPath === "/payment-method") {
    return <PaymentMethodPage />;
  }

  if (currentPath === "/profile") {
    return <ProfilePage />;
  }

  if (currentPath === "/tickets") {
    return <TicketMenuPage />;
  }

  return <RegisterPage />;
}

export default App;
