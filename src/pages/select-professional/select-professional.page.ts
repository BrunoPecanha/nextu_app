import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalModel } from 'src/models/professional-model';
import { StoreProfessionalModel } from 'src/models/store-professional-model';
import { StoresService } from 'src/services/stores-service';

@Component({
  selector: 'app-select-professional',
  templateUrl: './select-professional.page.html',
  styleUrls: ['./select-professional.page.scss'],
})
export class SelectProfessionalPage implements OnInit {
  store: StoreProfessionalModel | null = null;
  storeId: number = 0;

  bannerLoaded = false;
  logoLoaded = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: StoresService) { }

  ngOnInit() {
    this.getSelectedStoreId();
    this.resetImageStates()
    this.loadStoreAndProfessionals(this.storeId);
  }

  loadStoreAndProfessionals(storeId: number) {
    this.service.loadStoreAndProfessionals(storeId).subscribe({
      next: (response) => {
        this.store = response.data;
      },
      error: (err) => {
        console.error('Erro ao carregar filas disponíveis:', err);
      }
    });
  }

  getSelectedStoreId() {
    this.route.queryParams.subscribe(params => {
      this.storeId = params['storeId'];
    });
  }

  getInTheQueue(fila: ProfessionalModel) {
    this.router.navigate(['/select-services'], {
      queryParams: { queueId: fila.queueId, storeId: this.storeId },
    });
  }

  toggleLike(queue: ProfessionalModel, event: Event) {
    event.stopPropagation();
     event.preventDefault();
     queue.liked = !queue.liked;
     console.log(`Fila ${queue.name} - liked: ${queue.liked}`);
  }

  abrirLojaDetalhada() {    
    this.router.navigate(['/store-details', this.storeId]);
  }

  getProgressoFila(qtdPessoas: number): number {
    const maxPessoas = 10;
    const progresso = (qtdPessoas / maxPessoas) * 100;
    return Math.min(progresso, 100);
  }

  getCorProgresso(qtdPessoas: number): string {
    if (qtdPessoas <= 3) return '#4caf50';
    if (qtdPessoas <= 7) return '#ff9800';
    return '#f44336';
  }

  getStatusFilaTexto(qtdPessoas: number): string {
    if (qtdPessoas === 0) return 'Fila vazia';
    if (qtdPessoas <= 3) return 'Fila leve';
    if (qtdPessoas <= 7) return 'Fila moderada';
    return 'Fila cheia';
  }

  resetImageStates() {
    this.bannerLoaded = false;
    this.logoLoaded = false;
  }
}