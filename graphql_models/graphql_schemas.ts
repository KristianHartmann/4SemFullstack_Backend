const typeDefs = `
  type Recipe {
    id: ID!
    mealHeadline: String!
    category: String!
    instructions: String!
    mealThumbnail: String
    mealVideo: String
    createdBy: User
    ingredients: [Ingredient!]!
    reviews: [Review!]!
    createdAt: String!
  }

  type Ingredient {
    name: String!
    measure: String
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    author: User!
    recipe: Recipe!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type Error {
    field: String!
  }

  type Query {
    getRecipeByID(id: ID!): Recipe
    getAllRecipes: [Recipe!]!
  }

  input IngredientInput {
    name: String!
    measure: String
  }

  input RecipeInput {
    mealHeadline: String!
    category: String!
    instructions: String!
    mealThumbnail: String
    mealVideo: String
    createdBy: ID
    ingredients: [IngredientInput!]!
  }

  type Mutation {
    createRecipe(input: RecipeInput!): Recipe!
    updateRecipe(id: ID!, input: RecipeInput!): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

export default typeDefs;
