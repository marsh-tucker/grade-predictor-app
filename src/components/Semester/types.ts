export interface Course {
    id: number;
    name: string;
    creditHours: number;
    grade: string;
}

export interface CoursePropsList {
    courses: Course[];
    semId: number;
    //defining a property for a delete function which we will implenent when we use course panel as an element in semester panel
    courseDelete: (
        semId: number,
        courseId: number
    ) => void;
}

export interface Semester {
    id: number;
    name: string;
    isFuture: boolean;
    courses: Course[];
}

export interface semesterPropsList {
    semesters: Semester[];
    IsFutureSemester: (
        id: number,
        selection: string
    ) => void,
    addCourseToSemester: (
        semId: number,
        name: string,
        hours: string,
        grade: string
    ) => void;
    removeCourse: (
        semId: number,
        courseId: number
    ) => void;
}
export interface GPAPropsList {
    calculateTotalGPA: () => {
        currentGPA: number,
        futureGPA: number,
        predictedGPA: number
    }  
}