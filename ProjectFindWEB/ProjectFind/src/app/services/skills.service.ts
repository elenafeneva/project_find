import { Injectable } from '@angular/core';
import { Skills } from '../../app/models/skills';
import { Globals } from '../../app/models/globals';
import { HttpClient } from '@angular/common/http';
import { Students } from '../models/students';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  public SkillsResp: any;
  public skillsStudentResp: any;
  public selectedSkillsResp: any;
  public SaveSkills: boolean;
  public SaveManySkills: boolean=false;
  constructor(private http: HttpClient, private global: Globals) { }

  //GET SKILLS
  getSkills(){
	return new Promise((resolve, reject) => {
	  const params = {
           Metod: "Skills"
        };
	   const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.SkillsResp=resp;
			resolve(resp);
		})
	});
  }


//ADD NEW SKILLS
saveSkills(skill:Skills){
    return new Promise((resolve, reject) => {
        const params = {
                  Metod: "Skills",
                  Podatoci: JSON.stringify(skill),
               };
        const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
            this.SaveSkills=resp;
			resolve(resp);
		})
    });

}
    //ADD NEW SKILLS
    saveStudentSkills(skill: Skills[],studentId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "Skills",
                Podatoci: JSON.stringify(skill),
                Parametar: studentId
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/savemany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.SaveManySkills = resp;
                resolve(resp);
            })
        });

    }

    //STUDENTSKILLSFORPROJECT
    getStudentSkillsForProject(studentId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "StudentProjectSkills",
                Podatoci: studentId.toString()
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.skillsStudentResp = resp;
                resolve(resp);
            })
        });
    }

    //SELECTED SKILLS FOR PROJECT
    getSkillsForProject(projectId: number) {
        return new Promise((resolve, reject) => {
            const params = {
                Metod: "SelectedSkillsProject",
                Podatoci: projectId.toString()
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.selectedSkillsResp = resp;
                resolve(resp);
            })
        });
    }
}
