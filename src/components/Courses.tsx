import { courseList } from "../models/courses";
import { ICourse } from "../models/ICourse";

function Courses() {
  const courses = courseList;
  const exportToOutlook = (course: ICourse) => {
    const url = new URL(
      "calendar/0/deeplink/compose",
      "https://outlook.live.com"
    );
    url.searchParams.append("path", "/calendar/action/compose");
    url.searchParams.append("rru", "addevent");
    url.searchParams.append("startdt", course.start_date.toUTCString());
    url.searchParams.append("enddt", course.end_date.toUTCString());
    url.searchParams.append("subject", course.title);
    url.searchParams.append("body", course.description);
    url.searchParams.append("location", course.location);

    window.open(url.toString());
  };

  return (
    <div className="p-8 grid grid-cols-4 gap-4">
      {courses.map((course) => (
        <div className="bg-white shadow-lg rounded-md p-4" key={course.title}>
          <div className="text-lg font-medium">{course.title}</div>
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
