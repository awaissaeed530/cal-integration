import { Auth } from "googleapis";
import { environment } from "../environments";

export namespace GoogleAPIs {
  export function getAuthUrl(): string {
    const credentials = environment.google;

    const authClient = new Auth.OAuth2Client({
      clientId: credentials.client_id,
      clientSecret: credentials.client_secret,
      redirectUri: credentials.redirect_uris[0],
    });
    return authClient.generateAuthUrl({
      scope: ["https://www.googleapis.com/auth/calendar.events"],
    });
  }
}
