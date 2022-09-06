import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../models/globals';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

    imageResp: any;
    imageCompanyResp: any;

    constructor(private http: HttpClient, private global: Globals) { }

    //SAVE ONE PROJECT 
    getImage(userId: string) {
        return new Promise((resolve, reject) => {
            const params = {
                Podatoci: userId,
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/files/imageget", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.imageResp = resp?.image;
                resolve(resp);
            })

        });
    }

    //SAVE ONE PROJECT 
    getImageCompany(companyId: string) {
        return new Promise((resolve, reject) => {
            const params = {
                Podatoci: companyId,
            };
            const jsonParams = JSON.stringify(params);
            return this.http.put<any>(this.global.ApiURL + "/files/imagegetcompany", JSON.stringify(jsonParams), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(resp => {
                this.imageCompanyResp = resp?.image;
                resolve(resp);
            })

        });
    }
}
