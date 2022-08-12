import { Auth } from "googleapis";
import { environment } from "../environments";

export function getAuthUrl(): string {
  const authClient = getAuthClient();

  return authClient.generateAuthUrl({
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    access_type: "offline",
  });
}

export function getAuthClient() {
  const credentials = environment.google;

  return new Auth.OAuth2Client({
    clientId: credentials.client_id,
    clientSecret: credentials.client_secret,
    redirectUri: credentials.redirect_uris[0],
  });
}
