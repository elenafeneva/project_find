export class Faculties {
    id: number;
    facultyName: string;
    facultyAddress: string;
    constructor(
        id?: number,
        facultyName?: string,
        facultyAddress?:string
    ) {
        this.id = id;
        this.facultyName = facultyName;
        this.facultyAddress = facultyAddress;
    }
}
