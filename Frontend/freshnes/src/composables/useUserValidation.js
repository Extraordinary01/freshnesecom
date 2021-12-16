import api from "../api/api";
import { ref, watchEffect } from "vue";
export default function useUserValidation(user, errors) {
	const show = ref({
		password1: false,
		password2: false,
		old_password: false,
	});
	const passType = ref({
		password1: "password",
		password2: "password",
		old_password: "password",
	});
	watchEffect(() => {
		show.value.password1 === true
			? (passType.value.password1 = "text")
			: (passType.value.password1 = "password");
		show.value.password2 === true
			? (passType.value.password2 = "text")
			: (passType.value.password2 = "password");
		show.value.old_password === true
			? (passType.value.old_password = "text")
			: (passType.value.old_password = "password");
	});
	const clearActive = (event) => {
		if (event.path[1].classList.contains("active-input")) {
			event.path[1].classList.remove("active-input");
		}
	};
	const addError = (event, key, value) => {
		errors.value[key] = value;
		if (!event.path[1].classList.contains("error-input"))
			event.path[1].classList.add("error-input");
	};
	const clearError = (event, key) => {
		if (event.path[1].classList.contains("error-input")) {
			errors.value[key] = "";
			event.path[1].classList.remove("error-input");
		}
		event.path[1].classList.add("active-input");
	};
	const usernameValidation = (event) => {
		clearActive(event);
		if (user.value.username.length < 5) {
			addError(
				event,
				"username",
				"Username must include at least 5 charecters!"
			);
		} else {
			api
				.post("user/check/", { username: user.value.username })
				.then(() => {
					clearError(event, "username");
				})
				.catch(() => {
					addError(
						event,
						"username",
						"User with this username exists. Please change your username"
					);
				});
		}
	};
	const emailValidation = (event, reset = false) => {
		clearActive(event);
		if (
			!user.value.email.includes("@") ||
			!user.value.email.includes(".") ||
			user.value.email.includes("@.") ||
			user.value.email.startsWith("@") ||
			user.value.email.endsWith(".")
		) {
			addError(event, "email", "You typed wrong email");
		} else {
			api
				.post("user/check/", { email: user.value.email })
				.then(() => {
					if (reset) {
						addError(event, "email", "User with this email doesn't exist!");
					} else {
						clearError(event, "email");
					}
				})
				.catch(() => {
					if (reset) {
						clearError(event, "email");
					} else {
						addError(
							event,
							"email",
							"User with this email exists. Please change your username"
						);
					}
				});
		}
	};
	const passwordValidation = (event) => {
		clearActive(event);
		clearError(event, "password1");
		if (user.value.password1.length < 8) {
			addError(
				event,
				"password1",
				"Password must include at least 8 charecters!"
			);
		} else if (
			user.value.password1.match(/\d/) === null ||
			user.value.password1.match(/\w/) === null
		) {
			addError(event, "password1", "Password must include numbers and letters");
		} else if (
			user.value.password2 !== "" &&
			user.value.password1 !== user.value.password2
		) {
			addError(event, "password1", "Password's must match");
		} else {
			clearError(event, "password1");
		}
	};
	const confirmValidation = (event) => {
		clearActive(event);
		clearError(event, "password2");
		if (user.value.password2 !== user.value.password1) {
			addError(event, "password2", "Password's must match");
		} else {
			clearError(event, "password2");
		}
	};
	const nameValidation = (event, key) => {
		clearActive(event);
		if (user.value[key].match(/[A-Za-z]+$/) === null) {
			addError(event, key, "Please type only charecters!");
		} else {
			clearError(event, key);
		}
	};
	const phoneValidation = (event) => {
		clearActive(event);
		if (!user.value.phone.match(/\+\d+$/)) {
			addError(event, "phone", "Please type correct phone number");
		} else {
			clearError(event, "phone");
		}
	};
	const imageValidation = (event) => {
		if (event.path[3].classList.contains("active-input")) {
			event.path[3].classList.remove("active-input");
		}
		const imageFormat = ["jpg", "png", "jpeg"];
		let ok = false;
		imageFormat.forEach((val) => {
			if (ok) return;
			if (event.target.files[0].name.endsWith(val)) {
				if (event.path[3].classList.contains("error-input")) {
					errors.value.img = "";
					event.path[3].classList.remove("error-input");
				}
				event.path[3].classList.add("active-input");
				ok = true;
				return;
			}
		});
		if (!ok) {
			errors.value.img = "These file is not image!";
			if (!event.path[3].classList.contains("error-input"))
				event.path[3].classList.add("error-input");
		}
	};
	return {
		user,
		usernameValidation,
		errors,
		emailValidation,
		passwordValidation,
		confirmValidation,
		nameValidation,
		phoneValidation,
		imageValidation,
		show,
		passType,
	};
}
