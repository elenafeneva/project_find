import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private translate: TranslateService, private http: HttpClient) { }
    getLanguages() {
        return this.http.get<any>('assets/languages.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
}