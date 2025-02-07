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
	const course = await getCourse();

	const data = new FormData(form);
	data.append(
		'booked_courses',
		`(${course.title} ${course.date} - ${course.location}) / `
	);
	console.log(data);
	const body = Object.fromEntries(data);
	//console.log(body);
	const clientExist = await checkClient(body.email);
	if (clientExist === '') {
		try {
			const response = await fetch('http://localhost:3000/clients', {
				method: 'POST',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify(body),
			});
			//console.log(await response.json());
			form.reset();
		} catch (error) {
			console.error(error);
		}
	} else {
		const client = await fetch(
			`http://localhost:3000/clients/${clientExist}`
		);
		//	const test = fetch(`http://localhost:3000/clients/${clientExist}`).then(
		//		(res) => res.json());

		const bookedCourses = await client.json();
		const response = await fetch(
			`http://localhost:3000/clients/${clientExist}`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify({
					booked_courses: `${bookedCourses.booked_courses} (${course.title} ${course.date} - ${course.location})`,
				}),
			}
		);
	}
};

const checkClient = async (email) => {
	const response = await fetch('http://localhost:3000/clients');
	const test = await fetch(`http://localhost:3000/clients?email=${email}`);
	const test2 = await test.json();
	console.log(test2[0].billing);
	let id;
	if (response.ok) {
		data = await response.json();

		for (const entries in data) {
			if (data[entries].email === email) {
				//console.log(data[entries].email);
				console.log('Finns redan denna mail.');
				id = data[entries].id;
				//break;
			} else {
				id = '';
			}
		}
		return id;
	}
};

const getCourse = async () => {
	const id = location.search.split('=')[1];
	const response = await fetch(`http://localhost:3000/courses/${id}`);
	const data = await response.json();
	//console.log(data);
	return data;
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleForm);
