
import { useState } from "react";
import Navbar from "@/components/Navbar";
import DietCard from "@/components/DietCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DietPlan = () => {
  const [activeTab, setActiveTab] = useState("breakfast");

  const breakfastMeals = [
    {
      id: "b1",
      title: "Greek Yogurt with Berries",
      mealType: "Breakfast",
      prepTime: 10,
      dietType: ["High Protein", "Low Carb"],
      imageUrl: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=1964&auto=format&fit=crop",
      ingredients: [
        "1 cup Greek yogurt",
        "1/2 cup mixed berries",
        "1 tbsp honey",
        "1 tbsp chia seeds",
        "1/4 cup granola"
      ],
      instructions: [
        "Add Greek yogurt to a bowl",
        "Top with mixed berries",
        "Drizzle with honey",
        "Sprinkle chia seeds and granola on top",
        "Enjoy immediately"
      ],
      nutrition: {
        calories: 320,
        protein: 22,
        carbs: 45,
        fat: 8
      }
    },
    {
      id: "b2",
      title: "Avocado Toast with Egg",
      mealType: "Breakfast",
      prepTime: 15,
      dietType: ["High Protein", "Healthy Fats"],
      imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
      ingredients: [
        "2 slices whole grain bread",
        "1 ripe avocado",
        "2 eggs",
        "Salt and pepper to taste",
        "Red pepper flakes (optional)",
        "1 tbsp olive oil"
      ],
      instructions: [
        "Toast the bread slices until golden brown",
        "Mash the avocado in a bowl with salt and pepper",
        "Spread the mashed avocado on the toast",
        "Heat olive oil in a pan and fry the eggs to your liking",
        "Place the fried eggs on top of the avocado toast",
        "Sprinkle with additional salt, pepper, and red pepper flakes if desired"
      ],
      nutrition: {
        calories: 420,
        protein: 18,
        carbs: 30,
        fat: 28
      }
    },
    {
      id: "b3",
      title: "Protein Smoothie Bowl",
      mealType: "Breakfast",
      prepTime: 5,
      dietType: ["High Protein", "Vegan Option"],
      imageUrl: "https://images.unsplash.com/photo-1638439430466-b9f2c681ca4d?q=80&w=1964&auto=format&fit=crop",
      ingredients: [
        "1 frozen banana",
        "1 cup frozen mixed berries",
        "1 scoop protein powder",
        "1/2 cup almond milk",
        "Toppings: sliced banana, granola, chia seeds, coconut flakes"
      ],
      instructions: [
        "Add frozen banana, berries, protein powder, and almond milk to a blender",
        "Blend until smooth and thick",
        "Pour into a bowl",
        "Add toppings as desired",
        "Serve immediately"
      ],
      nutrition: {
        calories: 350,
        protein: 25,
        carbs: 48,
        fat: 6
      }
    }
  ];

  const lunchMeals = [
    {
      id: "l1",
      title: "Chicken Quinoa Bowl",
      mealType: "Lunch",
      prepTime: 25,
      dietType: ["High Protein", "Gluten Free"],
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop",
      ingredients: [
        "1 cup cooked quinoa",
        "6 oz grilled chicken breast, sliced",
        "1 cup mixed greens",
        "1/2 avocado, sliced",
        "1/4 cup cherry tomatoes, halved",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Prepare quinoa according to package instructions",
        "Season chicken with salt and pepper and grill until cooked through",
        "In a bowl, combine quinoa, mixed greens, and cherry tomatoes",
        "Add sliced chicken and avocado on top",
        "Mix olive oil and lemon juice for dressing",
        "Drizzle dressing over the bowl and serve"
      ],
      nutrition: {
        calories: 480,
        protein: 35,
        carbs: 40,
        fat: 20
      }
    },
    {
      id: "l2",
      title: "Mediterranean Salad",
      mealType: "Lunch",
      prepTime: 15,
      dietType: ["Vegetarian", "Low Carb"],
      imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop",
      ingredients: [
        "2 cups mixed greens",
        "1/2 cup cherry tomatoes, halved",
        "1/2 cucumber, diced",
        "1/4 cup Kalamata olives",
        "1/4 cup feta cheese, crumbled",
        "1/4 red onion, thinly sliced",
        "2 tbsp olive oil",
        "1 tbsp red wine vinegar",
        "1 tsp dried oregano",
        "Salt and pepper to taste"
      ],
      instructions: [
        "In a large bowl, combine mixed greens, tomatoes, cucumber, olives, feta cheese, and red onion",
        "In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and pepper",
        "Drizzle the dressing over the salad and toss gently to combine",
        "Serve immediately"
      ],
      nutrition: {
        calories: 320,
        protein: 8,
        carbs: 12,
        fat: 28
      }
    }
  ];

  const dinnerMeals = [
    {
      id: "d1",
      title: "Grilled Salmon with Asparagus",
      mealType: "Dinner",
      prepTime: 30,
      dietType: ["High Protein", "Low Carb", "Omega-3"],
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974&auto=format&fit=crop",
      ingredients: [
        "6 oz salmon fillet",
        "1 bunch asparagus, trimmed",
        "1 lemon, sliced",
        "2 cloves garlic, minced",
        "2 tbsp olive oil",
        "1 tsp dried dill",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Preheat oven to 400°F (200°C)",
        "Place salmon on a baking sheet lined with parchment paper",
        "Arrange asparagus and lemon slices around the salmon",
        "In a small bowl, mix olive oil, garlic, dill, salt, and pepper",
        "Drizzle the mixture over the salmon and asparagus",
        "Bake for 15-20 minutes until salmon is cooked through and asparagus is tender",
        "Serve hot"
      ],
      nutrition: {
        calories: 380,
        protein: 34,
        carbs: 8,
        fat: 25
      }
    },
    {
      id: "d2",
      title: "Turkey Chili",
      mealType: "Dinner",
      prepTime: 45,
      dietType: ["High Protein", "High Fiber"],
      imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop",
      ingredients: [
        "1 lb ground turkey",
        "1 onion, diced",
        "1 red bell pepper, diced",
        "2 cloves garlic, minced",
        "1 can (15 oz) kidney beans, drained and rinsed",
        "1 can (15 oz) diced tomatoes",
        "2 cups chicken broth",
        "2 tbsp tomato paste",
        "2 tbsp chili powder",
        "1 tbsp cumin",
        "1 tsp paprika",
        "Salt and pepper to taste",
        "Optional toppings: Greek yogurt, shredded cheese, green onions"
      ],
      instructions: [
        "In a large pot, brown the ground turkey over medium heat",
        "Add onion, bell pepper, and garlic; cook until softened",
        "Stir in kidney beans, diced tomatoes, chicken broth, and tomato paste",
        "Add chili powder, cumin, paprika, salt, and pepper",
        "Bring to a boil, then reduce heat and simmer for 25-30 minutes",
        "Serve hot with optional toppings"
      ],
      nutrition: {
        calories: 320,
        protein: 28,
        carbs: 25,
        fat: 12
      }
    }
  ];

  const snacks = [
    {
      id: "s1",
      title: "Protein Energy Balls",
      mealType: "Snack",
      prepTime: 15,
      dietType: ["High Protein", "No Bake"],
      imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1974&auto=format&fit=crop",
      ingredients: [
        "1 cup rolled oats",
        "1/2 cup peanut butter",
        "1/3 cup honey",
        "1/4 cup ground flaxseed",
        "1/4 cup protein powder",
        "1/3 cup mini chocolate chips",
        "1 tsp vanilla extract"
      ],
      instructions: [
        "In a large bowl, mix all ingredients until well combined",
        "Cover and chill in the refrigerator for 30 minutes",
        "Roll into 1-inch balls",
        "Store in an airtight container in the refrigerator for up to 1 week"
      ],
      nutrition: {
        calories: 120,
        protein: 5,
        carbs: 12,
        fat: 7
      }
    },
    {
      id: "s2",
      title: "Greek Yogurt Parfait",
      mealType: "Snack",
      prepTime: 5,
      dietType: ["High Protein", "Probiotic"],
      imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1974&auto=format&fit=crop",
      ingredients: [
        "1 cup Greek yogurt",
        "1/4 cup granola",
        "1/4 cup mixed berries",
        "1 tsp honey"
      ],
      instructions: [
        "In a glass or jar, layer half of the yogurt",
        "Add half of the granola and berries",
        "Repeat with remaining yogurt, granola, and berries",
        "Drizzle honey on top",
        "Enjoy immediately or refrigerate for later"
      ],
      nutrition: {
        calories: 250,
        protein: 18,
        carbs: 30,
        fat: 5
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold text-ufit-primary mb-8">Personalized Diet Plan</h1>
        
        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="breakfast" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakfastMeals.map((meal) => (
                <DietCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.title}
                  mealType={meal.mealType}
                  prepTime={meal.prepTime}
                  dietType={meal.dietType}
                  imageUrl={meal.imageUrl}
                  ingredients={meal.ingredients}
                  instructions={meal.instructions}
                  nutrition={meal.nutrition}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lunch" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lunchMeals.map((meal) => (
                <DietCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.title}
                  mealType={meal.mealType}
                  prepTime={meal.prepTime}
                  dietType={meal.dietType}
                  imageUrl={meal.imageUrl}
                  ingredients={meal.ingredients}
                  instructions={meal.instructions}
                  nutrition={meal.nutrition}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="dinner" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dinnerMeals.map((meal) => (
                <DietCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.title}
                  mealType={meal.mealType}
                  prepTime={meal.prepTime}
                  dietType={meal.dietType}
                  imageUrl={meal.imageUrl}
                  ingredients={meal.ingredients}
                  instructions={meal.instructions}
                  nutrition={meal.nutrition}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="snacks" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snacks.map((meal) => (
                <DietCard
                  key={meal.id}
                  id={meal.id}
                  title={meal.title}
                  mealType={meal.mealType}
                  prepTime={meal.prepTime}
                  dietType={meal.dietType}
                  imageUrl={meal.imageUrl}
                  ingredients={meal.ingredients}
                  instructions={meal.instructions}
                  nutrition={meal.nutrition}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DietPlan;
