import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Activity, Menu, User, LogOut, X, Trophy, Heart } from "lucide-react";
import type { AppDispatch, RootState } from "../../store";
import { logoutUser } from "../../features/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle scroll for dynamic header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside (simple window listener)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-900/30 bg-slate-950/85 backdrop-blur-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
            <Activity
              size={22}
              className="stroke-[2.5] relative z-10 animate-pulse"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Sportify<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 transition-colors"
                : "flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors"
            }
          >
            Leagues
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-1.5 text-rose-500 transition-colors"
                  : "flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              }
            >
              Favorites
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 group transition-all ${
                      isActive ? "text-blue-400" : "text-slate-400"
                    }`
                  }
                >
                  <div className="flex flex-col items-end leading-tight">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold">
                      Welcome back
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 overflow-hidden shadow-xl ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all">
                      {user?.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                          {user?.name ? (
                            getInitials(user.name)
                          ) : (
                            <User size={18} />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-slate-950" />
                  </div>
                </NavLink>

                <div className="w-px h-8 bg-slate-800/50 mx-1" />

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all flex items-center justify-center group"
                  title="Logout"
                >
                  <LogOut
                    size={20}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border border-blue-900/50 bg-slate-900/50 px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors text-slate-300"
              >
                <User size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-slate-300 p-2 rounded-lg hover:bg-slate-900/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#020617] h-screen animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 rounded-2xl border ${
                  isActive
                    ? "bg-blue-600/10 border-blue-500/30 text-blue-500"
                    : "bg-slate-900/40 border-slate-800 text-slate-400"
                }`
              }
            >
              <Trophy size={20} />
              <span className="font-semibold text-lg">Leagues</span>
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-4 rounded-2xl border ${
                      isActive
                        ? "bg-rose-600/10 border-rose-500/30 text-rose-500"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                    }`
                  }
                >
                  <Heart size={20} />
                  <span className="font-semibold text-lg">My Favorites</span>
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-4 rounded-2xl border ${
                      isActive
                        ? "bg-blue-600/10 border-blue-500/30 text-blue-500"
                        : "bg-slate-900/40 border-slate-800 text-slate-400"
                    }`
                  }
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold overflow-hidden">
                    {user?.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : user?.name ? (
                      getInitials(user.name)
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg">My Profile</span>
                    <span className="text-xs opacity-50">{user?.email}</span>
                  </div>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-red-950/20 border border-red-900/30 text-red-500 mt-4"
                >
                  <LogOut size={20} />
                  <span className="font-semibold text-lg">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 p-4 rounded-2xl bg-blue-600 text-white mt-4 shadow-lg shadow-blue-600/20"
              >
                <User size={20} />
                <span className="font-semibold text-lg">Login to Account</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
