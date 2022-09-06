import { Injectable } from '@angular/core';
import { Globals } from '../../app/models/globals';
import { HttpClient } from '@angular/common/http';
import { Companies } from '../../app/models/companies';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
	public CompaniesResp:any;
	public CompanyResp:any;
	public company: Companies=new Companies();
	public saveCompanyResp: boolean=false;
	public updateCompanyResp: boolean=false;
	public deleteCompanyResp: boolean=false;

	constructor(private http: HttpClient, private global: Globals) { }

  //GET COMPANIES
  getCompanies(){
	return new Promise((resolve, reject) => {
	  const params = {
           Metod: "Companies"
        };
	   const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.CompaniesResp=resp;
			resolve(resp);
		})
	});
  }

  //GET COMPANY
  getCompany(id:string){
	return new Promise((resolve, reject) => {
	  this.company.id=id;
	  const params = {
           Metod: "Companies",
		   Podatoci: JSON.stringify(this.company)
        };
	   const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/selectone", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.CompanyResp=resp;
			resolve(resp);
		})
	});
  }

  //SAVE COMPANY
  saveCompany(company:Companies){
  return new Promise((resolve, reject) => {
  	  const params = {
           Metod: "Companies",
		   Podatoci: JSON.stringify(company)
        };
		const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.saveCompanyResp=resp;
			resolve(resp);
		})
  });
  }

  //UPDATE COMPANY
  updateCompany(company:Companies){
  return new Promise((resolve, reject) => {
	  	  const params = {
           Metod: "Companies",
		   Podatoci: JSON.stringify(company)
        };
		const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/editone", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.updateCompanyResp=resp;
			resolve(resp);
		})
  });

  }

  //DELETE COMPANY 
  deleteCompany(company:Companies){
 return new Promise((resolve, reject) => {
   const params = {
         Metod: "Companies",
	   Podatoci: JSON.stringify(company)
      };
	const jsonParams = JSON.stringify(params);
    return this.http.put<any>(this.global.ApiURL + "/deleteone", JSON.stringify(jsonParams), {
        headers: {
            "Content-Type": "application/json"
        }
    }).subscribe(resp => {
	this.deleteCompanyResp=resp;
	resolve(resp);
})
 });
 }  
  
}