import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private messageSource = new BehaviorSubject<any>("default message");
    currentMessage = this.messageSource.asObservable();
    public activeIndex = 0;

    constructor() { }

    changeMessage(message: any) {
        this.messageSource.next(message);
    }
}
