import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CategoryModel } from 'src/models/category-model';
import { SelectCompanyService } from 'src/services/select-company-service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  constructor(private alertController: AlertController, private router: Router, private service: SelectCompanyService) {
  }

  searching = false;
  categories: CategoryModel[] = [];
  searchQuery = '';
  showRecentCards = false;
  selectedServiceType: any;
  slideOpts = {
    slidesPerView: 1,
    pagination: true,
    navigation: false
  };

  companyCards = [
    {
      name: 'KING\'S SONS',
      type: 'barbearia',
      queue: 'FILA MENOR: 3 PESSOAS',
      img: 'assets/images/company-logo/kingssons.jpeg',
      liked: false
    },
    {
      name: 'SALÃO AUTO ESTIMA',
      type: 'salão de beleza',
      queue: 'FILA MENOR: 5 PESSOAS',
      img: 'assets/images/company-logo/autoestima.png',
      liked: false
    },
    {
      name: 'UOMAN-BEATY SALON',
      type: 'salão de beleza',
      queue: 'FILA MENOR: 10 PESSOAS',
      img: 'assets/images/company-logo/uoman.png',
      liked: false
    }
  ];

  ngOnInit() {
    this.loadCategories()
  }

  loadCategories() {
    this.service.loadCategories().subscribe({
      next: (response) => {
        this.categories = response.data; 
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      }
    });
  }

  onSlideChange(e: any) {
    console.log('SwiperRef:', e.detail[0].activeIndex);
  }

  get filteredCards() {
    const query = this.searchQuery.toLowerCase();
    return this.companyCards.filter(card => card.name.toLowerCase().includes(query));
  }

  toggleSearch() {
    this.searching = !this.searching;
    this.searchQuery = '';
  }

  toggleLike(card: any, event: MouseEvent): void {
    event.stopPropagation();
    card.liked = !card.liked;
    console.log(`${card.name} ${card.liked ? 'curtido' : 'descurtido'}`);
  }

  selectCard(card: any): void {
    console.log('Card selecionado:', card.name);
    this.router.navigate(['/select-professional']);
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value;
  }

  toggleRecentCards() {
    this.showRecentCards = !this.showRecentCards;
  }

  onSearchSubmit(searchQuery: string) {
    if (searchQuery && searchQuery.trim() !== '') {
      console.log('Busca por:', searchQuery);
      // FAZER O REQUEST PARA O BACKEND COM O VALOR DIGITADO PARA FILTRAR
    } else {
      console.log('Nenhum valor informado para busca');
    }
  }

  selectService(serviceType: any): void {
    console.log('Serviço selecionado:', serviceType);
  }

  scrollLeft() {
    const container = document.querySelector('.horizontal-scroll');
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const container = document.querySelector('.horizontal-scroll');
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }
}
