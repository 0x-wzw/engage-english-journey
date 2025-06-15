
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Self Assessment", to: "/self-assessment" },
  { name: "Assessment", to: "/assessment" },
  { name: "Dashboard", to: "/dashboard" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <header className="flex items-center justify-between px-8 py-4 shadow bg-white sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-primary text-2xl">
          <span role="img" aria-label="book">📘</span>
          Learn English, Relaxed
        </div>
        <nav className="flex gap-6">
          {navItems.map(item => (
            <Link
              key={item.name}
              className={`text-base font-semibold hover:text-primary transition ${
                location.pathname === item.to ? "underline text-primary" : "text-foreground"
              }`}
              to={item.to}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Link to="/login" className="text-base font-semibold px-4 py-1 bg-primary text-white rounded shadow hover:scale-105 hover:bg-[#1277a8] transition">
          Login
        </Link>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">{children}</main>
      <footer className="text-center text-xs text-muted-foreground py-4 bg-secondary">
        Made with ❤️ for learners everywhere. &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
