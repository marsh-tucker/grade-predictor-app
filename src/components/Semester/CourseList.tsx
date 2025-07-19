import { CoursePropsList } from "./types"


const CoursePanel: React.FC<CoursePropsList> = ({ courses }) => {
    if (courses.length === 0) return (<p className="text-muted">No courses added yet.</p>);

    return (
        <div className="mt-2">
          {/* Header row */}
          <div className="row text-center fw-bold mb-2">
            <div className="col">Course Name</div>
            <div className="col">Grade</div>
            <div className="col">Credit Hours</div>
          </div>

          {/* Course rows */}
          {courses.map(c => (
            <div key={c.id} className="row text-center mb-1">
              <div className="col">{c.name}</div>
              <div className="col">{c.grade}</div>
              <div className="col">{c.creditHours}</div>
            </div>
          ))}
        </div>
      );
    };

export default CoursePanel;