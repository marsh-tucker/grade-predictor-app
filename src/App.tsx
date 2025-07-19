import React from 'react';
import { useState } from 'react';
//import SemesterPanel
import SemesterPanel from './components/Semester/SemesterList';
//import components for semester panel
import { Semester } from './components/Semester/types';
import './css/App.css';
import { Course } from './components/Semester/types';



function App() {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  function addSemester() {
    const newSemester: Semester = {
      id: semesters.length + 1,
      name: `Semester ${semesters.length + 1}`,
      isFuture: true,
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
          Add semesters and courses to begin calculating GPA.
        </p>

        <SemesterPanel
          semesters={semesters}
          IsFutureSemester={IsFutureSemester}
          addCourseToSemester={addCourseToSemester}
        />
        <div className="d-flex justify-content-center mt-2">
          <button onClick={addSemester} className='btn btn-sm btn-outline-primary mb-2'>Add Semester</button>
        </div>
      </div>

    </div>
  );
}
export default App;