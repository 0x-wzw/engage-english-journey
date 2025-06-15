import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Self Assessment", to: "/self-assessment" },
  { name: "Assessment", to: "/assessment" },
  { name: "Courses", to: "/continue-learning" },
  { name: "Dashboard", to: "/dashboard" },
  // Admin link, only shown for admins
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle logout and optionally redirect to home/login page
  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/login");
  };

  useEffect(() => {
    if (loading || !user) {
      setIsAdmin(false);
      return;
    }
    const checkRole = async () => {
      try {
        const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
        setIsAdmin(!!data);
      } catch {
        setIsAdmin(false);
      }
    };
    checkRole();
  }, [user, loading]);

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
          {isAdmin && (
            <Link
              to="/admin/courses"
              className={`text-base font-semibold hover:text-primary transition ${
                location.pathname === "/admin/courses" ? "underline text-primary" : "text-foreground"
              }`}
            >
              Manage Courses
            </Link>
          )}
        </nav>
        {/* Auth button or menu */}
        {loading ? (
          <span className="text-base text-muted-foreground px-4 py-1 rounded animate-pulse">Loading...</span>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-base font-semibold px-4 py-1 bg-primary text-white rounded shadow hover:scale-105 hover:bg-[#1277a8] transition focus:outline-none">
                {user.firstName || user.email || "Account"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>
                <div>
                  <div className="font-bold">{user.firstName} {user.lastName}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive flex items-center gap-2 cursor-pointer"
                disabled={loggingOut}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login" className="text-base font-semibold px-4 py-1 bg-primary text-white rounded shadow hover:scale-105 hover:bg-[#1277a8] transition">
            Login
          </Link>
        )}
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">{children}</main>
      <footer className="text-center text-xs text-muted-foreground py-4 bg-secondary">
        Made with ❤️ for learners everywhere. &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
