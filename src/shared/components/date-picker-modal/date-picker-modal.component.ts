import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  template: `
    <ion-content class="ion-padding">
      <div class="container">
        <ion-datetime
          presentation="date"
          [value]="selectedDate"
          (ionChange)="onDateChange($event)"
        ></ion-datetime>

        <ion-button expand="block" shape="round" (click)="confirm()">
          Confirmar
        </ion-button>

        <ion-button
          expand="block"
          shape="round"
          fill="clear"
          color="medium"
          (click)="close()"
        >
          Cancelar
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      ion-content::part(scroll) {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 16px;
      }

      ion-datetime {
        width: 100%;
        max-width: 350px;
      }

      ion-button {
        width: 100%;
        max-width: 350px;
      }
    `,
  ],
})
export class DatePickerModalComponent {
  @Input() selectedDate: string = new Date().toISOString();
  private tempDate: string = this.selectedDate;

  constructor(private modalController: ModalController) { }

  onDateChange(event: any) {
    this.tempDate = event.detail.value;
  }

  confirm() {
    this.modalController.dismiss(this.tempDate);
  }

  close() {
    this.modalController.dismiss();
  }
}
