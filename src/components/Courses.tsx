import { courseList, ICourse } from "../models";
import { generateIcs, UrlBuilder } from "../utils";

function Courses() {
  const courses = courseList;
  const exportToOutlookWeb = (course: ICourse) => {
    const url = new UrlBuilder()
      .baseUrl("https://outlook.live.com")
      .path("calendar/0/deeplink/compose")
      .param("path", "/calendar/action/compose")
      .param("rru", "addevent")
      .param("startdt", course.start_date.toISOString())
      .param("enddt", course.end_date.toISOString())
      .param("subject", course.title)
      .param("body", course.description)
      .param("location", course.location)
      .build();

    window.open(url.toString())?.focus();
  };

  const exportToOutlook = (course: ICourse) => {
    generateIcs(course);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      {courses.map((course) => (
        <div className="p-4 bg-white rounded-md shadow-lg" key={course.title}>
          <div className="text-lg font-medium">{course.title}</div>
          <div className="text-sm text-gray-500">{course.description}</div>
          <button
            className="px-2 py-1 mt-2 border rounded"
            onClick={() => exportToOutlookWeb(course)}
          >
            Export To Outlook Web
          </button>
          <button
            className="px-2 py-1 mt-2 border rounded"
            onClick={() => exportToOutlook(course)}
          >
            Export To Outlook
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;
