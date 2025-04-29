import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/models/category-model';
import { StoreModel } from 'src/models/store-model';
import { SelectCompanyService } from 'src/services/select-company-service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  constructor(private router: Router, private service: SelectCompanyService) {
  }

  searching = false;
  categories: CategoryModel[] = [];
  companies: StoreModel[] = []
  searchQuery = '';
  showRecentCards = false;
  selectedCategoryId: number | null = null; 
  slideOpts = {
    slidesPerView: 1,
    pagination: true,
    navigation: false
  };

  ngOnInit() {
    this.loadCategories();
    this.loadStores();
  }

  ionViewWillEnter() {
    this.loadCategories();
    this.loadStores();
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

  loadStores() {
    this.service.loadStores().subscribe({
      next: (response) => {
        this.companies = response.data; 
      },
      error: (err) => {
        console.error('Erro ao carregar lojas:', err);
      }
    });
  }

  onSlideChange(e: any) {
    console.log('SwiperRef:', e.detail[0].activeIndex);
  }

  get filteredCards() {    
    const query = this.searchQuery.toLowerCase();
    var teste = this.companies.filter(card => card.name.toLowerCase().includes(query));
    return teste;
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

  selectCategory(idCategory: any): void {    
    this.selectedCategoryId = idCategory;
    this.service.loadStoresByCategoryId(idCategory).subscribe({
      next: (response) => {
        this.companies = response.data; 
      },
      error: (err) => {
        console.error('Erro ao filtrar:', err);
      }
    });
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
