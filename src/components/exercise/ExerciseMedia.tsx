
import React from "react";

interface ExerciseMediaProps {
  showGif: boolean;
  imageUrl: string;
  gifUrl: string;
  name: string;
}

const ExerciseMedia: React.FC<ExerciseMediaProps> = ({ 
  showGif, 
  imageUrl, 
  gifUrl, 
  name 
}) => {
  if (showGif) {
    return (
      <div className="relative">
        <img 
          src={gifUrl} 
          alt={`${name} demonstration`}
          className="w-full h-56 object-contain rounded-lg bg-gray-50"
        />
      </div>
    );
  }
  
  return (
    <img
      src={imageUrl}
      alt={name}
      className="w-full h-56 object-cover rounded-lg"
    />
  );
};

export default ExerciseMedia;
