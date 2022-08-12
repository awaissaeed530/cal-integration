import { calendar_v3 as Calendar } from "googleapis";
import { GoogleCredentials } from "../entities";
import { getAuthClient } from "./auth";

export async function exportEvents(
  events: Calendar.Schema$Event[],
  credentials: GoogleCredentials
) {
  const auth = getAuthClient();
  auth.setCredentials(credentials);

  const client = new Calendar.Calendar({ auth });
  const calendars = await client.calendarList.list();
  const primaryCalendar = calendars.data.items?.find(
    (calendar) => calendar.primary
  );

  const eventPromises = events.map((event) =>
    client.events.insert({
      calendarId: primaryCalendar?.id as string,
      requestBody: event,
      auth,
    })
  );
  return Promise.all(eventPromises);
}
