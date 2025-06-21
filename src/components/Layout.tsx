
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "@/contexts/TranslationContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.home'), to: "/" },
    { name: t('nav.selfAssessment'), to: "/self-assessment" },
    { name: t('nav.assessment'), to: "/assessment" },
    { name: t('nav.courses'), to: "/continue-learning" },
    { name: t('nav.dashboard'), to: "/dashboard" },
  ];

  // Handle logout and optionally redirect to home/login page
  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
    navigate("/login");
  };

  const handleMobileNavClick = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  useEffect(() => {
    if (loading || !user) {
      setIsAdmin(false);
      return;
    }
    const checkRole = async () => {
      try {
        // Check for both 'admin' and 'super_admin'
        const { data: isAdminData } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
        const { data: isSuperAdminData } = await supabase.rpc("has_role", { _user_id: user.id, _role: "super_admin" });
        setIsAdmin(Boolean(isAdminData) || Boolean(isSuperAdminData));
      } catch {
        setIsAdmin(false);
      }
    };
    checkRole();
  }, [user, loading]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <header className="flex items-center justify-between px-4 md:px-8 py-4 shadow bg-white sticky top-0 z-30">
        <div className="flex items-center gap-2 font-bold text-primary text-2xl">
          <span role="img" aria-label="book">📘</span>
          {t('header.title')}
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
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
              {t('nav.manageCourses')}
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/api-keys"
              className={`text-base font-semibold hover:text-primary transition ${
                location.pathname === "/admin/api-keys" ? "underline text-primary" : "text-foreground"
              }`}
            >
              {t('nav.apiKeys')}
            </Link>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DrawerTrigger asChild>
              <button className="p-2">
                <Menu className="w-6 h-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t('nav.menu')}</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                {navItems.map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleMobileNavClick(item.to)}
                    className={`block w-full text-left text-base font-semibold py-2 px-4 rounded transition ${
                      location.pathname === item.to ? "bg-primary text-white" : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                {isAdmin && (
                  <button
                    onClick={() => handleMobileNavClick("/admin/courses")}
                    className={`block w-full text-left text-base font-semibold py-2 px-4 rounded transition ${
                      location.pathname === "/admin/courses" ? "bg-primary text-white" : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {t('nav.manageCourses')}
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleMobileNavClick("/admin/api-keys")}
                    className={`block w-full text-left text-base font-semibold py-2 px-4 rounded transition ${
                      location.pathname === "/admin/api-keys" ? "bg-primary text-white" : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {t('nav.apiKeys')}
                  </button>
                )}
                <div className="border-t pt-4">
                  <LanguageToggle />
                </div>
                <div className="border-t pt-4">
                  {loading ? (
                    <span className="text-base text-muted-foreground px-4 py-2 block">{t('auth.loading')}</span>
                  ) : user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2">
                        <div className="font-bold">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-destructive flex items-center gap-2 px-4 py-2 rounded hover:bg-accent transition"
                        disabled={loggingOut}
                      >
                        <LogOut className="w-4 h-4" /> {t('auth.logout')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleMobileNavClick("/login")}
                      className="w-full text-left text-base font-semibold px-4 py-2 bg-primary text-white rounded"
                    >
                      {t('auth.login')}
                    </button>
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop Auth and Language Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          {/* Auth button or menu */}
          {loading ? (
            <span className="text-base text-muted-foreground px-4 py-1 rounded animate-pulse">{t('auth.loading')}</span>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-base font-semibold px-4 py-1 bg-primary text-white rounded shadow hover:scale-105 hover:bg-[#1277a8] transition focus:outline-none">
                  {user.firstName || user.email || t('auth.account')}
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
                  <LogOut className="w-4 h-4 mr-2" /> {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="text-base font-semibold px-4 py-1 bg-primary text-white rounded shadow hover:scale-105 hover:bg-[#1277a8] transition">
              {t('auth.login')}
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full p-6">{children}</main>
      <footer className="text-center text-xs text-muted-foreground py-4 bg-secondary">
        {t('footer.text')} &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
