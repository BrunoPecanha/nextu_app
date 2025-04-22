import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Queue {
  id: number;
  name: string;
  description?: string;
  avgWait?: number;
  services?: string[];
  peopleWaiting?: number;
  professionalId?: number;
}

interface Store {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  queues?: Queue[];
}

@Component({
  selector: 'app-select-professional',
  templateUrl: './select-professional.page.html',
  styleUrls: ['./select-professional.page.scss'],
})
export class SelectProfessionalPage implements OnInit {
  store: Store | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simulação de dados - Substituir depois por chamada HTTP
    this.store = {
      id: 1,
      name: 'King¨s Sons - Barbershop',
      description: 'Cortes na régua, química e aquele trato na régua.',
      imageUrl: 'assets/images/company-logo/kingssons.jpeg',
      queues: [
        {
          id: 1,
          name: 'Léo - Neymar',
          description: 'Tesoura e máquina',
          avgWait: 20,
          services: ['Corte', 'Barba'],
          peopleWaiting: 3,
          professionalId: 10,
        },
        {
          id: 2,
          name: 'Alisson Pretão',
          description: 'Combo completo',
          avgWait: 30,
          services: ['Corte', 'Barba'],
          peopleWaiting: 2,
          professionalId: 11,
        },
        {
          id: 3,
          name: 'Bruno Peçanha',
          description: 'Tesoura e máquina',
          avgWait: 20,
          services: ['Corte', 'Barba'],
          peopleWaiting: 3,
          professionalId: 10,
        },
      ],
    };

    // TODO: Substituir por chamada real para buscar a loja e suas filas
    // TODO: Buscar nome dos serviços e calcular tempo estimado por fila
  }

  entrarNaFila(fila: Queue) {
    // Aqui você pode navegar para uma rota passando o ID da fila
    console.log(`Entrar na fila: ${fila.name} (ID: ${fila.id})`);
    this.router.navigate(['/select-services'], {
      queryParams: { queueId: fila.id },
    });
  }

  toggleLike(queue: Queue, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    queue.liked = !queue.liked;
    console.log(`Fila ${queue.name} - liked: ${queue.liked}`);
  }

  abrirLojaDetalhada() {
    this.router.navigate(['/store-details', /*this.store?.id*/]);
  }  
}

interface Queue {
  id: number;
  name: string;
  description?: string;
  avgWait?: number;
  services?: string[];
  peopleWaiting?: number;
  professionalId?: number;
  liked?: boolean; 
}
