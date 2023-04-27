type RecipeType = {
  id: string;
  mealHeadline: string;
  instructions: string;
  mealThumbnail: string;
  mealVideo: string;
  createdBy: string;
  ingredients: [IngredientType];
  category: string;
};
type ReviewType = {
  id: string;
  rating: number;
  comment: string;
  recipe: string;
  createdBy: string;
};
type UserType = {
  id: string;
  username: string;
  email: string;
  password: string;
  recipeid: string;
};
type IngredientType = {
  name: string;
  measure: string;
};

type CategoryType = {
  id: string;
  category: string;
  recipeid: string;
};

type Context = {
  recipes: RecipeType[];
  reviews: ReviewType[];
  users: UserType[];
  categories: CategoryType[];
};
type Args = {
  id: string;
  input: RecipeType | ReviewType | UserType | CategoryType | IngredientType;
};
export type {
  RecipeType,
  Context,
  Args,
  ReviewType,
  UserType,
  CategoryType,
  IngredientType,
};
