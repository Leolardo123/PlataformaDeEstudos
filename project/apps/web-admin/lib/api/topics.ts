import { apiRequest } from "./core";
import type { RecordStatus } from "./status";

export type TopicResource = {
  id: string;
  name: string;
  description: string | null;
  contentRichText?: string | null;
  contentPdfUrls?: string[];
  contentVideoUrls?: string[];
  contentLinkUrls?: string[];
  order?: number | null;
  status: RecordStatus;
  subjectId: string;
  subject?: {
    id: string;
    name: string;
    notices?: Array<{ notice: { id: string; title: string } }>;
  };
};

export type CreateTopicPayload = {
  name: string;
  description?: string;
  contentRichText?: string;
  contentPdfUrls?: string[];
  contentVideoUrls?: string[];
  contentLinkUrls?: string[];
  order?: number;
  status?: RecordStatus;
  subjectId: string;
};

export type UpdateTopicPayload = {
  name?: string;
  description?: string;
  contentRichText?: string;
  contentPdfUrls?: string[];
  contentVideoUrls?: string[];
  contentLinkUrls?: string[];
  order?: number;
  status?: RecordStatus;
  subjectId?: string;
};

export const topicsApi = {
  list(accessToken: string) {
    return apiRequest<TopicResource[]>("/topics", undefined, accessToken);
  },
  create(accessToken: string, payload: CreateTopicPayload) {
    return apiRequest<TopicResource>(
      "/topics",
      {
        method: "POST",
        body: JSON.stringify({ ...payload, status: payload.status ?? "DRAFT" }),
      },
      accessToken,
    );
  },
  update(accessToken: string, id: string, payload: UpdateTopicPayload) {
    return apiRequest<TopicResource>(
      `/topics/${id}`,
      { method: "PATCH", body: JSON.stringify(payload) },
      accessToken,
    );
  },
  delete(accessToken: string, id: string) {
    return apiRequest(`/topics/${id}`, { method: "DELETE" }, accessToken);
  },
};
