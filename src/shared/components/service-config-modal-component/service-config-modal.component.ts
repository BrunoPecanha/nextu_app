import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-config-modal',
  templateUrl: './service-config-modal.component.html',
  styleUrls: ['./service-config-modal.component.scss']
})
export class ServiceConfigModalComponent implements OnInit {
  @Input() services: { id: number; name: string, finalPrice: number, quantity: number, finalDuration: number, variablePrice: boolean, variableTime: boolean }[] = [];
  @Input() customerId: number = 0;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.form = this.fb.group({
      services: this.fb.array([])
    });
  }

  ngOnInit() {
    this.services.forEach(service => {
      const group = this.fb.group({
        id: [service.id],
        name: [service.name],
        quantity: service.quantity,
        price: [{
          value: service.finalPrice,
          disabled: !service.variablePrice
        }, service.variablePrice ? [Validators.required, Validators.min(0.01)] : []],
        duration: [{
          value: service.finalDuration,
          disabled: !service.variableTime
        }, service.variableTime ? [Validators.required, Validators.min(1), Validators.max(600)] : []]
      });

      this.servicesArray.push(group);
    });
  }

  get servicesArray(): FormArray {
    return this.form.get('services') as FormArray;
  }

  formatCurrency(index: number) {
    const control = this.servicesArray.at(index).get('price');
    if (control?.value) {
      const value = parseFloat(control.value).toFixed(2);
      control.setValue(value, { emitEvent: false });
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.form.valid) {
      const customerServices = this.servicesArray.getRawValue().map((item: any) => ({
        serviceId: item.id,
        price: parseFloat(item.price) || 0,
        duration: parseInt(item.duration, 10) || 0
      }));

      const result = {
        customerId: this.customerId,
        customerServices: customerServices
      };

      this.modalCtrl.dismiss(result);
    }
  }

}