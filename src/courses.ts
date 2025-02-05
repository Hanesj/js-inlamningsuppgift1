import { Courses } from './modules/ICourses';
const courses: HTMLDivElement = document.querySelector(
	'.container'
) as HTMLDivElement;
console.log(courses);

courses.firstElementChild!.innerHTML = 'test';

export const displayCourses = (courses: Courses) => {};
