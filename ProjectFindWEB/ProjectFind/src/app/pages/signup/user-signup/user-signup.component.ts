import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import { Companies } from '../../../models/companies';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { CompaniesService } from '../../../services/companies.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  //USER ROLES
  userRoles: any[]=[];
  selectedUserRole: any;

  //USER 
  user: Users=new Users();

  //COMPANY
  companies: Companies[]=[];
  company: Companies=new Companies();
  selectedCompany: boolean=false;

  //DATA SERVICE
  dataTransfer:any;
  constructor(private translateService: TranslateService, 
  private router: Router, 
  private dataService: DataService,
  private comapnyService: CompaniesService) { }

 async ngOnInit() {
    this.userRoles =[{name:this.translateService.instant('Student'), value:3},
					{name:this.translateService.instant('Company'), value:2}];
    this.dataService.currentMessage.subscribe(message => this.dataTransfer = message);
        if (this.dataTransfer) {
            if (this.dataTransfer.Token) {
                if (this.dataTransfer.User)
				{
					this.user = this.dataTransfer.User;
					if(this.user.company_Id){
					await this.comapnyService.getCompany(this.user?.company_Id);
					if(this.comapnyService.CompanyResp!=null){
						this.company=this.comapnyService.CompanyResp;
						this.selectedCompany=true;
					}}
					this.selectedUserRole=this.userRoles.find(x=>x.value==this.user.role)
				}
			}
		}
	await this.getCompanies();
  }

    //CHANGE USER ROLE
  changeUserRole(){
	this.user.role = this.selectedUserRole.value;
	if(this.selectedUserRole.value==2)
		this.selectedCompany=true;
	else
		this.selectedCompany=false;
	
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
    //GO ON NEXT PAGE
  NextPage(){
	  if(this.user.role==3)
		this.user.active=true;
	  else
		{
			this.user.active=false;
			this.user.company_Id=this.company.id;
		}
	    const Podatoci={
			User: this.user,
			Token:true
		}
	    this.dataService.changeMessage(Podatoci);
		if(this.user.role==3)
			this.router.navigate(['signup/student']);
	    else if(this.user.role==2)
			this.router.navigate(['signup/profile']);
  }

	BackPage() {
		this.router.navigate(['login']);
    }



}
