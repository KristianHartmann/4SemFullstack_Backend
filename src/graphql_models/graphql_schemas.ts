const typeDefs = `
  type Recipe {
  id: ID!
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
    comment: String
    createdBy: User!
    recipe: Recipe!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    role: String
    password: String!
    createdAt: String!
      recipes: [Recipe!]!
  }

  type AuthPayload {
    token: String!
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
    login(input: LoginInput!): AuthPayload!
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
  token: TokenInput!
}
  
input TokenInput {
  token: String!
}

  input ReviewInput {
    rating: Int!
    comment: String!
    createdBy: ID!
    recipe: ID!
  }


  input UserInput {
    email: String!
    password: String!
    role: String
    recipe: ID

  }
  input CategoryInput {
    category: String!
  }
  
  input LoginInput {
    email: String!
    password: String!
  }

`;

export default typeDefs;
