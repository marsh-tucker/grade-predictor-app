import React from 'react';
import { useState } from 'react';
//import SemesterPanel
import SemesterPanel from './components/Semester/SemesterList';
//import components for semester panel
import { Semester } from './components/Semester/types';
import './css/App.css';
import { Course } from './components/Semester/types';
import GPAOverview from './components/Semester/gpaOverviewList';



function App() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [showGPAOverview, setShowGPAOverview] = useState(false);


  function addSemester() {
    const newSemester: Semester = {
      id: semesters.length + 1,
      name: `Semester ${semesters.length + 1}`,
      isFuture: false,
      courses: [],
    };
    setSemesters([...semesters, newSemester]);
  }

  function IsFutureSemester(id: number, selection: string) {
    const updatedSemesters = semesters.map((sem) =>
      sem.id === id ? { ...sem, isFuture: selection === "Planned" } : sem
    );
    setSemesters(updatedSemesters);
  }

  function addCourseToSemester(
    semId: number,
    name: string,
    hours: string,
    grade: string
  ) {
    // Build a new Course object
    const newCourse: Course = {
      id:
        semesters
          .find(s => s.id === semId)!
          .courses.reduce((max, c) => Math.max(max, c.id), 0) + 1,

      name,
      creditHours: Number(hours),
      grade
    };
    // Make a new semesters array with just that semester updated with it's new course
    const updated = semesters.map(sem =>
      sem.id === semId
        ? { ...sem, courses: [...sem.courses, newCourse] }
        : sem
    );

    // Replace old state → React re-renders the semester component
    setSemesters(updated);
  }

  function deleteCourseFromSemester(semId: number, courseID: number) {
    const newSemesters = semesters.map((OGsem => OGsem.id === semId ? ({
      ...OGsem,
      courses: OGsem.courses.filter(c => c.id !== courseID)
    }) : OGsem))
    console.log(`course ${courseID} deleted successfully`)
    setSemesters(newSemesters);
  };

  const calcOverallGPA = React.useCallback(() => {
    const gradeScale: Record<string, number> = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D": 1.0, "F": 0.0,
    };

    let curPts = 0, curCred = 0;
    let futPts = 0, futCred = 0;
    /* loop through each semester, then inside each semester calculate the weight of each course
       and add it to current or future totals */
    semesters.forEach(sem => {
      sem.courses.forEach(c => {
        const pts = gradeScale[c.grade] * c.creditHours;
        if (sem.isFuture) {
          futPts += pts;
          futCred += c.creditHours;
        } else {
          curPts += pts;
          curCred += c.creditHours;
        }
      });
    });

    const gpa = (pts: number, cred: number) =>
      cred === 0 ? 0 : Number((pts / cred).toFixed(2));

    return {
      currentGPA: gpa(curPts, curCred),
      futureGPA: gpa(futPts, futCred),
      predictedGPA: gpa(curPts + futPts, curCred + futCred)
    };
  }, [semesters]);

  return (
    <div className="parent-main-content" style={{ fontFamily: "Arial" }}>

      <div className="navbar-content">
        <nav className="navbar fixed-top navbar-light custom-blue">
          <div className="container justify-content-center">
            <a className="navbar-brand text-white" href="#">
              <h2 className="navbar-app-title"> 📚 Grade Predictor </h2>
            </a>
          </div>
        </nav>
      </div>


      <div className="semester-panel-main-content">

        <p className='text-muted text-center'>
          Add your courses by semester to calculate a GPA instantly. Need to compare? Flip the switch to view either your planned or current GPA.
        </p>

        <SemesterPanel
          semesters={semesters}
          IsFutureSemester={IsFutureSemester}
          addCourseToSemester={addCourseToSemester}
          removeCourse={deleteCourseFromSemester}
        />
        <div className="d-flex justify-content-center mt-2">
          <button onClick={addSemester} className='btn btn-sm btn-outline-primary mb-2'>Add Semester</button>
        </div>

        <div className='text-center'>
        <button
          className="btn btn-primary mt-4"
          onClick={() => setShowGPAOverview(prev => !prev)}
        >
          {showGPAOverview ? "Hide GPA Overview" : "Show GPA Overview"}
        </button>
        {/* conditionally render the calculations depending if the panel has the value of true or false*/}
        {showGPAOverview && (
          <GPAOverview 
          calculateTotalGPA={calcOverallGPA}/>
        )}
      </div>
      </div>

    </div>
  );
}
export default App;