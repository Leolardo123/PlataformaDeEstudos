import { apiRequest } from "./core";
import type { RecordStatus } from "./status";

export type QuestionResource = {
  id: string;
  statement: string;
  explanation?: string | null;
  status: RecordStatus;
  topics: Array<{ topic: { id: string; name: string } }>;
};

export type CreateQuestionPayload = {
  statement: string;
  explanation?: string;
  status?: RecordStatus;
  topicIds?: string[];
};

export type UpdateQuestionPayload = {
  statement?: string;
  explanation?: string;
  status?: RecordStatus;
  topicIds?: string[];
};

export const questionsApi = {
  list(accessToken: string) {
    return apiRequest<QuestionResource[]>("/questions", undefined, accessToken);
  },
  create(accessToken: string, payload: CreateQuestionPayload) {
    return apiRequest<QuestionResource>(
      "/questions",
      {
        method: "POST",
        body: JSON.stringify({
          statement: payload.statement,
          explanation: payload.explanation,
          topicIds: payload.topicIds,
          status: payload.status ?? "DRAFT",
        }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: UpdateQuestionPayload) {
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
