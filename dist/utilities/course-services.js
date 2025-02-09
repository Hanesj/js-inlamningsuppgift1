export const loadCourses = async () => {
	const url = 'http://localhost:3000/courses';
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
	} catch (error) {
		throw new Error(error);
	}
};
