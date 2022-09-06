export class Companies {
	id:string;
	name: string;
	address:string;
	vatNumber: string;
	number: string;
	code: string;
	image: string;
	constructor(
		id?:string,
		name?: string,
		address?:string,
		vatNumber?: string,
		number?: string,
		code?: string,
		image?: string
	){
		this.id=id;
		this.name=name;
		this.address=address;
		this.vatNumber=vatNumber;
		this.number=number;
		this.code=code;
		this.image=image;
	}
}
