
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Dumbbell, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import ExerciseCard from "@/components/ExerciseCard";

// Exercise data structure
interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  instructions: string;
  imageUrl: string;
  gifUrl: string; // Updated from videoUrl to gifUrl
}

// Example exercise data
const exercisesData: Exercise[] = [
  {
    id: "ex1",
    name: "Push-ups",
    category: "strength",
    muscle: "chest",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Place your hands on the ground slightly wider than shoulder-width apart. Keep your body in a straight line from head to toe. Lower your body until your chest nearly touches the floor, then push yourself back up.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gifUrl: "https://media.giphy.com/media/7eAvzJ0SBBzHy/giphy.gif"
  },
  {
    id: "ex2",
    name: "Squats",
    category: "strength",
    muscle: "legs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Stand with feet shoulder-width apart. Bend your knees and lower your hips as if sitting in a chair. Keep your chest up and knees over (not past) your toes. Return to standing position.",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    gifUrl: "https://media.giphy.com/media/1YhafU1NFtJ1HD2RFV/giphy.gif"
  },
  {
    id: "ex3",
    name: "Plank",
    category: "strength",
    muscle: "core",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Get into a push-up position, but with your weight on your forearms. Keep your body in a straight line from head to heels. Engage your core and hold the position.",
    imageUrl: "https://images.unsplash.com/photo-1566241142404-6c2bb4201a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gifUrl: "https://media.giphy.com/media/dYfKwW7pDqFKU/giphy.gif"
  },
  {
    id: "ex4",
    name: "Lunges",
    category: "strength",
    muscle: "legs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: "Stand with feet hip-width apart. Step forward with one leg and lower your body until both knees are bent at 90-degree angles. Push back to starting position and repeat with the other leg.",
    imageUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    gifUrl: "https://media.giphy.com/media/xT8qBff8cRRFf7k2u4/giphy.gif"
  },
  {
    id: "ex5",
    name: "Dumbbell Bench Press",
    category: "strength",
    muscle: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: "Lie on a bench with a dumbbell in each hand. Push the dumbbells up until your arms are extended, then lower them back to chest level.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gifUrl: "https://media.giphy.com/media/3o7TKNqGIBTuXgfmUw/giphy.gif"
  },
  {
    id: "ex6",
    name: "Jogging",
    category: "cardio",
    muscle: "full body",
    equipment: "none",
    difficulty: "beginner",
    instructions: "Run at a steady pace, maintaining good posture with your back straight and shoulders relaxed. Land on the middle of your foot and roll forward to push off with your toes.",
    imageUrl: "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    gifUrl: "https://media.giphy.com/media/l3q2Q3sUEkEyDvfPO/giphy.gif"
  },
  {
    id: "ex7",
    name: "Cycling",
    category: "cardio",
    muscle: "legs",
    equipment: "bicycle",
    difficulty: "beginner",
    instructions: "Adjust the seat height so your legs are almost fully extended at the bottom of the pedal stroke. Maintain a steady cadence and control your breathing.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gifUrl: "https://media.giphy.com/media/fLfcYGY0kvS2tpV5hZ/giphy.gif"
  },
  {
    id: "ex8",
    name: "Jumping Jacks",
    category: "cardio",
    muscle: "full body",
    equipment: "none",
    difficulty: "beginner",
    instructions: "Stand with your feet together and arms at your sides. Jump to spread your feet shoulder-width apart while raising your arms above your head. Jump back to the starting position.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gifUrl: "https://media.giphy.com/media/ZNnoHaTv3AJYkwgJj8/giphy.gif"
  }
];

