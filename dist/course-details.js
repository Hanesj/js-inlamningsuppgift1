//import { loadCourses } from './app.js';
import {
	checkClient,
	loadCourse,
} from './utilities/course-details-services.js';
import { displayCourse } from './utilities/dom.js';
import { courseClients } from './admin.js';

const form = document.querySelector('#submission');

const initApp = () => {
	const id = location.search.split('=')[1];

	loadCourse(id).then((course) => displayCourse(course));
};

const handleForm = async (e) => {
	e.preventDefault();
	const course = await getCourse();

	const data = new FormData(form);

	data.append(
		'booked_courses',

		`(${course.title} ${course.date} - ${course.location})`
	);

	//data.append('booked_courses', JSON.stringify(course, null, 2));
	console.log(data);
	console.log(course);
	const body = Object.fromEntries(data);

	//console.log(body);
	const clientExist = await checkClient(body.email);
	if (clientExist === null) {
		try {
			const response = await fetch('http://localhost:3000/clients', {
				method: 'POST',
				headers: { 'Content-Type': 'Application/json' },
				body: JSON.stringify(body),
			});
			if (response.ok) {
				//console.log(await response.json());
				alert(`Tack! Du är nu registrerad för: ${course.title}`);
				console.log(course.title, body.email);
				await courseClients(course.title, body.email);
				form.reset();
				window.location.assign('/src/index.html');
			} else {
				alert(response.statusText);
			}
		} catch (error) {
			console.error(error);
		}
	} else {
		try {
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
						booked_courses: ` ${bookedCourses.booked_courses} (${course.title} ${course.date} - ${course.location})`,
					}),
				}
			);
			if (response.ok) {
				alert(
					'Du finns redan registrerad, kursen läggs till för ditt konto.'
				);
				await courseClients(course.title, body.email);
				form.reset();
				window.location.assign('/src/index.html');
			} else {
				alert(response.statusText);
			}
		} catch (error) {
			console.log('fel');
		}
	}
};

const getCourse = async () => {
	const id = location.search.split('=')[1];
	try {
		const response = await fetch(`http://localhost:3000/courses/${id}`);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		//console.log(data);
	} catch {
		throw new Error(error);
	}
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleForm);
