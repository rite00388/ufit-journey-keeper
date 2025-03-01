
import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface ExerciseActionsProps {
  isFavorite: boolean;
  showGif: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onStartExercise: (e: React.MouseEvent) => void;
}

const ExerciseActions: React.FC<ExerciseActionsProps> = ({
  isFavorite,
  showGif,
  onToggleFavorite,
  onStartExercise
}) => {
  return (
    <div className="flex justify-end space-x-3 pt-2">
      <Button
        onClick={onToggleFavorite}
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
      
      {!showGif ? (
        <Button 
          className="ufit-button-primary"
          onClick={onStartExercise}
        >
          Start Exercise
        </Button>
      ) : (
        <DialogClose asChild>
          <Button 
            variant="outline"
            className="ufit-button-secondary"
          >
            Close
          </Button>
        </DialogClose>
      )}
    </div>
  );
};

export default ExerciseActions;
