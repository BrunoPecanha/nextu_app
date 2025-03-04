import { Component } from '@angular/core';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.page.html',
  styleUrls: ['./select-services.page.scss'],
})
export class SelectServicesPage {
  services: { id: number; value: string | null }[] = [{ id: 1, value: null }];
  serviceOptions = [
    { id: '1', desc: 'Corte à máquina', time: 25, price: 20 },
    { id: '2', desc: 'Corte à tesoura', time: 30, price: 25 },
    { id: '3', desc: 'Corte desfarçado', time: 40, price: 30 },
  ];

  totalTime = 0;
  totalPrice = 0;
  totalPriceString = '';
  totalTimeString = '';

  ngOnInit() {
    //TODO - Rota para pegar todos os serviços disponíveis da fila e guarda em serviceOptions
    // Ao clicar em entrar na fila, salvar form na tabela Attendance 
  }

  addService() {
    const newId = this.services.length + 1;
    this.services.push({ id: newId, value: null });
  }

  removeService(index: number) {    
    const removedServiceId = this.services[index].value;
    const removedService = this.serviceOptions.find(option => option.id === removedServiceId);
  
    if (removedService) {
      this.totalTime -= removedService.time;
      this.totalPrice -= removedService.price;
  
      this.formatOutput(); // Atualiza a saída
    }
  
    this.services.splice(index, 1); // Remove o serviço da lista
  
    // Se a lista de serviços estiver vazia após a remoção, opcionalmente adicione um serviço padrão
    if (this.services.length === 0) {
      this.services.push({ id: 1, value: null });
    }
  }

  onServiceChange(index: number, event: any) {
    const selectedServiceId = event.detail.value;
    this.services[index].value = selectedServiceId;

    const selectedService = this.serviceOptions.find(option => option.id === selectedServiceId);

    if (selectedService) {
      this.totalTime += selectedService.time;
      this.totalPrice += selectedService.price;
    }

    this.formatOutput();

    // Adiciona um novo serviço apenas se o último campo tiver um valor
    if (index === this.services.length - 1 && selectedServiceId) {
      this.addService();
    }
  }

  formatOutput() {
    const hours = Math.floor(this.totalTime / 60); // Calcula as horas
    const minutes = this.totalTime % 60; // Calcula os minutos restantes

    // Cria a string no formato desejado
    if (hours > 0) {
      this.totalTimeString = `${hours}h e ${minutes} minutos`;
    } else {
      this.totalTimeString = `${minutes} minutos`;
    }

    this.totalPriceString = 'R$ ' + this.totalPrice;
  }
}
