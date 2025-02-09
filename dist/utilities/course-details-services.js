export const checkClient = async (email) => {
	//
	// 	const test = await fetch(`http://localhost:3000/clients?email=${email}`);
	//
	// 	const test2 = await test.json();
	//
	// 	console.log(test2[0].billing);
	let id;
	console.log('hej');
	try {
		const response = await fetch('http://localhost:3000/clients');
		if (response.ok) {
			const data = await response.json();

			for (const entries in data) {
				if (data[entries].email === email) {
					//console.log(data[entries].email);

					id = data[entries].id;
					//break;
				} else {
					id = '';
				}
			}
			return id;
		}
	} catch (error) {
		console.error('Det gick fel');
	}
};

export const loadCourse = async (id) => {
	const url = `http://localhost:3000/courses/${id}`;
	const response = await fetch(url);
	if (response.ok) {
		const data = await response.json();
		return data;
	}
};
