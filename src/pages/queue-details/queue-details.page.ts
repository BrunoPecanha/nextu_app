import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.page.html',
  styleUrls: ['./queue-details.page.scss'],
})
export class QueueDetailsPage implements OnInit {  
  
  totalAttendedClients: number = 0;
  totalPix: number = 0;
  totalCartao: number = 0;  
  totalDinheiro: number = 0;
  total: number = 0;
  selectedDate: Date = new Date();
  attendedClients = [
    {
      name: 'João da Silva',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Pix',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Bruno Peçanha',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Pix',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Heitor Borges',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Pix',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Alexandre Barros',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Cartao',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Marvin Daniel',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Pix',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Léo Silva',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 10 * 60000),
      paymentMethod: 'Pix',
      amount: 30,
      totalTime: 20
    },
    {
      name: 'Maria Oliveira',
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 15 * 60000),
      paymentMethod: 'Dinheiro',
      amount: 30,
      totalTime: 30
    },
  ];

  
  ngOnInit() {
    this.getTotalAttendedClients();
    this.getTotalAmmount();
  }

  getTotalAttendedClients(): void {
    this.totalAttendedClients =  this.attendedClients.length;
  }

  getTotalAmmount(): void {    
    this.attendedClients.forEach(client => {
      if (client.paymentMethod === 'Pix') {
        this.totalPix += client.amount;
      } else if (client.paymentMethod === 'Cartao') {
        this.totalCartao += client.amount;    
      } else if (client.paymentMethod === 'Dinheiro') {
        this.totalDinheiro += client.amount;
      }
    });

    this.total = this.totalPix + this.totalCartao + this.totalDinheiro;
  }
}

