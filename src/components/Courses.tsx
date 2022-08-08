import { courseList, ICourse } from "../models";
import {
  formatDateWithSessionTime,
  generateIcs,
  getCourseStartDay,
  UrlBuilder,
} from "../utils";
import Dropdown from "react-bootstrap/Dropdown";

function Courses() {
  const courses = courseList;

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

  const exportAll = () => {
    generateIcs(courses, true);
  };

  return (
    <div className="p-3">
      <div className="container-fluid">
        <button className="mb-3 btn btn-primary" onClick={exportAll}>
          Export All
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
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
