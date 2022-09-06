import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    companiesTotalNumber: string;
    studentsTotalNumber: string;
    projectsTotalNumber: string;

    //DOUGHNT
    projectClosedJSON: any[] = [];
    projectArrayPie: number[] = [];
    dataPie: any;

   //BAR
    companiesProjectsJSON: any[] = [];
    companiesProjectsArrayBar: number[] = [];
    dataBar: any;
    labelsBar: string[] = [];

    //PIE 
    top5SKillsJSON: any;
    dataTopSKills: any;
    labelsTopSkills: string[] = [];
    dataPieTopSkiils: number[] = [];

    constructor(private dashboardService: DashboardService,
        private translateService: TranslateService) { }

    ngOnInit(): void {
        this.getNumberOfCompanies();
        this.getNumberOfStudents();
        this.getNumberOfProjects();
        this.getNumberOfClosedProjects();
        this.getNumberOfCompaniesProjects();
        this.getTopSkills();
    }

    //NUMBER OF COMPANIES
    async getNumberOfCompanies() {
        await this.dashboardService.getCompaniesNumber();
        this.companiesTotalNumber = this.dashboardService.numberCompanies;
    }

    //NUMBER OF STUDENTS
    async getNumberOfStudents() {
        await this.dashboardService.getStudentsNumber();
        this.studentsTotalNumber = this.dashboardService.numberStudents;
    }

    //NUMBER OF PROJECTS
    async getNumberOfProjects() {
        await this.dashboardService.getProjectsNumber();
        this.projectsTotalNumber = this.dashboardService.numberProjects;
    }

    //NUMBER OF CLOSED PROJECTS
    async getNumberOfClosedProjects() {
        await this.dashboardService.getProjectsClosedNumber();
        this.projectClosedJSON = this.dashboardService.projectClosedJSON;
        if (this.projectClosedJSON.length > 0) {
            this.projectArrayPie.push(this.projectClosedJSON[0].num);
            this.projectArrayPie.push(this.projectClosedJSON[1].num);
            this.translateService.get('Projects').subscribe(value => {
            this.dataPie = {
                    labels: [this.translateService.instant('ClosedProjects'), this.translateService.instant('NotClosedProject')],
                        datasets: [
                            {
                                data: this.projectArrayPie,
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                ]
                            }
                        ]
                };
            });
        }
    }

    //NUMBER COMPANIES PROJECTS 
    async getNumberOfCompaniesProjects() {
        await this.dashboardService.getCompaniesProjectsNumber();
        this.companiesProjectsJSON = this.dashboardService.companiesProjectsJSON;
        if (this.companiesProjectsJSON.length > 0) {
            for (var i = 0; i < this.companiesProjectsJSON.length; i++) {
                this.labelsBar.push(this.companiesProjectsJSON[i].CompanyName);
                this.companiesProjectsArrayBar.push(this.companiesProjectsJSON[i].Projectsnum);
                this.translateService.get('ProjectNumber').subscribe(value => {
                    this.dataBar = {
                        labels: this.labelsBar,
                        datasets: [
                            {
                                label: this.translateService.instant('ProjectNumber'),
                                backgroundColor: '#f4d6a3',
                                data: this.companiesProjectsArrayBar
                            }
                        ]
                    };
                });
            }
        }
        
    }

    //TOP 5 SKILLS 
    async getTopSkills() {
        await this.dashboardService.getTop5Skills();
        this.top5SKillsJSON = this.dashboardService.topSkillsJSON;
        if (this.top5SKillsJSON.length > 0) {
            for (var i = 0; i < this.top5SKillsJSON.length; i++) {
                this.labelsTopSkills.push(this.top5SKillsJSON[i].SkillName);
                this.dataPieTopSkiils.push(this.top5SKillsJSON[i].NumberStudents);
        }
        this.dataTopSKills = {
            labels: this.labelsTopSkills,
            datasets: [
                {
                    data: this.dataPieTopSkiils,
                    backgroundColor: [
                        "#42A5F5",
                        "#66BB6A",
                        "#FFA726",
                        '#f4d6a3',
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#64B5F6",
                        "#81C784",
                        "#FFB74D",
                        '#f4d6a3',
                        "#36A2EB"
                    ]
                }
            ]
            };
        }
    }

}
