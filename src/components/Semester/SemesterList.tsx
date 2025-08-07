import { semesterPropsList } from './types';
import CoursePanel from './CourseList';
import { Course } from './types';
import { useState } from 'react';



//using a function that takes in array of semester props, accesses the array and then maps and access the elements in array using id.
const SemesterPanel: React.FC<semesterPropsList> = ({ semesters, IsFutureSemester, addCourseToSemester, removeCourse }) => {

    //creating a state to trigger coures inputs to show under each semester
    const [showCourseInputs, setShowCourseInputs] = useState<{ [semesterID: number]: boolean }>({});

    const [tempCourseData, setTempCourseData] =
        useState<{ [id: number]: { name: string; hours: string; grade: string } }>({});

    // defining a GPA dictionary with pre set values
    const gradeScale: { [key: string]: number } = {
        "A+": 4.0,
        "A": 3.9,
        "A-": 3.7,
        "B+": 3.3,
        "B": 3.0,
        "B-": 2.7,
        "C+": 2.3,
        "C": 2.0,
        "C-": 1.7,
        "D": 1.0,
        "F": 0.0,
    }
    //triggers showCourseInputs state
    function toggleCourseInput(semId: number) {
        console.log("toggling course input")
        setShowCourseInputs(prev => ({ ...prev, [semId]: !prev[semId], }));
        //pre initializing initial value to A+ because the onChange event hasnt been triggered yet
        setTempCourseData(prev => ({
            ...prev,
            [semId]: prev[semId] || {
                name: "",
                hours: "",
                grade: "A+",  // Set default grade value here
            },
        }));
    }

    function handleTempChange(
        semId: number,
        field: "name" | "hours" | "grade",
        value: string
    ) {
        setTempCourseData(prev => ({
            ...prev,
            [semId]: {
                ...prev[semId],
                [field]: value  // update just the edited field
            }
        }))
    };

    function calculateGPA(semCourses: Course[], gradeScale: { [key: string]: number }) {
        if (!semCourses.length) return 0;

        let totalPoints = 0;
        let totalCredits = 0;
        /* loops through each course, retrieved the grade points based on the gradeScale hash map */
        for (const course of semCourses) {
            const gradePoints = gradeScale[course.grade.trim().toUpperCase()]
            /* checks if gradePoint retrned a value and uses a falsy value holder in case creditHours = 0 */
            if (gradePoints !== undefined && course.creditHours) {
                totalPoints += gradePoints * course.creditHours;
                totalCredits += course.creditHours;
            }
        }
        return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
    };

    const saveCourse = (semId: number) => {
        const c = tempCourseData[semId];
        console.log(c.grade)
        if (!c?.name || !c?.hours || !c?.grade) return;     // null check
        console.log(c.grade + " made it past null check")
        addCourseToSemester(semId, c.name, c.hours, c.grade);
        toggleCourseInput(semId);
        setTempCourseData(prev => ({
            ...prev,
            [semId]: { name: "", hours: "", grade: "" }
        }));
    };

    return (
        <div className="container">
            {semesters.map((s) => (
                <div key={s.id} className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <h5 className="fw-bold">{s.name}</h5>

                            <div key={s.id}>
                                <p className="fw-semibold mt-2">
                                    Semester GPA: {calculateGPA(s.courses, gradeScale)}
                                </p>
                            </div>

                            <p className="text-muted">{s.isFuture ? "Planned" : "Current"}</p>

                            {/* Dropdown */}
                            <select
                                value={s.isFuture ? "Planned" : "Current"}
                                onChange={(e) => IsFutureSemester(s.id, e.target.value)}
                                className="form-select mb-3"
                            >
                                <option value="Current">Current</option>
                                <option value="Planned">Planned</option>
                            </select>

                            {/* Course Panel */}
                            <CoursePanel
                                courses={s.courses}
                                semId={s.id}
                                courseDelete={removeCourse}
                            />

                            {/* Add Course Button */}
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => toggleCourseInput(s.id)}
                            >
                                Add Course
                            </button>

                            {/* Course Input Drawer */}
                            {showCourseInputs[s.id] && (
                                <div className="mt-3">
                                    <input
                                        placeholder="Course name"
                                        className="form-control mb-2"
                                        value={tempCourseData[s.id]?.name || ""}
                                        onChange={(e) => handleTempChange(s.id, "name", e.target.value)}
                                    />
                                    <input
                                        placeholder="Credit hours"
                                        className="form-control mb-2"
                                        value={tempCourseData[s.id]?.hours || ""}
                                        onChange={(e) => handleTempChange(s.id, "hours", e.target.value)}
                                    />
                                    {/*  replacing plain input with a select element that accesses the gradescale dictionary*/}

                                    <select className='form-select mb-2'
                                        value={tempCourseData[s.id]?.grade}
                                        onChange={(e) => {
                                            handleTempChange(s.id, "grade", e.target.value);
                                            console.log("Grade changed to:", e.target.value);
                                        }}>
                                        <option value="" disabled>Select grade</option>
                                        {Object.keys(gradeScale).map((grade) => (
                                            <option key={grade} value={grade}> {grade} </option>
                                        ))}
                                    </select>
                                    <div className="row">
                                        <div className="col text-center">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => (saveCourse(s.id),
                                                    console.log("attempting to click"))}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};
export default SemesterPanel;
