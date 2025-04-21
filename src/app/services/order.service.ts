import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Order {
  id: number;
  creationDate: string;
  customerName: string;
  customerPhone1: string;
  customerPhone2: string;
  villageAndStreet: string;
  notes: string;
  chargePrice: number;
  orderState: string;
  orderType: string;
  paymentType: string;
  orderPrice: number;
  totalWeight: number;
  isDeleted: boolean;
  shippingToVillage: boolean;
  amountReceived: number;
  cityId: number;
  cityName: string;
  chargeTypeId: number;
  chargeTypeName: string;
  branchId: number;
  branchName: string;
  merchantId: string;
  merchantName: string;
  shippigRepresentativeId: string | null;
  shippigRepresentativeName: string | null;
  products: {
    id: number;
    name: string;
    weight: number;
    quantity: number;
    orderId: number;
  }[];
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone1: string;
  customerPhone2?: string;
  villageAndStreet: string;
  notes?: string;
  orderPrice: number;
  shippingToVillage: boolean;
  cityId: number;
  chargeTypeId: number;
  branchId: number;
  merchantId: string;
  orderType: string;
  paymentType: string;
  products: {
    name: string;
    weight: number;
    quantity: number;
  }[];
}
export interface PaginatedResponse<T> {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: T[];
}
export interface UpdateOrderRequest {
  orderState: string;
  shippigRepresentativeId: string | null;
  amountReceived: number;
  notes: string | null;
}

export interface PaginatedOrderResponse {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  data: Order[];
}
export interface ShippingRepresentative {
  id: string;
  name: string;
}
export interface City {
  id: number;
  name: string;
  chargePrice: number;
  pickUpPrice: number;
  governorateId: number;
  governorateName: string;
  isDeleted: boolean;
}

export interface ChargeType {
  id: number;
  name: string;
  extraPrice: number;
  numOfDay: number;
  isDeleted: boolean;
}

export interface Branch {
  id: number;
  name: string;
  creationDate: string;
  isDeleted: boolean;
  location: string;
  cityId: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllOrders(
    pageIndex: number,
    pageSize: number,
    search?: string,
    orderState?: string,
    cityId?: number,
    branchId?: number,
    merchantId?: string,
    shippingRepresentativeId?: string,
    fromDate?: string,
    toDate?: string,
    orderType?: string,
    paymentType?: string,
    isDeleted?: boolean,
    sort?: string
  ): Observable<PaginatedOrderResponse> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (orderState) params = params.set('OrderState', orderState);
    if (cityId) params = params.set('CityId', cityId.toString());
    if (branchId) params = params.set('BranchId', branchId.toString());
    if (merchantId) params = params.set('MerchantId', merchantId);
    if (shippingRepresentativeId)
      params = params.set('ShippigRepresentativeId', shippingRepresentativeId);
    if (fromDate) params = params.set('FromDate', fromDate);
    if (toDate) params = params.set('ToDate', toDate);
    if (orderType) params = params.set('OrderType', orderType);
    if (paymentType) params = params.set('PaymentType', paymentType);
    if (isDeleted !== undefined)
      params = params.set('IsDeleted', isDeleted.toString());
    if (sort) params = params.set('Sort', sort);

