
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Calendar, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CalorieTracker from "@/components/CalorieTracker";
import WaterIntake from "@/components/WaterIntake";
import { useUser } from "@/components/UserContext";

const Dashboard = () => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Format today's date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    setDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  // Quick stats data
  const quickStats = [
    { 
      label: "Current BMI", 
      value: "23.4", 
      status: "Healthy",
      color: "text-green-500",
      url: "/bmi-calculator"
    },
    { 
      label: "Weekly Exercise", 
      value: "3", 
      status: "days",
      color: "text-ufit-accent",
      url: "/exercises"
    },
    { 
      label: "Water Streak", 
      value: "5", 
      status: "days",
      color: "text-blue-500",
      url: "/water-tracker"
    },
  ];

  // Featured exercises
  const featuredExercises = [
    {
      id: "1",
      title: "Morning Stretch Routine",
      duration: "15 min",
      difficulty: "beginner",
      imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "HIIT Cardio Workout",
      duration: "30 min",
      difficulty: "intermediate",
      imageUrl: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Full Body Strength",
      duration: "45 min",
      difficulty: "advanced",
      imageUrl: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Meal suggestions
  const mealSuggestions = [
    {
      id: "1",
      title: "Protein Breakfast Bowl",
      type: "Breakfast",
      calories: 350,
      imageUrl: "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      title: "Grilled Chicken Salad",
      type: "Lunch",
      calories: 420,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      title: "Baked Salmon & Veggies",
      type: "Dinner",
      calories: 480,
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-ufit-light/50">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-ufit-muted">{date}</p>
              <h1 className="text-2xl md:text-3xl font-medium text-ufit-primary">
                {greeting}, {user?.name}
              </h1>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <Link to={stat.url} key={index} className="ufit-card flex items-center p-4">
                <div className="flex-1">
                  <p className="text-ufit-muted text-sm">{stat.label}</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-medium text-ufit-primary">{stat.value}</h3>
                    <p className={`${stat.color}`}>{stat.status}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-ufit-muted" />
              </Link>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Calorie Tracker */}
            <div className="lg:col-span-2">
              <CalorieTracker />
            </div>

            {/* Right Column - Water Intake */}
            <div>
              <WaterIntake />
            </div>
          </div>

          {/* Featured Exercises */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-ufit-primary">Featured Exercises</h2>
              <Link to="/exercises">
                <Button variant="ghost" className="text-ufit-accent">
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredExercises.map((exercise) => (
                <Link to={`/exercises`} key={exercise.id}>
                  <div className="ufit-card p-0 overflow-hidden">
                    <div className="relative h-36">
                      <img 
                        src={exercise.imageUrl} 
                        alt={exercise.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <span className="text-xs font-medium px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-ufit-primary">{exercise.title}</h3>
                      <div className="flex items-center text-sm text-ufit-muted mt-1">
                        <Dumbbell className="h-4 w-4 mr-1" />
                        {exercise.duration}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Meal Suggestions */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-ufit-primary">Meal Suggestions</h2>
              <Link to="/diet-plan">
                <Button variant="ghost" className="text-ufit-accent">
                  View all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mealSuggestions.map((meal) => (
                <Link to={`/diet-plan`} key={meal.id}>
                  <div className="ufit-card p-0 overflow-hidden">
                    <div className="relative h-36">
                      <img 
                        src={meal.imageUrl} 
                        alt={meal.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <span className="text-xs font-medium px-2 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                          {meal.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-ufit-primary">{meal.title}</h3>
                      <div className="flex items-center text-sm text-ufit-muted mt-1">
                        <UtensilsCrossed className="h-4 w-4 mr-1" />
                        {meal.calories} calories
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-ufit-primary">Upcoming Workouts</h2>
              <Button variant="ghost" className="text-ufit-accent">
                Add Workout
              </Button>
            </div>
            <div className="ufit-card">
              <div className="flex flex-col divide-y">
                <div className="flex items-center py-4">
                  <div className="h-12 w-12 rounded-full bg-ufit-accent/10 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-ufit-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-ufit-primary">Morning Yoga</h3>
                    <p className="text-sm text-ufit-muted">Tomorrow, 7:00 AM</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center py-4">
                  <div className="h-12 w-12 rounded-full bg-ufit-accent/10 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-ufit-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-ufit-primary">HIIT Workout</h3>
                    <p className="text-sm text-ufit-muted">Thursday, 6:30 PM</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center py-4">
                  <div className="h-12 w-12 rounded-full bg-ufit-accent/10 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-ufit-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-ufit-primary">Weekend Run</h3>
                    <p className="text-sm text-ufit-muted">Saturday, 9:00 AM</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
