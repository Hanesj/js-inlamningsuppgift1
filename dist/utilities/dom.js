export const courseDisplay = (courses) => {
	let html = '';

	courses.forEach((course) => {
		html += `<div>
        <p class="course-headline"><a href="./pages/course-details.html?id=${course.id}" style="text-decoration: none; color:inherit">${course.title}</a></p>
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

export const displayCourse = (course) => {
	const selected_course = document.querySelector('.details');

	let html = '';
	html += selected_course.innerHTML = `<div><p>${course.title}</p>
    <img src="../../dist/assets/images/${course.image}" loading="eager" height="500px"/>
    <p>${course.description}</p>
    <p>${course.date}</p>
    <p>${course.location}</p>
    <p>${course.cost}:-</p>
    </div>`;
};

export const displayBookedCourses = (courses) => {
	let html = '';

	courses.forEach((course) => {
		//		console.log(course.course.title);
		//		console.log(course.clients[0]);
		//		course.clients.map((client) => {
		//			console.log(client.email);
		//		});
		html += `<div>
            <p class="course-headline">${course.course.title} - ${
			course.course.id
		}</p>
            <ul>
                ${course.clients
					.map(
						(client) =>
							`<li><a href="mailto:${client.email}">${client.email}</a></li>`
					)
					.join('')}
            </ul>
        </div>`;
	});
	return html;
};
