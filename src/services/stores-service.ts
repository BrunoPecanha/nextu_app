import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { OpeningHoursRequest } from "src/models/requests/opening-hours-request";
import { StoreRequest } from "src/models/requests/store-request";
import { StoreDetailResponse } from "src/models/responses/store-detail-response";
import { StoreProfessionalsResponse } from "src/models/responses/store-professionals-response";
import { StoreListResponse } from "src/models/responses/store-list-response";
import { ProfessionalResponse } from "src/models/responses/professional-response";

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStoresByOwner(id: number): Observable<StoreListResponse> {
    return this.http.get<StoreListResponse>(`${this.apiUrl}/store/owner/${id}`);
  }

  getStoreById(id: number): Observable<StoreDetailResponse> {
    return this.http.get<StoreDetailResponse>(`${this.apiUrl}/store/${id}`);
  }

  loadEmployeeStores(id: number): Observable<StoreListResponse> {
    return this.http.get<StoreListResponse>(`${this.apiUrl}/store/employee/${id}`);
  }

  loadStoreAndProfessionals(id: number): Observable<StoreProfessionalsResponse> {
    return this.http.get<StoreProfessionalsResponse>(`${this.apiUrl}/store/${id}/queue/professionals`);
  }

   loadAllStoresUserIsInByUserId(id: number): Observable<StoreListResponse> {
    return this.http.get<StoreListResponse>(`${this.apiUrl}/store/${id}/customer/stores`);
  }


  loadProfessionals(storeId: number): Observable<ProfessionalResponse> {
    return this.http.get<ProfessionalResponse>(`${this.apiUrl}/store/${storeId}/professionals`);
  }

  updateStore(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/store/${id}`, data);
  }

  deleteStore(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/store/${id}`);
  }

  createStore(storeData: StoreRequest): Observable<StoreListResponse> {
    return this.http.post<StoreListResponse>(`${this.apiUrl}/store`, storeData).pipe(
      catchError(error => {
        console.error('Erro ao criar loja:', error);
        throw error;
      })
    );
  }

  prepareStoreData(cadastroForm: FormGroup): StoreRequest {
    const formValue = cadastroForm.value;    
  
    return {
      ownerId: formValue.ownerId,
      cnpj: formValue.cnpj,
      name: formValue.name,
      address: formValue.address,
      number: formValue.number || '',
      city: formValue.city,
      state: formValue.state,
      openAutomatic: formValue.openAutomatic || false,
      storeSubtitle: formValue.storeSubtitle || '',
      acceptOtherQueues: formValue.acceptOtherQueues || false,
      answerOutOfOrder: formValue.answerOutOfOrder || false,
      answerScheduledTime: formValue.answerScheduledTime || false,
      timeRemoval: formValue.timeRemoval || null,
      whatsAppNotice: formValue.whatsAppNotice || false,
      logoPath: formValue.logoPath || '',
      wallPaperPath: formValue.wallPaperPath || '',
      categoryId: formValue.categoryId,
      openingHours: this.getOpeningHoursRequest(cadastroForm),
      highLights: this.getHighLightsRequest(cadastroForm),
      attendSimultaneously: formValue.attendSimultaneously || false,
      phoneNumber: formValue.phoneNumber || '',
      instagram: formValue.instagram || '',
      facebook: formValue.facebook || '',
      youtube: formValue.youtube || '',
      website: formValue.website || ''
    };
  }

  private getOpeningHoursRequest(cadastroForm: FormGroup): OpeningHoursRequest[] {
    const openingHoursArray = cadastroForm.get('openingHours') as FormArray;

    return openingHoursArray.controls
      .filter(control => control.get('activated')?.value)
      .map(control => ({
        weekDay: control.get('weekday')?.value,
        start: control.get('start')?.value,
        end: control.get('end')?.value,
        activated: true
      }));
  }

  private getHighLightsRequest(cadastroForm: FormGroup): any {
    const highLightsArray = cadastroForm.get('highLights') as FormArray;

    return highLightsArray.controls.map(control => ({
      phrase: control.get('phrase')?.value,
      icon: control.get('icon')?.value,
      activated: control.get('activated')?.value || false
    }));
  }
}