    return this.http
      .get<PaginatedOrderResponse>(`${this.apiUrl}/Orders/GetAll`, { params })
      .pipe(
        map((response) => ({
          ...response,
          pageIndex: response.pageIndex,
          pageSize: response.pageSize,
          totalCount: response.totalCount,
          data: response.data,
        })),
        catchError(this.handleError)
      );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http
      .get<Order>(`${this.apiUrl}/Orders/GetById/${id}`)
      .pipe(catchError(this.handleError));
  }

  createOrder(order: CreateOrderRequest): Observable<Order> {
    return this.http
      .post<Order>(`${this.apiUrl}/Orders/CreateOrder`, order)
      .pipe(catchError(this.handleError));
  }

  updateOrder(id: number, order: UpdateOrderRequest): Observable<Order> {
    return this.http
      .put<Order>(`${this.apiUrl}/Orders/UpdateOrder/${id}`, order)
      .pipe(catchError(this.handleError));
  }

  getCities(
    pageIndex = 1,
    pageSize = 100,
    search?: string,
    governorateId?: number,
    isDeleted?: boolean
  ): Observable<{
    pageSize: number;
    pageIndex: number;
    totalCount: number;
    data: City[];
  }> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (governorateId)
      params = params.set('GovernorateId', governorateId.toString());
    if (isDeleted !== undefined)
      params = params.set('IsDeleted', isDeleted.toString());

    return this.http
      .get<{
        pageSize: number;
        pageIndex: number;
        totalCount: number;
        data: City[];
      }>(`${this.apiUrl}/Cities/GetAll`, { params })
      .pipe(catchError(this.handleError));
  }

  getChargeTypes(
    pageIndex = 1,
    pageSize = 100,
    search?: string,
    isDeleted?: boolean
  ): Observable<{
    pageSize: number;
    pageIndex: number;
    totalCount: number;
    data: ChargeType[];
  }> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (isDeleted !== undefined)
      params = params.set('IsDeleted', isDeleted.toString());

    return this.http
      .get<{
        pageSize: number;
        pageIndex: number;
        totalCount: number;
        data: ChargeType[];
      }>(`${this.apiUrl}/ChargeTypes/GetAll`, { params })
      .pipe(catchError(this.handleError));
  }

  getBranches(
    pageIndex = 1,
    pageSize = 100,
    search?: string,
    cityId?: number,
    isDeleted?: boolean
  ): Observable<{
    pageSize: number;
    pageIndex: number;
    totalCount: number;
    data: Branch[];
  }> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (cityId) params = params.set('CityId', cityId.toString());
    if (isDeleted !== undefined)
      params = params.set('IsDeleted', isDeleted.toString());

    return this.http
      .get<{
        pageSize: number;
        pageIndex: number;
        totalCount: number;
        data: Branch[];
      }>(`${this.apiUrl}/Branches/GetAll`, { params })
      .pipe(catchError(this.handleError));
  }
  // updateOrder(id: number, request: UpdateOrderRequest): Observable<Order> {
  //   return this.http
  //     .put<Order>(`${this.apiUrl}/Orders/UpdateOrder/${id}`, request)
  //     .pipe(catchError(this.handleError));
  // }

  getShippingRepresentatives(
    pageIndex = 1,
    pageSize = 100,
    search?: string,
    sortBy?: string,
    sortDirection?: string,
    governorateId?: number
  ): Observable<PaginatedResponse<ShippingRepresentative>> {
    let params = new HttpParams()
      .set('PageIndex', pageIndex.toString())
      .set('PageSize', pageSize.toString());

    if (search) params = params.set('Search', search);
    if (sortBy) params = params.set('SortBy', sortBy);
    if (sortDirection) params = params.set('SortDirection', sortDirection);
    if (governorateId !== undefined)
      params = params.set('GovernorateId', governorateId.toString());

    return this.http
      .get<PaginatedResponse<ShippingRepresentative>>(
        `${this.apiUrl}/ShippingRepresentatives/GetAll`,
        { params }
      )
      .pipe(
        map((response) => {
          console.log('ShippingRepresentatives response:', response);
          return {
            ...response,
            data: Array.isArray(response.data) ? response.data : [],
          };
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Unauthorized access. Please log in again.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied.';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found.';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Invalid request.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getOrders(): Observable<any[]> {
    return of([
      {
        id: 'MHGJ3-0',
        category: 'Electronic',
        origin: '2775 Ash Dr, San Jose, South Dakota 83475',
        destination: '1901 Thornridge Cir, Shiloh, New Jersey 81063',
        arrivalDate: '5:00 pm',
        weight: '10 kg',
        lastLocation: 'Warehouse A',
      },
      {
        id: 'MHGJ3-2',
        category: 'Fashion',
        origin: '2775 Ash Dr, San Jose, South Dakota 83475',
        destination: '1901 Thornridge Cir, Shiloh, New Jersey 81063',
        arrivalDate: '5:00 pm',
        weight: '10 kg',
        lastLocation: 'Warehouse A',
      },
      {
        id: 'MHGJ3-0',
        category: 'Food',
        origin: '2775 Ash Dr, San Jose, South Dakota 83475',
        destination: '1901 Thornridge Cir, Shiloh, New Jersey 81063',
        arrivalDate: '5:00 pm',
        weight: '10 kg',
        lastLocation: 'Warehouse A',
      },
    ]).pipe(delay(500));
  }

  getOrderDetails(orderId: string): Observable<any> {
    return of({
      id: orderId,
      category: 'Electronic',
      origin: '2775 Ash Dr, San Jose, South Dakota 83475',
      destination: '1901 Thornridge Cir, Shiloh, New Jersey 81063',
      arrivalDate: '5:00 pm',
      weight: '10 kg',
      lastLocation: 'Warehouse A',
    }).pipe(delay(300));
  }

  deleteOrder(orderId: string): Observable<boolean> {
    return of(true).pipe(delay(300));
  }
}
