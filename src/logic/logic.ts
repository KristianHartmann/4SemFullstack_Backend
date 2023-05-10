import { Token } from "graphql";
import jwt_decode from "jwt-decode";
import { TokenPayload } from "../types/types";

export const decodeToken = (token: string) => {
    return jwt_decode(token);
};