import { displayBookedCourses } from './dom.js';
const btnDiv = document.querySelector('.btnDiv');
const btn = btnDiv.querySelector('.addCourse');
const newCourse = document.querySelector('#new-course-form');
const newCourseData = document.querySelector('#course-submission');

const getBookedCourses = async () => {
	const adminPage = document.querySelector('#admin-page');
	adminPage.innerHTML = '';

	try {
		const response = await fetch('http://localhost:3000/clientsBooked');
		const data = await response.json();
		if (response.ok) {
			adminPage.insertAdjacentHTML(
				'beforeend',
				displayBookedCourses(data)
			);
		}
	} catch (error) {
		console.log(error);
	}
};

const addCourse = async () => {
	btnDiv.style.display = 'none';
	newCourse.style.display = 'block';
};

const handleCourseForm = async (e) => {
	e.preventDefault();

	const data = new FormData(newCourseData);

	data.append('image', `${Math.floor(Math.random() * 3) + 1}.jpg`);

	const body = Object.fromEntries(data);
	try {
		const response = await fetch('http://localhost:3000/courses', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		if (response.ok) {
			try {
				const response2 = await fetch(
					'http://localhost:3000/clientsBooked',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: body.id,
							course: {
								id: body.id,
								title: body.title,
							},
							clients: [],
						}),
					}
				);
				if (response2.ok) {
					alert(`Du har nu lagt till en ny kurs: ${body.title}`);
					btnDiv.style.display = 'block';
					newCourse.style.display = 'none';
					newCourseData.reset();
					location.reload();
				}
			} catch (error) {}
		}
	} catch (error) {
		console.log('Kunde inte skapa ny kurs');
	}
};

document.addEventListener('DOMContentLoaded', getBookedCourses);
btn.addEventListener('click', addCourse);
newCourseData.addEventListener('submit', handleCourseForm);
