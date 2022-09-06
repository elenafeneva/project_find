import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../models/globals';
import { Projects } from '../models/projects';
import { Skills } from '../models/skills';
import { Students } from '../models/students';
import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    public saveProjectResp: boolean = false;
    public closedProject: boolean = false;
    public projectsResp: any;
    public participatedProjectsResp: any;
    public userResp: Users = new Users;
    public skillsResp: Skills[] = [];

    constructor(private http: HttpClient, private global: Globals) { }
    //SAVE ONE PROJECT 
    saveProject(project: Projects, projectSkills: Skills[]) {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "Projects",
                Podatoci: JSON.stringify(project),
                Parametar: JSON.stringify(projectSkills)
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.saveProjectResp = resp;
                resolve(resp);
            })

        });
    }

    //GET PROJECTS
    getProjects() {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "Projects",
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.projectsResp = resp;
                resolve(resp);
            })
        });
    }

    //GET PARTICIPATED PROJECTS
    getParticipatedProjects() {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "ParticipatedProjects",
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.participatedProjectsResp = resp;
                resolve(resp);
            })
        });
    }

    //GET PROJECTS BY SKILLS
    getProjectsBySkills(skills: Skills[]) {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "ProjectsBySkills",
                Podatoci: JSON.stringify(skills)
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.projectsResp = resp;
                resolve(resp);
            })

        })
    }

    //GET PARTICIPATED PROJECTS BY SKILLS
    getParticipatedProjectsBySkills(skills: Skills[]) {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "ParticipatedProjectsBySkills",
                Podatoci: JSON.stringify(skills)
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.participatedProjectsResp = resp;
                resolve(resp);    
            })

        })
    }

    //GET PROJECT USER AND SKILLS 
    getProjectWithSkillsAndUser(projectId: number) {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Metod: "ProjectUserSkills",
                Podatoci: projectId.toString()
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.userResp = resp.item1;
                this.skillsResp = resp.item2;
                resolve(resp);
            })
        })
    }

    //SEND MAIL TO STUDENTS AND CLOSE THE PROJECT
    SendMailAndCloseProject(students: Students[], project: Projects) {
        return new Promise((resolve, reject) => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const params = {
                Login: user,
                Podatoci: JSON.stringify(students),
                Parametar: project.id
            };
            const jsonParams = JSON.stringify(params);
            return this.http.post<any>(this.global.ApiURL + "/sendmailproject", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.closedProject = resp;
                resolve(resp);
            })
        });
    }
}
