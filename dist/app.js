'use strict';
import { loadCourses } from './utilities/course-services.js';
import { courseDisplay } from './utilities/dom.js';
const initApp = async () => {
	const courses = await loadCourses();
	displayCourses(courses);
};

const displayCourses = (courses) => {
	const list = document.querySelector('.container');
	console.log(courses);
	list.innerHTML = '';
	list.insertAdjacentHTML('beforeend', courseDisplay(courses));
};

document.addEventListener('DOMContentLoaded', initApp);
