import axios from "axios";

const CSRF_COOKIE_NAME = "csrftoken";
const CSRF_HEADER_NAME = "X-CSRFToken";

export default axios.create({
	baseURL: "https://Extraordinary01.pythonanywhere.com/api/",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	xsrfCookieName: CSRF_COOKIE_NAME,
	xsrfHeaderName: CSRF_HEADER_NAME,
});
