export const courseDisplay = (courses) => {
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

export const displayCourse = (course) => {
	const selected_course = document.querySelector('.details');

	let html = '';
	html += selected_course.innerHTML = `<div><p>${course.title}</p>
    <img src="../../dist/assets/images/${course.image}" loading="eager"/></div>`;
};
