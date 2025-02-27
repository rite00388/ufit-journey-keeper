
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

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string;
  imageUrl: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ExerciseCard = ({
  exercise,
  isFavorite,
  onToggleFavorite,
}: ExerciseCardProps) => {
  const getDifficultyColor = () => {
    if (exercise.difficulty === "beginner") return "bg-green-100 text-green-800";
    if (exercise.difficulty === "intermediate") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  // Convert instructions text to steps array for rendering
  const instructionSteps = exercise.instructions.split('. ').filter(step => step.trim() !== '');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="ufit-card cursor-pointer h-full flex flex-col">
          <div className="relative">
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleSaveClick}
            >
              {isFavorite ? (
                <Bookmark className="h-5 w-5 text-ufit-accent" fill="#9b87f5" />
              ) : (
                <Bookmark className="h-5 w-5 text-ufit-muted" />
              )}
            </Button>
            <div className="absolute bottom-2 left-2">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor()}`}
              >
                {exercise.difficulty}
              </span>
            </div>
          </div>

          <div className="flex-1 p-4">
            <h3 className="font-medium text-lg text-ufit-primary mb-1">{exercise.name}</h3>
            <p className="text-ufit-muted text-sm mb-3">{exercise.muscle}</p>

            <div className="flex justify-between text-sm">
              <div className="flex items-center text-ufit-secondary">
                <Clock className="h-4 w-4 mr-1" />
                10 min
              </div>
              <div className="flex items-center text-ufit-secondary">
                <Flame className="h-4 w-4 mr-1" />
                150 cal
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">{exercise.name}</DialogTitle>
          <DialogDescription className="text-ufit-secondary">
            {exercise.category} • {exercise.muscle} • {exercise.equipment}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-56 object-cover rounded-lg"
          />

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Description</h4>
            <p className="text-ufit-secondary text-sm">
              {exercise.name} is a {exercise.difficulty} level {exercise.category} exercise 
              that targets the {exercise.muscle} using {exercise.equipment}.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Instructions</h4>
            <ol className="space-y-2">
              {instructionSteps.map((step, index) => (
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
              onClick={handleSaveClick}
              variant="outline"
              className="ufit-button-secondary"
            >
              {isFavorite ? "Saved" : "Save"}
              {isFavorite ? (
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
