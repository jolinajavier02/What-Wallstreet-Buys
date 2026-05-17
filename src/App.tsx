import OwnerDashboard from "./pages/OwnerDashboard";
import UserView from "./pages/UserView";

export default function App() {
  const path = window.location.pathname;
  const isOwner = path.startsWith("/owner");

  return isOwner ? <OwnerDashboard /> : <UserView />;
}
