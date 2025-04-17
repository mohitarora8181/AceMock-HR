
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { 
  Plus, 
  LayoutDashboard, 
  Users, 
  Settings,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "./ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { 
      label: "Dashboard", 
      path: "/", 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      label: "Students", 
      path: "/students", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      label: "Settings", 
      path: "/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-card border-r border-border transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary">AceMock - HR</h1>
        </div>

        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto">
            <NavLink to="/create-interview">
              <Button className="w-full gap-2 animate-fade-in">
                <Plus className="h-4 w-4" />
                Create Interview
              </Button>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card transition-colors duration-300">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="ml-3 text-lg font-bold text-primary">Interview Spark Hub</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm text-muted-foreground">HR Dashboard</div>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 z-50 bg-background animate-fade-in">
            <div className="flex justify-between items-center h-16 px-6 border-b border-border">
              <h1 className="text-xl font-bold text-primary">Interview Spark Hub</h1>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={({isActive}) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <Separator className="my-4" />
              <NavLink to="/create-interview" onClick={toggleMobileMenu}>
                <Button className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Create Interview
                </Button>
              </NavLink>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
