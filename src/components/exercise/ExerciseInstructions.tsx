
import React from "react";
import { Check } from "lucide-react";
import { getInstructionSteps } from "@/utils/exerciseUtils";

interface ExerciseInstructionsProps {
  name: string;
  difficulty: string;
  category: string;
  muscle: string;
  equipment: string;
  instructions: string;
}

const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({
  name,
  difficulty,
  category,
  muscle,
  equipment,
  instructions
}) => {
  const instructionSteps = getInstructionSteps(instructions);
  
  return (
    <>
      <div>
        <h4 className="font-medium text-ufit-primary mb-2">Description</h4>
        <p className="text-ufit-secondary text-sm">
          {name} is a {difficulty} level {category} exercise 
          that targets the {muscle} using {equipment}.
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
    </>
  );
};

export default ExerciseInstructions;
