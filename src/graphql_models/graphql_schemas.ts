const typeDefs = `
  type Recipe {
  mealHeadline: String!
  category: Category!
  instructions: String!
  mealThumbnail: String!
  mealVideo: String!
  createdBy: User!
  ingredients: [Ingredient!]!
  reviews: [Review!]!
} 

type Ingredient {
  name: String!
  measure: String!
}

 type Category {
    id: ID!
    category: String!
    recipes: [Recipe!]!
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
    email: String!
    password: String!
    createdAt: String!
  }

  type Query {
  recipe(id: ID!): Recipe
  review(id: ID!): Review
  user(id: ID!): User
  recipes: [Recipe!]!
  reviews: [Review!]!
  users: [User!]!
  categories: [Category!]!
  category(id: ID!): Category
  }

  type Mutation {
    createRecipe(input: RecipeInput!): Recipe!
    createReview(input: ReviewInput!): Review!
    createUser(input: UserInput!): User!
    createCategory(input: CategoryInput!): Category!
  }

    input IngredientInput {
    name: String!
    measure: String!
  }

  input RecipeInput {
  mealHeadline: String!
  category: ID!
  instructions: String!
  mealThumbnail: String!
  mealVideo: String!
  createdBy: ID!
  ingredients: [IngredientInput!]!
}

  input ReviewInput {
    rating: Int!
    comment: String!
    author: ID!
    recipe: ID!
  }

  input UserInput {
    email: String!
    password: String!
  }
  input CategoryInput {
    category: String!
    recipe: ID
  }

`;

export default typeDefs;
