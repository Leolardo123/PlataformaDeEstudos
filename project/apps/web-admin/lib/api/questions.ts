import { apiRequest } from "./core";
import type { RecordStatus } from "./status";

export type QuestionResource = {
  id: string;
  statement: string;
  status: RecordStatus;
  topics: Array<{ topic: { id: string; name: string } }>;
};

export const questionsApi = {
  list(accessToken: string) {
    return apiRequest<QuestionResource[]>("/questions", undefined, accessToken);
  },
  create(accessToken: string, payload: { statement: string }) {
    return apiRequest<QuestionResource>(
      "/questions",
      {
        method: "POST",
        body: JSON.stringify({ statement: payload.statement, status: "DRAFT" }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: { statement: string }) {
    return apiRequest<QuestionResource>(
      `/questions/${id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
      accessToken,
    );
  },
  delete(accessToken: string, id: string) {
    return apiRequest(`/questions/${id}`, { method: "DELETE" }, accessToken);
  },
};
