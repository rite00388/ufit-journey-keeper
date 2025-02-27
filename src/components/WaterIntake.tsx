
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Droplet, Plus, Minus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const WaterIntake = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(2000); // Default goal: 2000ml (2L)
  const [animation, setAnimation] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedWaterIntake = localStorage.getItem("ufitWaterIntake");
    const savedGoal = localStorage.getItem("ufitWaterGoal");
    
    if (savedWaterIntake) {
      setWaterIntake(parseInt(savedWaterIntake));
    }
    
    if (savedGoal) {
      setGoal(parseInt(savedGoal));
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem("ufitWaterIntake", waterIntake.toString());
    localStorage.setItem("ufitWaterGoal", goal.toString());
  }, [waterIntake, goal]);

  const addWater = (amount: number) => {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 700);
    
    setWaterIntake((prev) => {
      const newValue = Math.max(0, prev + amount);
      return newValue;
    });
  };

  const resetWater = () => {
    setWaterIntake(0);
  };

  const getProgressPercentage = () => {
    return Math.min(100, (waterIntake / goal) * 100);
  };

  const getWaterColor = () => {
    const percentage = getProgressPercentage();
    if (percentage < 25) return "bg-blue-200";
    if (percentage < 50) return "bg-blue-300";
    if (percentage < 75) return "bg-blue-400";
    return "bg-blue-500";
  };

  return (
    <div className="ufit-card space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-ufit-primary">Water Intake</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetWater}
          className="text-ufit-muted hover:text-ufit-primary"
        >
          Reset
        </Button>
      </div>

      <div className="text-center space-y-1">
        <div className="relative mx-auto w-40 h-40 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-ufit-light"></div>
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 rounded-full transition-all duration-700 ease-out",
              getWaterColor()
            )}
            style={{
              height: `${getProgressPercentage()}%`,
              transition: animation ? "height 0.7s ease-out" : "none",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <Droplet
              className="h-8 w-8 text-blue-500 mb-1"
              fill="#bfdbfe"
              fillOpacity={0.7}
            />
            <span className="text-2xl font-bold text-ufit-primary">
              {waterIntake} ml
            </span>
            <span className="text-sm text-ufit-muted">
              {Math.round(getProgressPercentage())}% of {goal}ml
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => addWater(100)}
            variant="outline"
            className="ufit-button-secondary"
          >
            +100ml
          </Button>
          <Button
            onClick={() => addWater(200)}
            variant="outline"
            className="ufit-button-secondary"
          >
            +200ml
          </Button>
          <Button
            onClick={() => addWater(500)}
            variant="outline"
            className="ufit-button-secondary"
          >
            +500ml
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={() => setGoal((prev) => Math.max(500, prev - 100))}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <div className="text-sm text-ufit-muted">Daily Goal</div>
            <div className="font-medium">{goal}ml</div>
          </div>
          <Button
            onClick={() => setGoal((prev) => prev + 100)}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaterIntake;
