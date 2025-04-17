
import { useLocation, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 transition-colors duration-300">
      <div className="text-center max-w-md animate-fade-in">
        <div className="bg-card p-8 rounded-lg shadow-sm border border-border mb-8 transition-all duration-300 hover:shadow-md">
          <FileQuestion className="h-16 w-16 text-primary mx-auto mb-6 animate-bounce-in" />
          <h1 className="text-4xl font-bold text-foreground mb-3">404</h1>
          <p className="text-xl text-foreground mb-8">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <NavLink to="/">
            <Button className="w-full gap-2 animate-scale-in">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </NavLink>
        </div>
        <p className="text-muted-foreground text-sm">
          Interview Spark Hub | HR Dashboard
        </p>
      </div>
    </div>
  );
};

export default NotFound;
