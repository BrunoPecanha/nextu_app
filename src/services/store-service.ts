import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { OpeningHoursRequest } from "src/models/requests/opening-hours-request";
import { StoreRequest } from "src/models/requests/store-request";
import { StoreResponse } from "src/models/responses/store-response";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStores(id: number): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(`${this.apiUrl}/store/owner/${id}`);
  }

  loadEmployeeStores(id: number): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(`${this.apiUrl}/store/employee/${id}`);
  }

  createStore(storeData: StoreRequest): Observable<StoreResponse> {
    return this.http.post<StoreResponse>(`${this.apiUrl}/store`, storeData).pipe(
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
      categoryId: formValue.category,
      openingHours: this.getOpeningHoursRequest(cadastroForm),
      highLights: this.getHighLightsRequest(cadastroForm)
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