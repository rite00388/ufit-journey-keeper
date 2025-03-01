
export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string;
  imageUrl: string;
  gifUrl: string;
}

export interface ExerciseCardProps {
  exercise: Exercise;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}
