
export type Movement = {
  title: string;
  description: string;
};

export type Exercise = Movement & {
  reps: number;
  sets: number;
};

// Workout type for storage
export type Workout = {
  id: string;
  title: string;
  workouts: Exercise[];
};

// Enum for training emphasis
export enum TrainingEmphasis {
  MUSCLE_SIZE = "muscle_size",
  MUSCLE_STRENGTH = "muscle_strength",
  MUSCLE_ENDURANCE = "muscle_endurance",
  MUSCLE_SHAPE = "muscle_shape",
}

export type Exerciser = {
  id: string;
  user_id: string;

  programs: Workout[];             
  training_emphasis: TrainingEmphasis;
  height_cm: number;
  weight_kg: number;
  body_fat_percentage: number;
  weekly_workout_frequency: number;

  created_at: string;
  updated_at: string;

};


/*
Push-Up,
Sit-Up,
Pull-Up,
Chin-Up,
Crunch 
Bench Press (bar/dumbbell/machine)
Bicep Curl (bar/dumbbell/machine)
Lunge
Bulgarian Split Squat
Back Squat  (bar/machine)
Front Squat (bar/machine)
Deadlift
Romanian Dead Lift
Hamstring Curl 
Bent Over Row (bar/dumbbell/machine)
Forearm Curls
Calf Raises
Lat Pulldown
Leg Press
Box Jump
Preacher Curls (bar/dumbbell/machine)
Spider Curls (bar/dumbbell/machine)
*/