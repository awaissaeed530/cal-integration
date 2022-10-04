export interface GoogleCredentials {
  id?: string;
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
  createdOn: Date;
}
