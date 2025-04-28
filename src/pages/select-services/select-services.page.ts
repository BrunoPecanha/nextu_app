import { Component } from '@angular/core';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.page.html',
  styleUrls: ['./select-services.page.scss'],
})
export class SelectServicesPage {
  serviceOptions = [
    { id: '1', desc: 'Corte à máquina', time: 25, price: 20 },
    { id: '2', desc: 'Corte à tesoura', time: 30, price: 25 },
    { id: '3', desc: 'Corte desfarçado', time: 40, price: 30 },
    { id: '4', desc: 'Massagem Relaxante', time: 50, price: 70 },
    { id: '5', desc: 'Massagem Terapêutica', time: 60, price: 80 },
    { id: '6', desc: 'Limpeza de Pele', time: 45, price: 60 },
    { id: '7', desc: 'Peeling', time: 60, price: 90 },
    { id: '8', desc: 'Peeling', time: 60, price: 90 },
    { id: '9', desc: 'Peeling', time: 60, price: 90 },
    { id: '10', desc: 'Peeling', time: 60, price: 90 },
  ];

  selectedServices: { id: string; desc: string; time: number; price: number }[] = [];
  isServiceListVisible = false;

  totalTime = 0;
  totalPrice = 0;
  totalTimeString = '';
  totalPriceString = '';
  observacao = '';
  formaPagamento = '';

  toggleServiceList() {
    this.isServiceListVisible = !this.isServiceListVisible;
  }

  addService(service: { id: string; desc: string; time: number; price: number }) {
    this.selectedServices.push(service);
    this.isServiceListVisible = false;
    this.updateTotals();
  }

  removeService(index: number) {
    this.selectedServices.splice(index, 1);
    this.updateTotals();
  }

  updateTotals() {
    this.totalTime = this.selectedServices.reduce((acc, s) => acc + s.time, 0);
    this.totalPrice = this.selectedServices.reduce((acc, s) => acc + s.price, 0);
    this.formatOutput();
  }

  formatOutput() {
    const hours = Math.floor(this.totalTime / 60);
    const minutes = this.totalTime % 60;

    this.totalTimeString = hours > 0
      ? `${hours}h e ${minutes} minutos`
      : `${minutes} minutos`;

    this.totalPriceString = `R$ ${this.totalPrice.toFixed(2)}`;
  }
}
