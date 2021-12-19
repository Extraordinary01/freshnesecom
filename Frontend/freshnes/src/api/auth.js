import api from "@/api/api";

export default {
	login(username, password) {
		return api.post("user/login/", { username, password });
	},
	logout() {
		return api.post("auth/logout/", {});
	},
	createAccount(data) {
		const fd = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			if (value === "") return;
			if (key != "img") {
				if (key === "password1") {
					fd.append("password", value);
				}
				if (key !== "password2") {
					fd.append(key, value);
				}
			} else {
				fd.append(key, value, value.name);
			}
		});
		api.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
		return api.post("user/signup/", fd);
	},
	changeAccountPassword(new_password1, new_password2, old_password) {
		return api.post("auth/password/change/", {
			new_password1,
			new_password2,
			old_password,
		});
	},
	sendAccountPasswordResetEmail(email) {
		return api.post("user/reset-password/email/", { email });
	},
	resetAccountPassword(uid, token, password) {
		return api.post("user/reset-password/", { uid, token, password });
	},
	getAccountDetails() {
		return api.get("user/user/");
	},
	updateAccountDetails(data) {
		const fd = new FormData();
		Object.entries(data).forEach(([key, value]) => {
			key != "img" ? fd.append(key, value) : fd.append(key, value, value.name);
		});
		api.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
		return api.patch("user/user/", fd);
	},
	deleteAccount() {
		return api.delete("user/user/");
	},
	verifyAccountEmail(uid, token) {
		return api.post("user/activate/", {
			uid,
			token,
		});
	},
};