const muscleGroups = ["chest", "back", "legs", "arms", "shoulders", "core", "full body"];
const equipmentTypes = ["bodyweight", "dumbbell", "barbell", "machine", "cable", "kettlebell", "resistance band", "bicycle", "none"];
const difficultyLevels = ["beginner", "intermediate", "advanced"];

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [favoriteExercises, setFavoriteExercises] = useState<string[]>([]);

  const toggleFavorite = (exerciseId: string) => {
    setFavoriteExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId) 
        : [...prev, exerciseId]
    );
  };

  const filterExercises = (exercises: Exercise[], category: string) => {
    return exercises
      .filter(exercise => 
        (category === "all" || exercise.category === category) &&
        (exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!selectedMuscle || exercise.muscle === selectedMuscle) &&
        (!selectedEquipment || exercise.equipment === selectedEquipment) &&
        (!selectedDifficulty || exercise.difficulty === selectedDifficulty)
      );
  };

  const getFavorites = () => {
    return exercisesData.filter(exercise => favoriteExercises.includes(exercise.id));
  };

  const clearFilters = () => {
    setSelectedMuscle(null);
    setSelectedEquipment(null);
    setSelectedDifficulty(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 pb-10 px-4">
        <h1 className="text-3xl font-bold text-ufit-primary mb-6">Exercise Library</h1>
        
        {/* Search and filters */}
        <Card className="p-4 mb-8 shadow-md">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search exercises..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Muscle Group</label>
              <select 
                className="w-full p-2 border rounded-md text-sm"
                value={selectedMuscle || ""}
                onChange={(e) => setSelectedMuscle(e.target.value || null)}
              >
                <option value="">All muscle groups</option>
                {muscleGroups.map(muscle => (
                  <option key={muscle} value={muscle}>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Equipment</label>
              <select 
                className="w-full p-2 border rounded-md text-sm"
                value={selectedEquipment || ""}
                onChange={(e) => setSelectedEquipment(e.target.value || null)}
              >
                <option value="">All equipment</option>
                {equipmentTypes.map(equipment => (
                  <option key={equipment} value={equipment}>{equipment.charAt(0).toUpperCase() + equipment.slice(1)}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select 
                className="w-full p-2 border rounded-md text-sm"
                value={selectedDifficulty || ""}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              >
                <option value="">All levels</option>
                {difficultyLevels.map(level => (
                  <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          
          {(selectedMuscle || selectedEquipment || selectedDifficulty || searchTerm) && (
            <button 
              className="mt-3 text-sm text-ufit-accent hover:underline"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          )}
        </Card>
        
        {/* Exercise tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-white">
              <Dumbbell className="mr-2 h-4 w-4" />
              All Exercises
            </TabsTrigger>
            <TabsTrigger value="strength" className="data-[state=active]:bg-white">
              <Dumbbell className="mr-2 h-4 w-4" />
              Strength
            </TabsTrigger>
            <TabsTrigger value="cardio" className="data-[state=active]:bg-white">
              <Heart className="mr-2 h-4 w-4" />
              Cardio
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-white">
              <Heart className="mr-2 h-4 w-4 fill-current" />
              Favorites
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterExercises(exercisesData, "all").map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isFavorite={favoriteExercises.includes(exercise.id)}
                  onToggleFavorite={() => toggleFavorite(exercise.id)}
                />
              ))}
              
              {filterExercises(exercisesData, "all").length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No exercises match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="strength" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterExercises(exercisesData, "strength").map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isFavorite={favoriteExercises.includes(exercise.id)}
                  onToggleFavorite={() => toggleFavorite(exercise.id)}
                />
              ))}
              
              {filterExercises(exercisesData, "strength").length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No strength exercises match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cardio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterExercises(exercisesData, "cardio").map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isFavorite={favoriteExercises.includes(exercise.id)}
                  onToggleFavorite={() => toggleFavorite(exercise.id)}
                />
              ))}
              
              {filterExercises(exercisesData, "cardio").length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">No cardio exercises match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFavorites().map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(exercise.id)}
                />
              ))}
              
              {getFavorites().length === 0 && (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500">You haven't added any exercises to your favorites yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Exercises;
