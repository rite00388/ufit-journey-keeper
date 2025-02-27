
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "./UserContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Change navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "BMI Calculator", path: "/bmi-calculator" },
    { name: "Diet Plan", path: "/diet-plan" },
    { name: "Exercises", path: "/exercises" },
    { name: "Water Tracker", path: "/water-tracker" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="ufit Logo"
          >
            <Activity className="w-8 h-8 text-ufit-accent" />
            <span className="text-xl font-semibold text-ufit-primary">
              ufit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive(link.path)
                        ? "text-ufit-accent"
                        : "text-ufit-secondary hover:text-ufit-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-ufit-secondary hover:bg-ufit-light"
                  >
                    <span className="font-medium text-sm">
                      Hi, {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-ufit-secondary hover:text-ufit-primary hover:bg-ufit-light"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-ufit-accent hover:bg-ufit-accent/90 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-ufit-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-3 bg-white rounded-lg shadow-lg">
              {isAuthenticated && (
                <>
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive(link.path)
                          ? "bg-ufit-accent/10 text-ufit-accent"
                          : "text-ufit-secondary hover:bg-ufit-light hover:text-ufit-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-ufit-secondary hover:bg-ufit-light hover:text-ufit-primary mt-2 border-t border-gray-100 pt-3"
                  >
                    Logout
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-base font-medium text-ufit-secondary hover:bg-ufit-light hover:text-ufit-primary"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-base font-medium bg-ufit-accent text-white hover:bg-ufit-accent/90 text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
