export interface Course {
    id: number;
    name: string;
    creditHours: number;
    grade: string;
}

export interface CoursePropsList {
    courses: Course[];
}

export interface Semester {
    id: number;
    name: string;
    isFuture: boolean;
    courses: Course[];
}

export interface semesterPropsList {
    semesters: Semester[];
    IsFutureSemester: (id: number, selection: string) => void,
    addCourseToSemester: (
    semId: number,
    name: string,
    hours: string,
    grade: string
    
  ) => void;
}