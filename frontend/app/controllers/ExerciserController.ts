import axios, { AxiosResponse } from 'axios';
import { Exerciser, Movement, Workout, Exercise } from '../types/Exerciser';  // Add Workout, Exercise types as needed
import { getAuthHeaders, extractErrorMessage } from '../utils/apiUtils';

interface GetExerciserResponse {
  message: string;
  data: { exerciser: Exerciser };
}

interface UpdateExerciserResponse {
  message: string;
  data: Exerciser;
}

interface GetMovementsResponse {
  message: string;
  data: Movement[];
}

interface AddWorkoutResponse {
  message: string;
  data: Workout[];
}

interface GetProgramsResponse {
  message: string;
  data: Workout[];
}

interface UpdateWorkoutResponse {
  message: string;
  data: Workout[];
}

interface DeleteWorkoutResponse {
  message: string;
  data: Workout[];
}

// Get Exerciser details for logged-in user
const getExerciser = async (): Promise<AxiosResponse<GetExerciserResponse>> => {
  try {
    const response = await axios.get('/exercisers', { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Get exerciser failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to get exerciser: ${message}`);
  }
};

// Update Exerciser info for logged-in user
const updateExerciser = async (
  dto: Partial<Exerciser>
): Promise<AxiosResponse<UpdateExerciserResponse>> => {
  try {
    const response = await axios.put('/exercisers', dto, { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Update exerciser failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to update exerciser: ${message}`);
  }
};

// Get all available Movements
const getMovements = async (): Promise<AxiosResponse<GetMovementsResponse>> => {
  try {
    const response = await axios.get('/exercisers/movements', { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Get movements failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to get movements: ${message}`);
  }
};

// Add a new Workout program
// dto expects: workout: Exercise[]
const addWorkout = async (
  workout: Exercise[]
): Promise<AxiosResponse<AddWorkoutResponse>> => {
  try {
    const response = await axios.post(
      '/exercisers/programs',
      { workout },
      { headers: getAuthHeaders() }
    );
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Add workout failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to add workout: ${message}`);
  }
};

// Get all Workout programs
const getPrograms = async (): Promise<AxiosResponse<GetProgramsResponse>> => {
  try {
    const response = await axios.get('/exercisers/programs', { headers: getAuthHeaders() });
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Get programs failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to get programs: ${message}`);
  }
};

// Update a Workout program at specified index
const updateWorkout = async (
  index: number,
  workout: Exercise[]
): Promise<AxiosResponse<UpdateWorkoutResponse>> => {
  try {
    const response = await axios.put(
      '/exercisers/programs',
      { index, workout },
      { headers: getAuthHeaders() }
    );
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Update workout failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to update workout: ${message}`);
  }
};

// Delete a Workout program at specified index
const deleteWorkout = async (
  index: number
): Promise<AxiosResponse<DeleteWorkoutResponse>> => {
  try {
    const response = await axios.delete(
      '/exercisers/programs',
      {
        headers: getAuthHeaders(),
        data: { index }, // Axios requires `data` for DELETE request body
      }
    );
    return response;
  } catch (error) {
    const message = extractErrorMessage(error);
    console.error('🔴 Delete workout failed:', message);
    if (axios.isAxiosError(error) && error.response) {
      console.error('🔴 Axios response data:', error.response.data);
    }
    throw new Error(`Failed to delete workout: ${message}`);
  }
};

const ExerciserController = () => {
  return {
    getExerciser,
    updateExerciser,
    getMovements,
    addWorkout,
    getPrograms,
    updateWorkout,
    deleteWorkout,
  };
};

export default ExerciserController;
