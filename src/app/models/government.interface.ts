
export interface Government {
  id: number;
  name: string;
  isDeleted: boolean;
}

export interface GovernmentRequest {
  name: string;
}

export interface UpdateGovernmentRequest {
  id: number;
  name: string;
  isDeleted: boolean;
}

export interface PaginatedGovernmentResponse {
  data: Government[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
}
