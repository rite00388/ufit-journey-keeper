
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const CalorieTracker = () => {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [consumedInput, setConsumedInput] = useState("");
  const [burnedInput, setBurnedInput] = useState("");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedCaloriesConsumed = localStorage.getItem("ufitCaloriesConsumed");
    const savedCaloriesBurned = localStorage.getItem("ufitCaloriesBurned");
    const savedCalorieGoal = localStorage.getItem("ufitCalorieGoal");
    
    if (savedCaloriesConsumed) {
      setCaloriesConsumed(parseInt(savedCaloriesConsumed));
    }
    
    if (savedCaloriesBurned) {
      setCaloriesBurned(parseInt(savedCaloriesBurned));
    }
    
    if (savedCalorieGoal) {
      setCalorieGoal(parseInt(savedCalorieGoal));
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem("ufitCaloriesConsumed", caloriesConsumed.toString());
    localStorage.setItem("ufitCaloriesBurned", caloriesBurned.toString());
    localStorage.setItem("ufitCalorieGoal", calorieGoal.toString());
  }, [caloriesConsumed, caloriesBurned, calorieGoal]);

  const handleAddCalories = (type: 'consumed' | 'burned') => {
    if (type === 'consumed' && consumedInput) {
      setCaloriesConsumed(prev => prev + parseInt(consumedInput));
      setConsumedInput("");
    } else if (type === 'burned' && burnedInput) {
      setCaloriesBurned(prev => prev + parseInt(burnedInput));
      setBurnedInput("");
    }
  };

  const resetCalories = () => {
    setCaloriesConsumed(0);
    setCaloriesBurned(0);
  };

  const getNetCalories = () => {
    return caloriesConsumed - caloriesBurned;
  };

  const getProgressPercentage = () => {
    return Math.min(100, (getNetCalories() / calorieGoal) * 100);
  };

  const getRemainingCalories = () => {
    return calorieGoal - getNetCalories();
  };

  // Data for pie chart
  const data = [
    { name: "Consumed", value: caloriesConsumed, color: "#9b87f5" },
    { name: "Burned", value: caloriesBurned, color: "#ef4444" },
  ];

  // Custom label renderer
  const renderCustomizedLabel = (props: any) => {
    const { viewBox } = props;
    const centerX = viewBox ? viewBox.cx : 0;  
    const centerY = viewBox ? viewBox.cy : 0;
    
    return (
      <>
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-bold"
          fill="#333333"
        >
          {getNetCalories()}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs"
          fill="#8E9196"
        >
          Net Calories
        </text>
      </>
    );
  };

  return (
    <div className="ufit-card space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-ufit-primary">Calorie Tracker</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetCalories}
          className="text-ufit-muted hover:text-ufit-primary"
        >
          Reset
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="h-[160px] w-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <Label content={renderCustomizedLabel} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-ufit-muted">Daily Goal</span>
              <span className="font-medium">{calorieGoal} cal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ufit-muted">Consumed</span>
              <span className="font-medium text-ufit-accent">{caloriesConsumed} cal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ufit-muted">Burned</span>
              <span className="font-medium text-red-500">-{caloriesBurned} cal</span>
            </div>
            <div className="flex justify-between text-sm font-medium pt-1 border-t">
              <span>Remaining</span>
              <span>{getRemainingCalories()} cal</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-ufit-muted">
              <span>0%</span>
              <span>{calorieGoal} cal</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-ufit-primary">Add Calories Consumed</label>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={consumedInput}
              onChange={(e) => setConsumedInput(e.target.value)}
              placeholder="e.g. 250"
              className="ufit-input"
            />
            <Button 
              onClick={() => handleAddCalories('consumed')}
              variant="outline"
              size="icon"
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-ufit-primary">Add Calories Burned</label>
          <div className="flex space-x-2">
            <Input
              type="number"
              value={burnedInput}
              onChange={(e) => setBurnedInput(e.target.value)}
              placeholder="e.g. 150"
              className="ufit-input"
            />
            <Button 
              onClick={() => handleAddCalories('burned')}
              variant="outline"
              size="icon"
              className="flex-shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button
          onClick={() => setCalorieGoal((prev) => Math.max(500, prev - 100))}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <div className="text-sm text-ufit-muted">Adjust Daily Goal</div>
          <div className="font-medium">{calorieGoal} calories</div>
        </div>
        <Button
          onClick={() => setCalorieGoal((prev) => prev + 100)}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalorieTracker;
