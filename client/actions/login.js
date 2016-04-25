// actions.js

import { CALL_API } from `redux-api-middleware`

function act() {
	return {
		[CALL_API]: {
			endpoint: "",
			method: "GET",
			types: ["REQEST", "SUCCESS", "FAILURE"]
		}
	}
}