import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Projects } from '../../models/projects';
import { Skills } from '../../models/skills';
import { Users } from '../../models/users';
import { ImagesService } from '../../services/images.service';
import { ProjectsService } from '../../services/projects.service';
import { SkillsService } from '../../services/skills.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-participatedprojects',
  templateUrl: './participatedprojects.component.html',
  styleUrls: ['./participatedprojects.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ParticipatedprojectsComponent implements OnInit {


    //BOOLEAN VARIABLES 
    projectDialog: boolean = false;
    displayMaximizable: boolean = false;   

    //PROJECT
    project: Projects = new Projects();
    projects: Projects[] = [];
    projectName: string;
    applyDescription: string;

    //Data View
    sortOrder: number;
    sortField: string;

    //SKILLS
    skillsList: Skills[] = [];
    selectedSkills: Skills[] = [];
    selectedSkillsFilter: Skills[] = [];
    projectSkills: Skills[] = [];
    skillsStudent: Skills[] = [];
    skill: Skills = new Skills();

    //USER 
    user: Users = new Users();
    projectUser: Users = new Users();

    //COMPANY
    companyImage: string;

    //BOOLEAN
    showButton: boolean = false;
    dialogParticipate: boolean = false;

    constructor(private translateService: TranslateService,
        private skillService: SkillsService,
        private studentService: StudentsService,
        private imageService: ImagesService,
        private projectService: ProjectsService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem("currentUser"));
        this.getProjects();
        this.getSkills();
    }

    //SHOW PROJECT DIALOG FOR STUDENTS 
    async showProjectDialog(project: any) {
        this.project = project;
        this.projectName = this.project.name;
        await this.projectService.getProjectWithSkillsAndUser(this.project.id);
        this.projectUser = this.projectService.userResp;
        this.projectSkills = this.projectService.skillsResp;
        //TAKE STUDENT SKILLS
        await this.imageService.getImageCompany(this.projectUser.company_Id);
        this.companyImage = this.imageService.imageCompanyResp;
        await this.skillService.getStudentSkillsForProject(this.user.student_Id);
        this.skillsStudent = this.skillService.skillsStudentResp;
        this.displayMaximizable = true;
    }

    //GET PROJECT
    async getProjects() {
        await this.projectService.getParticipatedProjects();
        if (this.projectService.participatedProjectsResp != null) {
            this.projects = this.projectService.participatedProjectsResp;
        }
        else
            this.projects = [];
    }

    //GET PROJECTS BY SKILLS
    async searchProjectBySkills() {
        if (this.selectedSkillsFilter.length > 0) {
            await this.projectService.getParticipatedProjectsBySkills(this.selectedSkillsFilter);
            if (this.projectService.participatedProjectsResp != null) {
                this.projects = this.projectService.participatedProjectsResp;
            }
            else {
                this.projects = [];
            }
        }
        else {
            this.getProjects();
        }

    }

    //GET SKILLS
    async getSkills() {
        await this.skillService.getSkills();
        if (this.skillService.SkillsResp != null) {
            this.skillsList = this.skillService.SkillsResp;
        }
    }

    //UNPARTICIPATED ON PROJECT
    Unparticipate() {
        this.confirmationService.confirm({
            message: this.translateService.instant("UnparticipateOnProject") + this.project.name + '?',
            header: this.translateService.instant("Confirm"),
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentService.studentUnParticipate(this.user, this.project.id);
                if (this.studentService.studentUnParticipationResp == true) {
                    this.displayMaximizable = false;
                    await this.getProjects();
                }
                else {
                    this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });
                }
            }
        })
    }

}
