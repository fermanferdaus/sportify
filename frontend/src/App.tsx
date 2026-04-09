import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import LeaguesPage from "./pages/leagues/LeaguesPage";
import TeamsPage from "./pages/teams/TeamsPage";
import TeamDetailPage from "./pages/teams/TeamDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import FavoritesPage from "./pages/favorite/FavoritesPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #1e293b",
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LeaguesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/leagues/:leagueName/teams" element={<TeamsPage />} />
          <Route
            path="/teams/:teamId/:leagueName?"
            element={<TeamDetailPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
