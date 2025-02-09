const initApp = () => {};

export const courseClients = async (courseName, client) => {
	const response = await fetch(
		`http://localhost:3000/clientsBooked?${courseName}`
	);
	const data = await response.json();
	const courseId = data[0].course.id;
	const courseObj = data[0];
	console.log(courseObj);
	data[0].clients.push({ email: client });
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

	//console.log(data[0].clients);
	//data.clients.append('hejsna');
	//console.log(data);
};

//document.addEventListener('DOMContentLoaded', courseClients);
