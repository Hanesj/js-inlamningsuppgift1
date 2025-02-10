import { displayBookedCourses } from './utilities/dom.js';

export const courseClients = async (courseName, client) => {
	try {
		const response = await fetch(
			`http://localhost:3000/clientsBooked?course.title=${courseName}`
		);
		if (response.ok) {
			const data = await response.json();
			const courseId = data[0].course.id;
			const courseObj = data[0];
			console.log(courseObj);
			data[0].clients.push({ email: client });
			try {
				const postClient = await fetch(
					`http://localhost:3000/clientsBooked/${courseId}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							course: data[0].course,
							clients: data[0].clients,
						}),
					}
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert(response.statusText);
		}
	} catch (error) {
		console.log(error);
	}
};

//btn.addEventListener('click', addCourse);
