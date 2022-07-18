let openRequest = indexedDB.open("scrum", 2);

openRequest.onupgradeneeded = function (event) {
	let db = openRequest.result;
	switch (event.oldVersion) { // существующая (старая) версия базы данных
		case 0:
			console.log(0);
		case 1:
			console.log(1);
	}
};

openRequest.onerror = function () {
	console.error("Error", openRequest.error);
};

openRequest.onsuccess = function () {
	let db = openRequest.result;
	// продолжить работу с базой данных, используя объект db
};