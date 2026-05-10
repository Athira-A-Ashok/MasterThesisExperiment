import { storage } from "../utils/storage";

export const initialState = {
  todos: storage.load(),
  filter: "ALL",
};