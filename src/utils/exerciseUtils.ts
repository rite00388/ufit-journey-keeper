
/**
 * Get a color class based on the difficulty level
 */
export const getDifficultyColor = (difficulty: "beginner" | "intermediate" | "advanced") => {
  if (difficulty === "beginner") return "bg-green-100 text-green-800";
  if (difficulty === "intermediate") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

/**
 * Convert instructions text to steps array for rendering
 */
export const getInstructionSteps = (instructions: string) => {
  return instructions.split('. ').filter(step => step.trim() !== '');
};
