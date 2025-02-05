'use strict';
const list = document.querySelector('.container');
const courseDisplay = (courses) => {
	let html = '';

	courses.forEach((course) => {
		html += `<div>
        <p class="course-headline"><a href="./pages/course-details.html?id=${course.id}">${course.title}</a></p>
        <div class="course-image">
    <img src="../dist/assets/images/${course.image}" loading="eager" />
    </div>
    <div class="course-info">
            <p>${course.description}</p>
    </div>
        </div>`;
	});

	return html;
};

const initApp = () => {
	loadCourses();
};

const loadCourses = async () => {
	const url = 'http://localhost:3000/courses';
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		displayCourses(data);
		console.log(data);
	}
};

const displayCourses = (courses) => {
	list.innerHTML = '';
	list.insertAdjacentHTML('beforeend', courseDisplay(courses));
};

document.addEventListener('DOMContentLoaded', initApp);
