import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { Companies } from '../../models/companies';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../../models/globals';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [MessageService]
})
export class CompaniesComponent implements OnInit {

  //COMPANIES 
  companies: Companies[]=[];
  company: Companies=new Companies();

  //BOLEAN VARIABLES
	companyDialog: boolean = false;

	//IMPORT 
	importURL: string;

  constructor(private comapnyService: CompaniesService,
			  private messageService: MessageService,
			  private global: Globals,
			  private imagesService: ImagesService,
			  private translateService: TranslateService) { }

  ngOnInit(): void {
	this.getCompanies();
  }

    //GET COMAPNIES
  async getCompanies(){
  		await this.comapnyService.getCompanies();
		if(this.comapnyService.CompaniesResp!=null){
			this.companies = this.comapnyService.CompaniesResp;
		}
		else
			this.companies=[];
  }

  //OPEN DIALOG COMPANY ADD
	openDialogCompany() {
		this.company = new Companies();
		this.companyDialog=true;
	}

  //SAVE COMPANY 
  async saveCompany(){
		if(this.company.id==null){
		await this.comapnyService.saveCompany(this.company);
		if(this.comapnyService.saveCompanyResp==true)
			{	
				this.companyDialog=false;
				this.getCompanies();
				this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
			}
		else
			{this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });}
		}
		else{
		await this.comapnyService.updateCompany(this.company);
		if(this.comapnyService.updateCompanyResp==true)
			{	
				this.companyDialog=false;
				this.getCompanies();
				this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
			}
		else
			{this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });}
		}
	}

  //EDIT company
	async editCompany(company: Companies) {
		this.importURL = this.global.ApiURL + "/files/imagesetcompany?token=" + company.id;
		this.company = company;
		await this.getImage();
		this.companyDialog=true;
	}

  //DELETE COMPANY
  async deleteCompany(company: Companies){
		await this.comapnyService.deleteCompany(company);
		if(this.comapnyService.deleteCompanyResp==true)
		{	
				this.getCompanies();
				this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('SuccessDelete'), life: 3000 });
		}
		else
			{this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('WarnDelete'), life: 3000 });}
  }

  //IMAGE 
	async getImage() {
		await this.imagesService.getImageCompany(this.company.id);
		if (this.imagesService.imageCompanyResp != null)
			this.company.image = this.imagesService.imageCompanyResp;
		else
			this.company.image = null;
    }

}
