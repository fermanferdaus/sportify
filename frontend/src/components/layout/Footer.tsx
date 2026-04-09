import { Activity } from "lucide-react";
import { Instagram, Twitter, Github } from "../ui/BrandIcons";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <footer className="relative border-t border-slate-800/50 bg-[#020617] pt-16 pb-8 mt-20 overflow-hidden">
      {/* Background glow in footer */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Activity size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Sportify<span className="text-blue-500">.</span>
              </span>
            </div>
            <p className="max-w-xs text-slate-400 leading-relaxed">
              The ultimate destination for global soccer enthusiasts. Track
              leagues, discover teams, and stay updated with premium sports
              data.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.instagram.com/fermanferdaus_"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://github.com/fermanferdaus"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Leagues
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/favorites"
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      My Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">
              Platform
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  API Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 font-medium">
            &copy; 2026 Sportify by Ferman Ferdaus. Built for elite fans.
          </p>
          <div className="text-xs text-slate-600 flex items-center gap-2">
            Data provided by{" "}
            <a
              href="https://www.thesportsdb.com"
              className="text-blue-500/50 hover:text-blue-500 transition-colors"
            >
              TheSportsDB API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
