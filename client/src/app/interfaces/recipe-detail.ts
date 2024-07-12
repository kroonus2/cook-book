export interface RecipeDetails {
  id: number;
  name: string;
  description: string;
  instructions: string;
  preparation_time: number;
  difficulty: string;
  user_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  status: string;
}


export interface NewRecipeDetails{
  name: string;
  description: string;
  instructions: string;
  preparation_time: number;
  difficulty: string;
  user_id: number;
  category_id: number;
}