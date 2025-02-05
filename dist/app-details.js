//import { loadCourses } from './app.js';

const form = document.querySelector('#submission');

const initApp = () => {
	const id = location.search.split('=')[1];

	loadCourse(id);
};

const displayCourse = (course) => {
	const selected_course = document.querySelector('.details');

	let html = '';
	html += selected_course.innerHTML = `<div><p>${course.title}</p>
    <img src="../../dist/assets/images/${course.image}" loading="eager"/></div>`;
};

const loadCourse = async (id) => {
	const url = `http://localhost:3000/courses/${id}`;
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		displayCourse(data);
	}
};

const handleForm = async (e) => {
	e.preventDefault();

	const data = new FormData(form);
	const body = Object.fromEntries(data);
	console.log(body);
	try {
		const response = await fetch('http://localhost:3000/clients', {
			method: 'POST',
			body: JSON.stringify(body),
		});
		console.log(await response.json());
		form.reset();
	} catch (error) {
		console.error(error);
	}
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleForm);
