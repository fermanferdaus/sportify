import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-600/30">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
