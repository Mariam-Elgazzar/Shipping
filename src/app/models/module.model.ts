// Response for /Medule/GetAll
export interface Module {
  id: number;
  name: string;
}

export interface PaginatedModuleResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: Module[];
}

// Response for /Medule/GetById
export interface ModuleResponse {
  id: number;
  name: string;
}
