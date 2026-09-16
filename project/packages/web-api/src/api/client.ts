import { authApi } from "./auth";
import { flashcardsApi } from "./flashcards";
import { noticesApi } from "./notices";
import { questionsApi } from "./questions";
import { subjectsApi } from "./subjects";
import { topicsApi } from "./topics";
import { userApi } from "./user";

export const apiClient = {
  auth: authApi,
  subjects: subjectsApi,
  topics: topicsApi,
  notices: noticesApi,
  questions: questionsApi,
  flashcards: flashcardsApi,
  user: userApi,
};
