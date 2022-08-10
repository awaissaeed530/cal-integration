import { calendar_v3 as Calendar } from "googleapis";
import { Credentials, ICourse } from "../entities";
import { getAuthClient } from "./auth";

export async function exportEvents(
  courses: ICourse[],
  credentials: Credentials
) {
  const auth = getAuthClient();

  const { tokens } = await auth.getToken(credentials.code);
  auth.setCredentials(tokens);

  const client = new Calendar.Calendar({ auth });
  const calendars = await client.calendarList.list();
  const primaryCalendar = calendars.data.items?.find(
    (calendar) => calendar.primary
  );
  return client.events.list({
    calendarId: primaryCalendar?.id as string,
  });
}
