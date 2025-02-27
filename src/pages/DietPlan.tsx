
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Utensils, BarChart2, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import DietCard from "@/components/DietCard";

// Diet plan data structure
interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions?: string;
  imageUrl?: string;
}

interface DietDay {
  day: string;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
}

// Sample diet plan data
const dietPlans = {
  weightLoss: [
    {
      day: "Monday",
      meals: {
        breakfast: [
          {
            id: "wl-mon-b1",
            name: "Greek Yogurt with Berries",
            calories: 240,
            protein: 18,
            carbs: 30,
            fat: 6,
            ingredients: ["1 cup Greek yogurt", "1/2 cup mixed berries", "1 tbsp honey", "1 tbsp chia seeds"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "wl-mon-l1",
            name: "Grilled Chicken Salad",
            calories: 350,
            protein: 35,
            carbs: 15,
            fat: 18,
            ingredients: ["4 oz grilled chicken breast", "2 cups mixed greens", "1/4 cup cherry tomatoes", "1/4 cucumber, sliced", "1 tbsp olive oil", "1 tbsp balsamic vinegar"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "wl-mon-d1",
            name: "Baked Salmon with Roasted Vegetables",
            calories: 420,
            protein: 30,
            carbs: 25,
            fat: 22,
            ingredients: ["5 oz salmon fillet", "1 cup broccoli", "1 cup bell peppers", "1 tbsp olive oil", "Herbs and spices"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "wl-mon-s1",
            name: "Apple with Almond Butter",
            calories: 200,
            protein: 5,
            carbs: 25,
            fat: 10,
            ingredients: ["1 medium apple", "1 tbsp almond butter"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    },
    {
      day: "Tuesday",
      meals: {
        breakfast: [
          {
            id: "wl-tue-b1",
            name: "Vegetable Omelette",
            calories: 280,
            protein: 20,
            carbs: 10,
            fat: 18,
            ingredients: ["2 eggs", "1/4 cup spinach", "1/4 cup mushrooms", "1/4 cup bell peppers", "1 oz cheese"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "wl-tue-l1",
            name: "Turkey and Avocado Wrap",
            calories: 380,
            protein: 25,
            carbs: 30,
            fat: 20,
            ingredients: ["3 oz turkey breast", "1/4 avocado", "1 whole wheat wrap", "Lettuce", "Tomato", "Mustard"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "wl-tue-d1",
            name: "Vegetable Stir Fry with Tofu",
            calories: 360,
            protein: 20,
            carbs: 35,
            fat: 15,
            ingredients: ["4 oz tofu", "1 cup mixed vegetables", "1/2 cup brown rice", "1 tbsp soy sauce", "1 tsp sesame oil"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "wl-tue-s1",
            name: "Greek Yogurt with Honey",
            calories: 150,
            protein: 15,
            carbs: 15,
            fat: 0,
            ingredients: ["1 cup Greek yogurt", "1 tsp honey"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    }
  ],
  maintenance: [
    {
      day: "Monday",
      meals: {
        breakfast: [
          {
            id: "m-mon-b1",
            name: "Oatmeal with Fruit and Nuts",
            calories: 380,
            protein: 12,
            carbs: 60,
            fat: 12,
            ingredients: ["1 cup cooked oatmeal", "1 banana", "1 tbsp peanut butter", "1 tbsp honey", "2 tbsp chopped walnuts"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "m-mon-l1",
            name: "Tuna Sandwich",
            calories: 450,
            protein: 30,
            carbs: 45,
            fat: 15,
            ingredients: ["4 oz tuna", "2 slices whole grain bread", "1 tbsp mayo", "Lettuce", "Tomato"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "m-mon-d1",
            name: "Grilled Steak with Sweet Potato",
            calories: 550,
            protein: 40,
            carbs: 40,
            fat: 25,
            ingredients: ["6 oz lean steak", "1 medium sweet potato", "1 cup steamed broccoli", "1 tbsp olive oil"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "m-mon-s1",
            name: "Trail Mix",
            calories: 250,
            protein: 8,
            carbs: 20,
            fat: 16,
            ingredients: ["1/4 cup mixed nuts", "2 tbsp dried cranberries", "1 tbsp dark chocolate chips"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    },
    {
      day: "Tuesday",
      meals: {
        breakfast: [
          {
            id: "m-tue-b1",
            name: "Avocado Toast with Eggs",
            calories: 420,
            protein: 18,
            carbs: 35,
            fat: 25,
            ingredients: ["2 slices whole grain bread", "1/2 avocado", "2 eggs", "Salt and pepper to taste"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "m-tue-l1",
            name: "Chicken Quinoa Bowl",
            calories: 480,
            protein: 35,
            carbs: 50,
            fat: 15,
            ingredients: ["4 oz grilled chicken", "1 cup cooked quinoa", "1/2 cup black beans", "1/4 avocado", "Salsa"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "m-tue-d1",
            name: "Shrimp Pasta Primavera",
            calories: 520,
            protein: 30,
            carbs: 60,
            fat: 18,
            ingredients: ["4 oz shrimp", "1.5 cups whole wheat pasta", "1 cup mixed vegetables", "2 tbsp olive oil", "Garlic and herbs"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "m-tue-s1",
            name: "Protein Smoothie",
            calories: 280,
            protein: 20,
            carbs: 30,
            fat: 8,
            ingredients: ["1 scoop protein powder", "1 banana", "1 cup almond milk", "1 tbsp peanut butter", "Ice cubes"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    }
  ],
  muscleGain: [
    {
      day: "Monday",
      meals: {
        breakfast: [
          {
            id: "mg-mon-b1",
            name: "Protein Pancakes",
            calories: 520,
            protein: 35,
            carbs: 60,
            fat: 15,
            ingredients: ["1 cup oat flour", "1 scoop protein powder", "1 banana", "2 eggs", "1 cup milk", "1 tbsp honey"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "mg-mon-l1",
            name: "Chicken and Rice Bowl",
            calories: 650,
            protein: 45,
            carbs: 70,
            fat: 20,
            ingredients: ["6 oz grilled chicken breast", "1.5 cups brown rice", "1 cup mixed vegetables", "1/4 avocado", "2 tbsp olive oil"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "mg-mon-d1",
            name: "Beef and Vegetable Stir Fry",
            calories: 580,
            protein: 40,
            carbs: 50,
            fat: 25,
            ingredients: ["6 oz lean beef", "1 cup mixed vegetables", "1 cup brown rice", "2 tbsp soy sauce", "1 tbsp olive oil"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "mg-mon-s1",
            name: "Protein Shake with Banana",
            calories: 320,
            protein: 30,
            carbs: 35,
            fat: 8,
            ingredients: ["2 scoops protein powder", "1 banana", "2 cups milk", "1 tbsp peanut butter"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    },
    {
      day: "Tuesday",
      meals: {
        breakfast: [
          {
            id: "mg-tue-b1",
            name: "Egg and Cheese Breakfast Burrito",
            calories: 550,
            protein: 30,
            carbs: 45,
            fat: 28,
            ingredients: ["3 eggs", "1 whole wheat tortilla", "1/4 cup cheese", "1/4 cup black beans", "Salsa"],
            imageUrl: "/placeholder.svg"
          }
        ],
        lunch: [
          {
            id: "mg-tue-l1",
            name: "Tuna Pasta Salad",
            calories: 620,
            protein: 40,
            carbs: 65,
            fat: 22,
            ingredients: ["5 oz tuna", "1.5 cups whole wheat pasta", "1/4 cup Greek yogurt", "1 tbsp mayo", "Mixed vegetables"],
            imageUrl: "/placeholder.svg"
          }
        ],
        dinner: [
          {
            id: "mg-tue-d1",
            name: "Turkey and Sweet Potato Mash",
            calories: 580,
            protein: 45,
            carbs: 55,
            fat: 20,
            ingredients: ["6 oz ground turkey", "1 large sweet potato", "1 cup spinach", "2 tbsp olive oil", "Herbs and spices"],
            imageUrl: "/placeholder.svg"
          }
        ],
        snacks: [
          {
            id: "mg-tue-s1",
            name: "Greek Yogurt with Granola",
            calories: 350,
            protein: 25,
            carbs: 40,
            fat: 10,
            ingredients: ["1.5 cups Greek yogurt", "1/3 cup granola", "1 tbsp honey"],
            imageUrl: "/placeholder.svg"
          }
        ]
      }
    }
  ]
};

const DietPlan = () => {
  const [dietPlanType, setDietPlanType] = useState<"weightLoss" | "maintenance" | "muscleGain">("weightLoss");
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  
  const getDietPlan = () => {
    return dietPlans[dietPlanType];
  };
  
  const getCurrentDayPlan = () => {
    return getDietPlan().find(day => day.day === selectedDay) || getDietPlan()[0];
  };

  // Calculate total daily calories and macros
  const calculateDailyTotals = (dayPlan: DietDay) => {
    const meals = [...dayPlan.meals.breakfast, ...dayPlan.meals.lunch, ...dayPlan.meals.dinner, ...dayPlan.meals.snacks];
    
    return {
      calories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      fat: meals.reduce((sum, meal) => sum + meal.fat, 0)
    };
  };

  const dayPlan = getCurrentDayPlan();
  const totals = calculateDailyTotals(dayPlan);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold text-ufit-primary mb-6">Diet Plan</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Diet Type</h2>
              
              <div className="space-y-2">
                <Button 
                  variant={dietPlanType === "weightLoss" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setDietPlanType("weightLoss")}
                >
                  Weight Loss
                </Button>
                <Button 
                  variant={dietPlanType === "maintenance" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setDietPlanType("maintenance")}
                >
                  Maintenance
                </Button>
                <Button 
                  variant={dietPlanType === "muscleGain" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setDietPlanType("muscleGain")}
                >
                  Muscle Gain
                </Button>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Daily Overview</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Calories:</span>
                    <span className="font-medium">{totals.calories} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protein:</span>
                    <span className="font-medium">{totals.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carbs:</span>
                    <span className="font-medium">{totals.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fat:</span>
                    <span className="font-medium">{totals.fat}g</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Select Day</h2>
                <div className="space-y-2">
                  {getDietPlan().map(day => (
                    <Button
                      key={day.day}
                      variant={selectedDay === day.day ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedDay(day.day)}
                    >
                      {day.day}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="mb-6 bg-gray-100">
                <TabsTrigger value="daily" className="data-[state=active]:bg-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Daily Plan
                </TabsTrigger>
                <TabsTrigger value="nutrition" className="data-[state=active]:bg-white">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Nutrition Info
                </TabsTrigger>
                <TabsTrigger value="shopping" className="data-[state=active]:bg-white">
                  <Utensils className="mr-2 h-4 w-4" />
                  Shopping List
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="mt-0">
                <h2 className="text-2xl font-semibold mb-4">{selectedDay}'s Meal Plan</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-ufit-primary">Breakfast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dayPlan.meals.breakfast.map(meal => (
                        <DietCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-ufit-primary">Lunch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dayPlan.meals.lunch.map(meal => (
                        <DietCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-ufit-primary">Dinner</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dayPlan.meals.dinner.map(meal => (
                        <DietCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3 text-ufit-primary">Snacks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dayPlan.meals.snacks.map(meal => (
                        <DietCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Nutrition Information</h2>
                
                <Card className="p-6 shadow-md mb-6">
                  <h3 className="text-xl font-medium mb-4">Macronutrient Breakdown</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Protein ({Math.round((totals.protein * 4 / totals.calories) * 100)}%)</span>
                        <span>{totals.protein}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${(totals.protein * 4 / totals.calories) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Carbs ({Math.round((totals.carbs * 4 / totals.calories) * 100)}%)</span>
                        <span>{totals.carbs}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${(totals.carbs * 4 / totals.calories) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Fat ({Math.round((totals.fat * 9 / totals.calories) * 100)}%)</span>
                        <span>{totals.fat}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-yellow-500 h-2.5 rounded-full" 
                          style={{ width: `${(totals.fat * 9 / totals.calories) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-600">
                    <p className="mb-2">Caloric Content: {totals.calories} kcal</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Protein: {totals.protein}g ({(totals.protein * 4).toFixed(0)} kcal)</li>
                      <li>Carbohydrates: {totals.carbs}g ({(totals.carbs * 4).toFixed(0)} kcal)</li>
                      <li>Fat: {totals.fat}g ({(totals.fat * 9).toFixed(0)} kcal)</li>
                    </ul>
                  </div>
                </Card>
                
                <Card className="p-6 shadow-md">
                  <h3 className="text-xl font-medium mb-4">Diet Plan Description</h3>
                  
                  {dietPlanType === "weightLoss" && (
                    <div>
                      <p className="mb-3">This weight loss diet plan is designed to help you reduce body fat while maintaining muscle mass. Key features:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Moderate calorie deficit (300-500 calories below maintenance)</li>
                        <li>Higher protein intake (30-35% of calories)</li>
                        <li>Moderate carbohydrates (40-45% of calories)</li>
                        <li>Lower fat (20-25% of calories)</li>
                        <li>Focus on fiber-rich, whole foods to increase satiety</li>
                        <li>Strategic meal timing to regulate hunger</li>
                      </ul>
                    </div>
                  )}
                  
                  {dietPlanType === "maintenance" && (
                    <div>
                      <p className="mb-3">This maintenance diet plan is designed to help you maintain your current weight and body composition. Key features:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Balanced calorie intake matching your daily expenditure</li>
                        <li>Moderate protein intake (20-25% of calories)</li>
                        <li>Moderate to high carbohydrates (45-55% of calories)</li>
                        <li>Moderate fat (25-30% of calories)</li>
                        <li>Focus on nutrient-dense whole foods</li>
                        <li>Flexible approach to allow for sustainable eating habits</li>
                      </ul>
                    </div>
                  )}
                  
                  {dietPlanType === "muscleGain" && (
                    <div>
                      <p className="mb-3">This muscle gain diet plan is designed to support muscle growth and strength gains. Key features:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Calorie surplus (300-500 calories above maintenance)</li>
                        <li>High protein intake (25-30% of calories)</li>
                        <li>High carbohydrates (45-55% of calories)</li>
                        <li>Moderate fat (20-25% of calories)</li>
                        <li>Strategic timing of carbohydrates around workouts</li>
                        <li>Multiple protein feedings throughout the day</li>
                        <li>Focus on nutrient-dense whole foods to support recovery</li>
                      </ul>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="shopping" className="mt-0">
                <h2 className="text-2xl font-semibold mb-6">Shopping List</h2>
                
                <Card className="p-6 shadow-md">
                  {/* Extract unique ingredients from all meals */}
                  {(() => {
                    // Get all meals for the selected day
                    const meals = [...dayPlan.meals.breakfast, ...dayPlan.meals.lunch, ...dayPlan.meals.dinner, ...dayPlan.meals.snacks];
                    
                    // Extract all ingredients
                    const allIngredients = meals.flatMap(meal => meal.ingredients);
                    
                    // Group ingredients by category (simplified approach)
                    const categories = {
                      "Proteins": ["chicken", "beef", "fish", "tuna", "salmon", "turkey", "eggs", "tofu", "protein powder", "yogurt", "Greek yogurt", "shrimp"],
                      "Grains": ["rice", "pasta", "bread", "oatmeal", "quinoa", "wrap", "tortilla", "granola"],
                      "Fruits & Vegetables": ["fruit", "banana", "apple", "berries", "vegetables", "broccoli", "spinach", "lettuce", "tomato", "cucumber", "bell pepper", "mushroom", "sweet potato"],
                      "Dairy & Alternatives": ["milk", "cheese", "yogurt", "Greek yogurt", "almond milk"],
                      "Nuts & Seeds": ["nuts", "almond", "walnut", "chia", "seed"],
                      "Oils & Condiments": ["oil", "olive oil", "vinegar", "mayo", "honey", "butter", "sesame oil", "soy sauce", "almond butter", "peanut butter"],
                      "Other": []
                    };
                    
                    const categorizedIngredients: Record<string, string[]> = {
                      "Proteins": [],
                      "Grains": [],
                      "Fruits & Vegetables": [],
                      "Dairy & Alternatives": [],
                      "Nuts & Seeds": [],
                      "Oils & Condiments": [],
                      "Other": []
                    };
                    
                    // Categorize each ingredient
                    allIngredients.forEach(ingredient => {
                      let categorized = false;
                      
                      for (const [category, keywords] of Object.entries(categories)) {
                        if (keywords.some(keyword => ingredient.toLowerCase().includes(keyword))) {
                          if (!categorizedIngredients[category].includes(ingredient)) {
                            categorizedIngredients[category].push(ingredient);
                          }
                          categorized = true;
                          break;
                        }
                      }
                      
                      if (!categorized && !categorizedIngredients["Other"].includes(ingredient)) {
                        categorizedIngredients["Other"].push(ingredient);
                      }
                    });
                    
                    return (
                      <div className="space-y-6">
                        {Object.entries(categorizedIngredients).map(([category, ingredients]) => (
                          ingredients.length > 0 && (
                            <div key={category}>
                              <h3 className="text-lg font-medium mb-2">{category}</h3>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                {ingredients.map((ingredient, index) => (
                                  <li key={index} className="flex items-center">
                                    <input type="checkbox" id={`ingredient-${category}-${index}`} className="mr-2" />
                                    <label htmlFor={`ingredient-${category}-${index}`} className="text-gray-700">{ingredient}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        ))}
                      </div>
                    );
                  })()}
                  
                  <div className="mt-6 text-right">
                    <Button>
                      Print Shopping List
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;
