
import { useState } from "react";
import { Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface DietProps {
  id: string;
  title: string;
  mealType: string;
  prepTime: number;
  dietType: string[];
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
}

const DietCard = ({
  id,
  title,
  mealType,
  prepTime,
  dietType,
  imageUrl,
  ingredients,
  instructions,
  nutrition,
}: DietProps) => {
  const [saved, setSaved] = useState(false);

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
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                {mealType}
              </Badge>
            </div>
          </div>

          <div className="flex-1 p-4">
            <h3 className="font-medium text-lg text-ufit-primary mb-1">{title}</h3>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {dietType.map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center text-ufit-secondary">
                <Clock className="h-4 w-4 mr-1" />
                {prepTime} min
              </div>
              <div className="text-ufit-secondary">
                {nutrition.calories} cal
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">{title}</DialogTitle>
          <DialogDescription className="text-ufit-secondary">
            {mealType} • {prepTime} min prep time
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-56 object-cover rounded-lg"
          />

          <div className="flex flex-wrap gap-2 mb-2">
            {dietType.map((type) => (
              <Badge key={type} variant="outline">
                {type}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-ufit-light rounded-lg p-2">
              <div className="text-sm text-ufit-muted">Calories</div>
              <div className="font-medium">{nutrition.calories}</div>
            </div>
            <div className="bg-ufit-light rounded-lg p-2">
              <div className="text-sm text-ufit-muted">Protein</div>
              <div className="font-medium">{nutrition.protein}g</div>
            </div>
            <div className="bg-ufit-light rounded-lg p-2">
              <div className="text-sm text-ufit-muted">Carbs</div>
              <div className="font-medium">{nutrition.carbs}g</div>
            </div>
            <div className="bg-ufit-light rounded-lg p-2">
              <div className="text-sm text-ufit-muted">Fat</div>
              <div className="font-medium">{nutrition.fat}g</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Ingredients</h4>
            <ul className="grid grid-cols-2 gap-1">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 h-4 w-4 bg-ufit-accent/10 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="h-2 w-2 text-ufit-accent" />
                  </span>
                  <span className="text-sm text-ufit-secondary">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ufit-primary mb-2">Instructions</h4>
            <ol className="space-y-2">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 h-5 w-5 bg-ufit-accent/10 rounded-full flex items-center justify-center mt-0.5 text-xs text-ufit-accent font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-ufit-secondary">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <Button
              className="ufit-button-primary"
              onClick={() => setSaved(!saved)}
            >
              {saved ? "Saved to My Meals" : "Add to My Meals"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DietCard;
