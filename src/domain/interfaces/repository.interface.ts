export interface Repository {
    Create(req: any, res: any): any;
    DeleteById(req: any, res: any): any;
    FindAll(req: any, res: any): any;
    FindById(req: any, res: any): any;
    UpdateById(req: any, res: any): any;
}
