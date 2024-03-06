const readFile = (filePath, callback) => {
	fetch(filePath)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			callback(null, data);
		})
		.catch(error => {
			callback(error, null);
		});
}