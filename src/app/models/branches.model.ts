export interface BranchResponse {
  id: number; // API returns id as number
  name: string;
  creationDate: string;
  isDeleted: boolean;
  location: string;
  cityName: string;
}

export interface PaginatedBranchResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: BranchResponse[];
}

// The Branch type used in the component, mapped from BranchResponse
export interface Branch {
  id: string; // Component expects id as string, so we'll convert it
  name: string;
  dateAdded: string; // Maps to creationDate
  status: string; // Maps to isDeleted (e.g., "Active" or "Deleted")
}
