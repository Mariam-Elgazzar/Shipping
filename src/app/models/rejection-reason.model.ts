// rejection-reason.model.ts

export interface RejectionReason {
  id: number;
  text: string;
  isDeleted: boolean;
}

export interface RejectionReasonRequestCreate {
  text: string; // Simplified for create
}

export interface RejectionReasonResponse {
  id: number;
  text: string;
  isDeleted: boolean;
}


export interface RejectionReasonRequest {
  id?: number;
  text: string;
  isDeleted?: boolean;
}

export interface CreateRejectionReasonResponse {
  id: number;
}

export interface PaginatedRejectionReasonResponse {
  data: RejectionReasonResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface updateRejectionReasonRequest {
  id: number; // Required for update
  text: string;
}