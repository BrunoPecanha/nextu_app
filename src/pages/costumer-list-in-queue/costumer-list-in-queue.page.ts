import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costumer-list-in-queue',
  templateUrl: './costumer-list-in-queue.page.html',
  styleUrls: ['./costumer-list-in-queue.page.scss'],
})
export class CostumerListInQueuePage implements OnInit {

  clientes: any;
  
  constructor() { 
    this.clientes = [
      { nome: 'JOSÉ', servicos: 'CORTE À MÁQUINA, BARBA', hora: '14:00', pagamento: 'DINHEIRO' },
      { nome: 'ANDRÉ', servicos: 'CORTE À TESOURA, BARBA', hora: '14:10', pagamento: 'C. CRÉDITO' },
      { nome: 'CAMILA', servicos: 'CORTE À TESOURA, PINTAR CABELO', hora: '14:15', pagamento: 'DINHEIRO' }
    ];

  }

  ngOnInit() {
  }

  obterIconePagamento(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'dinheiro': return 'cash-outline';
      case 'c. credito': return 'card-outline';
      case 'pix': return 'qr-code-outline';
      default: return 'help-outline';
    }
  }
  
  calcularTempoEspera(horaEntrada: string): string {
    const agora = new Date();
    const [h, m] = horaEntrada.split(':').map(Number);
    const entrada = new Date();
    entrada.setHours(h, m, 0, 0);
  
    const diffMs = agora.getTime() - entrada.getTime();
    const diffMin = Math.floor(diffMs / 60000);
  
    return `Esperando há ${diffMin} min`;
  }

}
