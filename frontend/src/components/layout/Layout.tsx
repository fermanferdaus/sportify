import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ClickSpark from "../ui/ClickSpark";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <ClickSpark sparkColor="#3b82f6" sparkCount={10} sparkRadius={20} duration={600}>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-600/30 overflow-x-hidden">
        {!isAuthPage && <Header />}

        {/* Main Content */}
        <main className={!isAuthPage ? "container mx-auto px-4 sm:px-6" : ""}>
          <Outlet />
        </main>

        {!isAuthPage && <Footer />}
      </div>
    </ClickSpark>
  );
};

export default Layout;
