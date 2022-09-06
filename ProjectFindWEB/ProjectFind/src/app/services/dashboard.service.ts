import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../models/globals';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    public numberCompanies: any;
    public numberStudents: any;
    public numberProjects: any;
    public projectClosedJSON: any;
    public companiesProjectsJSON: any;
    public topSkillsJSON: any;

	constructor(private http: HttpClient, private global: Globals) { }

	//GET COMPANIES NUMBER 
    getCompaniesNumber() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/companiesnumber", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.numberCompanies = resp?.number;
                resolve(resp);
            })
        });
    }

    //GET STUDENTS NUMBER 
    getStudentsNumber() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/studentsnumber", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.numberStudents = resp?.number;
                resolve(resp);
            })
        });
    }

    //GET PROJECTS NUMBER 
    getProjectsNumber() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/projectsnumber", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.numberProjects = resp?.number;
                resolve(resp);
            })
        });
    }

    //GET PROJECTS CLOSED NUMBER
    getProjectsClosedNumber() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/projectsclosednumber", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.projectClosedJSON = resp;
                resolve(resp);
            })
        });
    }

    //GET COMPANIES PROJECTS
    getCompaniesProjectsNumber() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/companiesprojectnumber", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.companiesProjectsJSON = resp;
                resolve(resp);
            })
        });
    }

    //GET TOP SKILLS 
    getTop5Skills() {
        return new Promise((resolve, reject) => {

            return this.http.get<any>(this.global.ApiURL + "/top5skills", {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.topSkillsJSON = resp;
                resolve(resp);
            })
        });
    }
}
