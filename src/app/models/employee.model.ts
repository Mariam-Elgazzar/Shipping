export interface Employee {
  id?: string;
  name: string;
  phone: string;
  email: string;
  password?: string; // Optional when retrieving existing employees
  address: string;
  branchId: string;
  roleId: string;
  isActive?: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address?: string;
  isActive?: boolean;
}
export interface IGetAllEmployee {
  id: string;

  name: string;

  email: string;

  phoneNumber: string;

  brachName: string;

  groupName: string;

  isDeleted: boolean;
}
export interface IUpdateEmployee {
  name: string;
  userName: string;
  email: string;
  phoneNumber: string;
  branchIds: number[];
  groupId: number;
  isDeleted?: boolean;
}
export interface IGroup {
  id: number;
  name: string;
  creationDate: string;
}
export interface IGroupPages {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: IGroup[];
}
export interface IBranchParams {
  pageSize:number;
  pageIndex:number;
  SearchByName?:string
}
export interface IAddEmployee {
  name: string,
  userName: string,
  email: string,
  password: string,
  phoneNumber: string,
  branchIds:number[],
  groupId: number,
}
