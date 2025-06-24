"use client";

import React from "react";

interface MovementCardProps {
  movement: Movement;
}

export interface Movement {
  id: string;
  title: string;
  description: string;
  styles?: {
    container: string,
    title: string,
    desciption: string,
  }
}

const MovementCard: React.FC<MovementCardProps> = ({ movement }) => {

  return (
    <div key={movement.id} 
    className={`
    flex flex-col w-full bg-gray-200 rounded-xl shadow-md p-4 m-4
    
    `} >
      <h1>{movement.title}</h1>
      <p className="text-xs" >
        {movement.description}
      </p>
    </div>
  );
};

export default MovementCard;
