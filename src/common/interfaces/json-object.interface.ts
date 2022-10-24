export type JsonValue = string | number | boolean;

export interface JsonObject {
  [k: string]: JsonValue | JsonValue[] | JsonObject;
}

export type accessToken = {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: 'Bearer' | string;
}