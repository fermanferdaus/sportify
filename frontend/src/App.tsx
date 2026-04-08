import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LeaguesPage from "./pages/leagues/LeaguesPage";
import TeamsPage from "./pages/teams/TeamsPage";
import TeamDetailPage from "./pages/teams/TeamDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import FavoritesPage from "./pages/favorite/FavoritesPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
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
        <Route path="/teams/:leagueName/:teamId" element={<TeamDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
