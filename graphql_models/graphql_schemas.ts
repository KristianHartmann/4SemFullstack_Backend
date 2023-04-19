const typeDefs = `#graphql

type Recipe {
  _id: ID!
  mealHeadline: String!
  category: String!
  instructions: String!
  mealThumbnail: String
  mealVideo: String
  createdBy: User!
  ingredients: [Ingredient!]!
  reviews: [Review!]
  createdAt: String!
}

type Ingredient {
  name: String!
  measure: String
}

type Review {
  _id: ID!
  review: String!
  rating: Float
  createdAt: String!
}

type ShoppingList {
  _id: ID!
  ingredients: [Ingredient!]!
}

type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  role: String!
  profilePicture: String!
  createdAt: String!
  savedRecipes: [Recipe!]
  shoppingList: ShoppingList
}

type Query {
  recipe(_id: ID!): Recipe
  recipes: [Recipe!]
  review(_id: ID!): Review
  reviews: [Review!]
  shoppingList(_id: ID!): ShoppingList
  user(_id: ID!): User
  users: [User!]
}

type Mutation {
  createRecipe(
    mealHeadline: String!
    category: String!
    instructions: String!
    mealThumbnail: String
    mealVideo: String
    ingredients: [IngredientInput!]!
  ): Recipe!
  updateRecipe(
    _id: ID!
    mealHeadline: String
    category: String
    instructions: String
    mealThumbnail: String
    mealVideo: String
    ingredients: [IngredientInput!]
  ): Recipe!
  deleteRecipe(_id: ID!): Recipe!
  createReview(review: String!, rating: Float): Review!
  updateReview(_id: ID!, review: String, rating: Float): Review!
  deleteReview(_id: ID!): Review!
  createShoppingList(ingredients: [IngredientInput!]!): ShoppingList!
  updateShoppingList(_id: ID!, ingredients: [IngredientInput!]): ShoppingList!
  deleteShoppingList(_id: ID!): ShoppingList!
  createUser(
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  ): User!
  updateUser(
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    profilePicture: String
    savedRecipes: [ID!]
    shoppingList: ID
  ): User!
  deleteUser(_id: ID!): User!
}

input IngredientInput {
  name: String!
  measure: String
}


`;

export default typeDefs;
