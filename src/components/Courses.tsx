import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation, useSearchParams } from "react-router-dom";
import { courseList, GoogleCredentials, ICourse } from "../models";
import {
  formatDateWithSessionTime,
  generateIcs,
  getCourseStartDay,
  normalizeDate,
  UrlBuilder
} from "../utils";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Courses() {
  const courses = courseList;
  const query = useQuery();
  const [message, setMessage] = useState("");
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = query.get("code") as string;
    const scope = query.get("scope") as string;

    if (code && scope) {
      saveGoogleCredentials({ code, scope }).then(() => {
        setMessage("Google Account has been authorized. Please export again");
        setSearchParams([]);
      });
    }
  }, [query, setSearchParams]);

  const exportToOutlookWeb = (course: ICourse) => {
    const courseStartDay = getCourseStartDay(course);
    const url = new UrlBuilder()
      .baseUrl("https://outlook.live.com")
      .path("calendar/0/deeplink/compose")
      .param("path", "/calendar/action/compose")
      .param("rru", "addevent")
      .param(
        "startdt",
        formatDateWithSessionTime(
          course.start_time,
          courseStartDay
        ).toISOString()
      )
      .param(
        "enddt",
        formatDateWithSessionTime(course.end_time, courseStartDay).toISOString()
      )
      .param("subject", course.title)
      .param("body", course.description)
      .param("location", course.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportToOutlook = (course: ICourse) => {
    generateIcs([course]);
  };

  const exportToGoogle = (course: ICourse) => {
    const courseStartDay = getCourseStartDay(course);
    const startDate = normalizeDate(
      formatDateWithSessionTime(course.start_time, courseStartDay)
    );
    const endDate = normalizeDate(
      formatDateWithSessionTime(course.end_time, courseStartDay)
    );

    const url = new UrlBuilder()
      .baseUrl("https://calendar.google.com")
      .path("calendar/render")
      .param("action", "TEMPLATE")
      .param("dates", `${startDate}/${endDate}`)
      .param("text", course.title)
      .param("details", course.description)
      .param("location", course.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportAll = () => {
    generateIcs(courses, true);
  };

  const authenticateGoogle = async () => {
    const url = await fetch("http://localhost:3001/auth").then((res) =>
      res.text()
    );
    window.open(url, "_system");
  };

  const getGoogleCredentials = () => {
    return fetch("http://localhost:3001/credentials")
      .then((res) => res.json())
      .then((credentials) => credentials as GoogleCredentials);
  };

  const saveGoogleCredentials = (credentails: {
    code: string;
    scope: string;
  }) => {
    return fetch("http://localhost:3001/credentials", {
      body: JSON.stringify(credentails),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((credentails) => credentails as GoogleCredentials);
  };

  const exportGoogleEvents = async (
    courses: ICourse[],
    credentials: GoogleCredentials
  ) => {
    const events = courses.map((course) => {
      const courseStartDay = getCourseStartDay(course);
      const startDate = formatDateWithSessionTime(
        course.start_time,
        courseStartDay
      ).toISOString();
      const endDate = formatDateWithSessionTime(
        course.end_time,
        courseStartDay
      ).toISOString();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      return {
        summary: course.title,
        location: course.location,
        description: course.description,
        start: { dateTime: startDate, timeZone },
        end: { dateTime: endDate, timeZone },
        recurrence: [
          `RRULE:FREQ=WEEKLY;UNTIL=${normalizeDate(course.end_date)}Z`,
        ],
      };
    });

    return fetch("http://localhost:3001/events", {
      body: JSON.stringify({ events, credentials }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((events) => console.log(events));
  };

  const exportAllGoogle = async () => {
    try {
      const credentials = await getGoogleCredentials();
      await exportGoogleEvents(courseList, credentials);
      setMessage("Events have been added to Google Calendar");
    } catch (e) {
      authenticateGoogle();
    }
  };

  return (
    <div className="p-3">
      <div className="container-fluid">
        <Dropdown>
          <Dropdown.Toggle variant="primary">Export All</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={exportAll}>Outlook (Desktop)</Dropdown.Item>
            <Dropdown.Item onClick={exportAllGoogle}>Google</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <button className="my-3 btn btn-primary" onClick={authenticateGoogle}>
          Authorize Google
        </button>

        <div className="row">
          {courses.map((course) => (
            <div className="col-4" key={course.title}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary">Export</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => exportToOutlookWeb(course)}>
                        Outlook (Web)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => exportToOutlook(course)}>
                        Outlook (Desktop)
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => exportToGoogle(course)}>
                        Google
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-success">{message}</p>
    </div>
  );
}

export default Courses;
