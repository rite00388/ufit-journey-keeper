
import { Link } from "react-router-dom";
import { Activity, BarChart3, Droplet, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/UserContext";

const Index = () => {
  const { isAuthenticated } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="font-medium tracking-tight text-ufit-primary">
                Your personalized
                <span className="block text-ufit-accent">fitness journey</span>
                starts here
              </h1>
              <p className="text-lg text-ufit-secondary max-w-2xl">
                Track your progress, calculate your BMI, discover new exercises, follow diet plans, and monitor your water intake all in one place.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button className="ufit-button-primary">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button className="ufit-button-primary">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="ufit-button-secondary">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0 max-w-md mx-auto md:max-w-none">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-ufit-accent/20 rounded-full animate-pulse-light"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-ufit-accent/10 rounded-full animate-pulse-light" style={{ animationDelay: "1s" }}></div>
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Fitness Tracker"
                  className="rounded-xl shadow-lg object-cover h-[400px] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 bg-ufit-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-ufit-primary mb-4">
              Everything you need for your fitness journey
            </h2>
            <p className="text-ufit-secondary max-w-2xl mx-auto">
              ufit provides all the tools you need to track your progress, stay healthy and achieve your fitness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* BMI Calculator */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">BMI Calculator</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Calculate your Body Mass Index and track your progress over time.
              </p>
              <Link to={isAuthenticated ? "/bmi-calculator" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  Check your BMI
                </Button>
              </Link>
            </div>

            {/* Exercise Library */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">Exercise Library</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Discover a variety of exercises for all fitness levels with detailed instructions.
              </p>
              <Link to={isAuthenticated ? "/exercises" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  Browse exercises
                </Button>
              </Link>
            </div>

            {/* Diet Plan */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <UtensilsCrossed className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">Diet Plan</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Access healthy meal recipes and nutrition information to complement your workout.
              </p>
              <Link to={isAuthenticated ? "/diet-plan" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  Explore diet plans
                </Button>
              </Link>
            </div>

            {/* Calorie Tracker */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">Calorie Tracker</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Monitor your daily calorie intake and calories burned to maintain a healthy balance.
              </p>
              <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  Track calories
                </Button>
              </Link>
            </div>

            {/* Water Intake */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <Droplet className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">Water Intake</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Track your daily water consumption and get reminded to stay hydrated.
              </p>
              <Link to={isAuthenticated ? "/water-tracker" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  Track water intake
                </Button>
              </Link>
            </div>

            {/* Personalized Dashboard */}
            <div className="ufit-card flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-ufit-accent/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-ufit-accent" />
              </div>
              <h3 className="text-xl font-medium text-ufit-primary mb-2">Personalized Dashboard</h3>
              <p className="text-ufit-secondary flex-1 mb-6">
                Access all your fitness and nutrition data in one convenient place.
              </p>
              <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                <Button variant="outline" className="w-full justify-start">
                  View dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-ufit-accent/90 to-ufit-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-6">Start your fitness journey today</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have transformed their lives with ufit. It's time to take control of your health and fitness.
          </p>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button className="bg-white text-ufit-accent hover:bg-white/90 ufit-button">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button className="bg-white text-ufit-accent hover:bg-white/90 ufit-button">
                Get Started for Free
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-ufit-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Activity className="h-8 w-8 text-ufit-accent" />
              <span className="text-2xl font-semibold">ufit</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-12 space-y-6 md:space-y-0 text-center md:text-left">
              <div>
                <h3 className="text-lg font-medium mb-3">Features</h3>
                <ul className="space-y-2 text-white/70">
                  <li>BMI Calculator</li>
                  <li>Diet Plan</li>
                  <li>Exercise Library</li>
                  <li>Water Tracking</li>
                  <li>Calorie Tracking</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Resources</h3>
                <ul className="space-y-2 text-white/70">
                  <li>Blog</li>
                  <li>Guides</li>
                  <li>Support</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Company</h3>
                <ul className="space-y-2 text-white/70">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            &copy; {new Date().getFullYear()} ufit. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
