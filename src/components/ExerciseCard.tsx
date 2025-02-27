
import { useState } from "react";
import { Clock, Flame, Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExerciseProps {
  id: string;
  title: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  imageUrl: string;
  description: string;
  steps: string[];
}

const ExerciseCard = ({
  id,
  title,
  type,
  duration,
  caloriesBurned,
  difficulty,
  imageUrl,
  description,
  steps,
}: ExerciseProps) => {
  const [saved, setSaved] = useState(false);

  const getDifficultyColor = () => {
    if (difficulty === "beginner") return "bg-green-100 text-green-800";
    if (difficulty === "intermediate") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="ufit-card cursor-pointer h-full flex flex-col">
          <div className="relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={toggleSave}
            >
              {saved ? (
                <Bookmark className="h-5 w-5 text-ufit-accent" fill="#9b87f5" />
              ) : (
                <Bookmark className="h-5 w-5 text-ufit-muted" />
              )}
            </Button>
            <div className="absolute bottom-2 left-2">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor()}`}
              >
                {difficulty}
              </span>
            </div>
          </div>

          <div className="flex-1 p-4">
            <h3 className="font-medium text-lg text-ufit-primary mb-1">{title}</h3>
            <p className="text-ufit-muted text-sm mb-3">{type}</p>

            <div className="flex justify-between text-sm">
              <div className="flex items-center text-ufit-secondary">
                <Clock className="h-4 w-4 mr-1" />
                {duration} min
              </div>
              <div className="flex items-center text-ufit-secondary">
                <Flame className="h-4 w-4 mr-1" />
                {caloriesBurned} cal
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
          <DialogDescription className="text-ufit-secondary">
            {type} • {duration} min • {caloriesBurned} calories
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-56 object-cover rounded-lg"
          />

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Description</h4>
            <p className="text-ufit-secondary text-sm">{description}</p>
          </div>

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Instructions</h4>
            <ol className="space-y-2">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 h-5 w-5 bg-ufit-accent/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-ufit-accent" />
                  </span>
                  <span className="text-sm text-ufit-secondary">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              onClick={toggleSave}
              variant="outline"
              className="ufit-button-secondary"
            >
              {saved ? "Saved" : "Save"}
              {saved ? (
                <Bookmark className="h-4 w-4 ml-2" fill="#9b87f5" />
              ) : (
                <Bookmark className="h-4 w-4 ml-2" />
              )}
            </Button>
            <Button className="ufit-button-primary">Start Exercise</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseCard;
