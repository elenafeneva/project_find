import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Faculties } from '../models/faculties';
import { Globals } from '../models/globals';

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {

	public listFaculties: Faculties[] = [];
	public facultiesResp: Faculties[] = [];
	public SaveFaculty: boolean = false;
	public facultyResp: Faculties = new Faculties();

	constructor(private http: HttpClient, private global: Globals) { }

    //GET AUTOCOMPLETE FACULTIES
    getAutoCompleteFaculties(facultyName:string) {
		return new Promise((resolve, reject) => {
			const user = JSON.parse(localStorage.getItem('currentUser'));
			const params = {
				Login: user,
				Metod: "Faculty",
				Podatoci: facultyName
			};
			const jsonParams = JSON.stringify(params);
			return this.http.post<any>(this.global.ApiURL + "/autocomplete/faculty", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.listFaculties = resp;
				resolve(resp);
			})

		});

	}
	//SAVE FACULTY 
	saveFaculty(faculty: Faculties) {
		return new Promise((resolve, reject) => {
			const params = {
				Metod: "Faculties",
				Podatoci: JSON.stringify(faculty),
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.SaveFaculty = resp;
				resolve(resp);
			})
		});
	}

	//GET FACCULTY
	getFaculty(id: number) {
		return new Promise((resolve, reject) => {
			var faculty = new Faculties();
			faculty.id = id;
			const params = {
				Metod: "Faculties",
				Podatoci: JSON.stringify(faculty),
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/selectone", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.facultyResp = resp;
				resolve(resp);
			})
		});
	}

	//GET FACULTIES 
	getFaculties() {
		return new Promise((resolve, reject) => {
			const params = {
				Metod: "Faculties"
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.facultiesResp = resp;
				resolve(resp);
			})
		});
	}
}
