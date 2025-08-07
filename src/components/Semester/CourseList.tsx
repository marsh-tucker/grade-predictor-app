import { CoursePropsList } from "./types"


const CoursePanel: React.FC<CoursePropsList> = ({ courses, semId, courseDelete }) => {
  if (courses.length === 0) return (<p className="text-muted">No courses added yet.</p>);

  // This defines the width for the delete button column.
  // Using a variable makes it easy to ensure the header and rows match.
  const deleteColumnWidth = '50px';
  const centerItems = 'justify-content-center';

  return (
    <div className="mt-2">
      {/* Header row */}
      <div className="row text-center  fw-bold mb-2">
        <div className="col">Course Name</div>
        <div className="col">Grade</div>
        <div className="col">Credit Hours</div>
        <div style={{ width: deleteColumnWidth }}>

        </div>
      </div>

      {/* Course rows */}
      {courses.map(c => (
        <div key={c.id} className="row text-center align-items-center mb-1">
          <div className="col">{c.name}</div>
          <div className="col">{c.grade}</div>
          <div className="col">{c.creditHours}</div>
          {/* delete column */}
          <div className="col-auto d-flex justify-content-center " style={{width: deleteColumnWidth}}>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => courseDelete(semId, c.id)}
            >
              <i className="bi bi-trash"></i>  {/* adds trash can icon using bootstrap-icon */}
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default CoursePanel;