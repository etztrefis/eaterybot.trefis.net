import http from "../http-common";

class AdminsDataService {
	getAll() {
		return http.get("/admins");
	}

	get(username) {
		return http.get(`/admins/${username}`);
	}

	create(data) {
		return http.post("/admins", data);
	}

	update(id, data) {
		return http.put(`/admins/${id}`, data);
	}

	delete(id) {
		return http.delete(`/admins/${id}`);
	}

	deleteAll() {
		return http.delete(`/admins`);
	}
}

export default new AdminsDataService();
