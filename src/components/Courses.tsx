import { courseList } from "../models/courses";
import { ICourse } from "../models/ICourse";
import { UrlBuilder } from "../utils";

function Courses() {
  const courses = courseList;
  const exportToOutlook = (course: ICourse) => {
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

  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {courses.map((course) => (
        <div className="bg-white shadow-lg rounded-md p-4" key={course.title}>
          <div className="text-lg font-medium">{course.title}</div>
          <div className="text-sm text-gray-500">{course.description}</div>
          <button
            className="border py-1 px-2 rounded mt-2"
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
