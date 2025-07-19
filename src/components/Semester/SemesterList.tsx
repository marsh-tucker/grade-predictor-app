import { semesterPropsList } from './types';
import CoursePanel from './CourseList';
import { useState } from 'react';



//using a function that takes in array of semester props, accesses the array and then maps and access the elements in array using id.
const SemesterPanel: React.FC<semesterPropsList> = ({ semesters, IsFutureSemester, addCourseToSemester }) => {

    //creating a state to trigger coures inputs to show under each semester
    const [showCourseInputs, setShowCourseInputs] = useState<{ [semesterID: number]: boolean }>({});

    const [tempCourseData, setTempCourseData] =
        useState<{ [id: number]: { name: string; hours: string; grade: string } }>({});

    //triggers showCourseInputs state
    function toggleCourseInput(semId: number) {
        setShowCourseInputs(prev => ({ ...prev, [semId]: !prev[semId] }));
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
        }));
    }

    const saveCourse = (semId: number) => {
        const c = tempCourseData[semId];
        if (!c?.name || !c?.hours || !c?.grade) return;     // null check

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
                            <CoursePanel courses={s.courses} />

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
                                    <input
                                        placeholder="Grade"
                                        className="form-control mb-2"
                                        value={tempCourseData[s.id]?.grade || ""}
                                        onChange={(e) => handleTempChange(s.id, "grade", e.target.value)}
                                    />

                                    <div className="row">
                                        <div className="col text-center">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => saveCourse(s.id)}
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
