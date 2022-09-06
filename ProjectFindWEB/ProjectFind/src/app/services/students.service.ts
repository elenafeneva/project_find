import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../models/globals';
import { Students } from '../models/students';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

    public studentParticipationResp: boolean = false;
    public projectStudentsParticipate: any;
    public studentUnParticipationResp: boolean = false;
    public updateStudentResp: boolean = false;
    public studentResp: Students = new Students();

    constructor(private http: HttpClient, private global: Globals) { }

    //STUDENT PARTICCIPATION
    studentParticipation(user:Users, projectId: number, description: string) {
        return new Promise((resolve, reject) => {
            const params = {
                Login:user,
                Metod: "StudentParticipation",
                Podatoci: projectId.toString(),
                Parametar:description
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.studentParticipationResp = resp;
                resolve(resp);
            })

        });
    }

    //STUDENT UNPARTICIPATION
    studentUnParticipate(user: Users, projectId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Login: user,
                Metod: "StudentUnParticipate",
                Podatoci: projectId.toString(),
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/deleteone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.studentUnParticipationResp = resp;
                resolve(resp);
            })

        });
    }

    //GET STUDENTS THAT HAS PARTICIPATED
    getParticipatedStudents(projectId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "ProjectParticipatedStudents",
                Podatoci: projectId.toString(),
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.projectStudentsParticipate = resp;
                resolve(resp);
            })

        });
    }

    //GET STUDENT 
    getStudent(studentId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "Student",
                Podatoci: studentId.toString(),
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.studentResp = resp;
                resolve(resp);
            })

        });
    }


    //UPDATE STUDENT
    updateStudent(user: Users, student: Students) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "Students",
                Podatoci: JSON.stringify(student),
                Parametar: JSON.stringify(user)
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/editone", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.updateStudentResp = resp;
                resolve(resp);
            })
        });

    }

}
