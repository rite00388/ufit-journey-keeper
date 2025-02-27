
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

const BMIForm = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateBMI = () => {
    setLoading(true);
    
    setTimeout(() => {
      try {
        let bmiValue: number;
        let weightVal = parseFloat(weight);
        let heightVal = parseFloat(height);

        if (isNaN(weightVal) || isNaN(heightVal) || heightVal <= 0 || weightVal <= 0) {
          throw new Error("Please enter valid height and weight values");
        }

        if (unit === "metric") {
          // Metric: BMI = weight (kg) / (height (m))^2
          bmiValue = weightVal / Math.pow(heightVal / 100, 2);
        } else {
          // Imperial: BMI = (weight (lbs) * 703) / (height (inches))^2
          bmiValue = (weightVal * 703) / Math.pow(heightVal, 2);
        }

        bmiValue = Math.round(bmiValue * 10) / 10;

        let category: string;
        let color: string;

        if (bmiValue < 18.5) {
          category = "Underweight";
          color = "text-blue-500";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
          category = "Normal weight";
          color = "text-green-500";
        } else if (bmiValue >= 25 && bmiValue < 30) {
          category = "Overweight";
          color = "text-yellow-500";
        } else {
          category = "Obesity";
          color = "text-red-500";
        }

        setResult({ bmi: bmiValue, category, color });
      } catch (error) {
        console.error(error);
        setResult(null);
      } finally {
        setLoading(false);
      }
    }, 500); // Simulate calculation time
  };

  const getBMIColor = () => {
    if (!result) return "#9b87f5";
    
    if (result.category === "Underweight") return "#3b82f6";
    if (result.category === "Normal weight") return "#10b981";
    if (result.category === "Overweight") return "#f59e0b";
    return "#ef4444";
  };

  const getBMIProgressValue = () => {
    if (!result) return 0;
    // Map BMI to 0-100 progress value
    if (result.bmi < 10) return 10;
    if (result.bmi > 40) return 90;
    return ((result.bmi - 10) / 30) * 80 + 10; // Scale 10-40 to 10-90
  };

  return (
    <div className="space-y-6 ufit-card">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <Label htmlFor="unit">Measurement System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger id="unit" className="ufit-input">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <Label htmlFor="height">
              Height ({unit === "metric" ? "cm" : "inches"})
            </Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === "metric" ? "e.g. 170" : "e.g. 67"}
              className="ufit-input"
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="weight">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
              className="ufit-input"
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={calculateBMI} 
        className="w-full ufit-button-primary"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate BMI"}
      </Button>

      {result && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <div className="flex justify-between items-center">
            <span className="text-sm text-ufit-muted">10</span>
            <span className="text-sm text-ufit-muted">25</span>
            <span className="text-sm text-ufit-muted">40+</span>
          </div>
          <Progress value={getBMIProgressValue()} className="h-2" style={{ backgroundColor: "#e5e7eb", "--tw-progress-fill-color": getBMIColor() } as React.CSSProperties} />
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold" style={{ color: getBMIColor() }}>
              {result.bmi}
            </div>
            <div className="text-lg font-medium" style={{ color: getBMIColor() }}>
              {result.category}
            </div>
            <p className="text-ufit-muted text-sm">
              A BMI of {result.bmi} indicates you are in the {result.category} range.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
