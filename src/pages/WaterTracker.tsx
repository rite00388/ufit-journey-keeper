
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplet, Plus, Minus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import WaterIntake from "@/components/WaterIntake";
import Navbar from "@/components/Navbar";

const WaterTracker = () => {
  const [waterGoal, setWaterGoal] = useState(2000); // ml
  const [waterIntake, setWaterIntake] = useState(0); // ml
  const [intakeHistory, setIntakeHistory] = useState<{ time: Date; amount: number }[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedWaterGoal = localStorage.getItem("waterGoal");
    const savedWaterIntake = localStorage.getItem("waterIntake");
    const savedIntakeHistory = localStorage.getItem("intakeHistory");

    if (savedWaterGoal) setWaterGoal(parseInt(savedWaterGoal));
    if (savedWaterIntake) setWaterIntake(parseInt(savedWaterIntake));
    if (savedIntakeHistory) setIntakeHistory(JSON.parse(savedIntakeHistory));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("waterGoal", waterGoal.toString());
    localStorage.setItem("waterIntake", waterIntake.toString());
    localStorage.setItem("intakeHistory", JSON.stringify(intakeHistory));
  }, [waterGoal, waterIntake, intakeHistory]);

  const addWater = (amount: number) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    setIntakeHistory([...intakeHistory, { time: new Date(), amount }]);
    
    if (newIntake >= waterGoal && waterIntake < waterGoal) {
      toast({
        title: "Daily Goal Achieved! 🎉",
        description: "You've reached your daily water intake goal!",
      });
    }
  };

  const resetWaterIntake = () => {
    setWaterIntake(0);
    setIntakeHistory([]);
    toast({
      title: "Water Intake Reset",
      description: "Your water intake has been reset to 0ml.",
    });
  };

  const updateWaterGoal = (newGoal: number) => {
    if (newGoal >= 500 && newGoal <= 5000) {
      setWaterGoal(newGoal);
      toast({
        title: "Water Goal Updated",
        description: `Your daily water goal is now ${newGoal}ml.`,
      });
    }
  };

  const percentComplete = Math.min(Math.round((waterIntake / waterGoal) * 100), 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold text-ufit-primary mb-8">Water Tracker</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Droplet className="mr-2 text-blue-500" size={24} />
              Daily Water Intake
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {waterIntake}ml / {waterGoal}ml
                </span>
                <span className="text-sm font-medium">{percentComplete}%</span>
              </div>
              <Progress 
                value={percentComplete} 
                className="h-3 bg-blue-100" 
                style={{ 
                  backgroundColor: "#e0f2fe", 
                  "--tw-bg-opacity": 0.7,
                }}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Button 
                variant="outline" 
                className="border-blue-200 hover:bg-blue-50"
                onClick={() => addWater(250)}
              >
                +250ml
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 hover:bg-blue-50"
                onClick={() => addWater(500)}
              >
                +500ml
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-200 hover:bg-blue-50"
                onClick={() => addWater(1000)}
              >
                +1L
              </Button>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Daily Goal</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => updateWaterGoal(Math.max(500, waterGoal - 250))}
                  disabled={waterGoal <= 500}
                >
                  <Minus size={16} />
                </Button>
                <span className="w-16 text-center">{waterGoal}ml</span>
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => updateWaterGoal(Math.min(5000, waterGoal + 250))}
                  disabled={waterGoal >= 5000}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
              onClick={resetWaterIntake}
            >
              Reset Today's Intake
            </Button>
          </Card>
          
          <div>
            <Card className="p-6 shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Why Stay Hydrated?</h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-blue-500 rounded-full flex items-center justify-center bg-blue-100">•</div>
                  <span>Improves physical performance</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-blue-500 rounded-full flex items-center justify-center bg-blue-100">•</div>
                  <span>Boosts energy levels and brain function</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-blue-500 rounded-full flex items-center justify-center bg-blue-100">•</div>
                  <span>Aids digestion and prevents headaches</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-blue-500 rounded-full flex items-center justify-center bg-blue-100">•</div>
                  <span>Helps maintain body temperature</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-blue-500 rounded-full flex items-center justify-center bg-blue-100">•</div>
                  <span>Promotes healthy skin and detoxification</span>
                </li>
              </ul>
            </Card>
            
            <WaterIntake history={intakeHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
