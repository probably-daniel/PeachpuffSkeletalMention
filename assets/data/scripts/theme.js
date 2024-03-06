const applyTheme = (theme_name) => {
	readFile(`assets/data/themes/${theme_name}.json`, (error, theme) => {
		if (error) {
			console.error(error);
			return;
		}
		const root = document.documentElement;
		root.style.setProperty('--primary-color', theme.primary_color);
		root.style.setProperty('--secondary-color', theme.secondary_color);
		root.style.setProperty('--accent-color', theme.accent_color);
		root.style.setProperty('--text-color', theme.text_color);
		root.style.setProperty('--background-color', theme.background_color);

		if (localStorage.getItem("enable_keysounds") == "true" && localStorage.getItem("theme") != theme) {
			const path = "assets/audio/keysounds/" + theme.keysounds;
			readFile(`${path}/.config`, (error, config) => {
				if (error) {
					console.error(error);
					return;
				}
				const sounds = [];
				for (let index = 0; index < config.length; index++) {
					sounds.push(new Audio(`${path}/${index}${config.ext}`));
				}
				localStorage.setItem("keysounds", JSON.stringify(sounds));
			});
		}
	});
}

const localTheme = localStorage.getItem("theme");
if (localTheme) {
	console.log(localTheme)
	applyTheme(localTheme);
} else {
	applyTheme("default");
	localStorage.setItem("theme", "default");
	localStorage.setItem("enable_keysounds", "true");
}
