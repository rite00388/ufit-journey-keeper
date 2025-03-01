
import { useState } from "react";
import { Clock, Flame, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Import types and utility functions
import { ExerciseCardProps } from "@/types/exercise";
import { getDifficultyColor } from "@/utils/exerciseUtils";

// Import sub-components
import ExerciseMedia from "@/components/exercise/ExerciseMedia";
import ExerciseInstructions from "@/components/exercise/ExerciseInstructions";
import ExerciseActions from "@/components/exercise/ExerciseActions";

const ExerciseCard = ({
  exercise,
  isFavorite,
  onToggleFavorite,
}: ExerciseCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  const handleStartExercise = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowGif(true);
    
    toast.success(`Started ${exercise.name} exercise!`, {
      description: "Your workout session has begun. Follow along with the animation.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}
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
          <ExerciseMedia 
            showGif={showGif}
            imageUrl={exercise.imageUrl}
            gifUrl={exercise.gifUrl}
            name={exercise.name}
          />

          <ExerciseInstructions 
            name={exercise.name}
            difficulty={exercise.difficulty}
            category={exercise.category}
            muscle={exercise.muscle}
            equipment={exercise.equipment}
            instructions={exercise.instructions}
          />

          <ExerciseActions 
            isFavorite={isFavorite}
            showGif={showGif}
            onToggleFavorite={handleSaveClick}
            onStartExercise={handleStartExercise}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseCard;
