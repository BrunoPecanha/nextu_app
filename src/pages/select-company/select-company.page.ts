import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CategoryModel } from 'src/models/category-model';
import { StoreModel } from 'src/models/store-model';
import { SelectCompanyService } from 'src/services/select-company-service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  constructor(private router: Router, private service: SelectCompanyService, private navCtrl: NavController) { }

  searching = false;
  categories: CategoryModel[] = [];
  companies: StoreModel[] = [];
  searchQuery = '';
  showRecentCards = false;
  selectedCategoryId: number | null = null;
  selectedFilter: 'minorQueue' | 'favorites' | 'recent' | null = null;
  slideOpts = {
    slidesPerView: 1,
    pagination: true,
    navigation: false
  };

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  private loadData() {
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
        this.companies = response.data.map(store => ({
          ...store,
          isNew: store.createdAt ? this.checkIfNew(store.createdAt) : false,
          liked: store.liked || false
        } as StoreModel));
      },
      error: (err) => {
        console.error('Erro ao carregar lojas:', err);
      }
    });
  }

  private checkIfNew(createdAt: string): boolean {
    try {
      const createdDate = new Date(createdAt);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } catch (e) {
      console.warn('Erro ao verificar data:', e);
      return false;
    }
  }

  get filteredCards() {

    const query = this.searchQuery.toLowerCase();
    return this.companies.filter(card =>
      card.name.toLowerCase().includes(query)
    );
  }

  toggleSearch() {
    this.searching = !this.searching;
    if (!this.searching) this.searchQuery = '';
  }

  toggleLike(card: any, event: MouseEvent): void {
    event.stopPropagation();
    card.liked = !card.liked;

    const heart = event.target as HTMLElement;
    heart.classList.add('heart-animation');
    setTimeout(() => heart.classList.remove('heart-animation'), 500);

    // Chamar rotina de like do back passando id do usuario e empresa // Regra: Empresas com like virão na frente por ordem alfabética
    console.log(`${card.name} ${card.liked ? 'curtido' : 'descurtido'}`);
  }

  selectCard(card: any): void {
    this.router.navigate(['/select-professional'], {
      queryParams: { storeId: card.id }
    });
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value;
  }

  selectCategory(idCategory: number): void {
    if (this.selectedCategoryId === idCategory) {
      this.selectedCategoryId = null;
      this.loadStores();
      return;
    }

    this.selectedCategoryId = idCategory;
    this.service.loadStoresByCategoryId(idCategory).subscribe({
      next: (response) => {
        this.companies = response.data.map(store => ({
          ...store,
          isNew: this.checkIfNew(store.createdAt),
          liked: store.liked || false,
          minorQueue: store.minorQueue || false
        } as StoreModel));
      },
      error: (err) => {
        console.error('Erro ao filtrar:', err);
      }
    });
  }

 

  getBack() {    
    this.navCtrl.back();
  }

  scrollLeft() {
    const container = document.querySelector('.categories-scroll');
    if (container) {
      container.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const container = document.querySelector('.categories-scroll');
    if (container) {
      container.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }

  applyFilter(filter: 'minorQueue' | 'favorites' | 'recent') {
    if (this.selectedFilter === filter) {
      this.selectedFilter = null;
      this.loadStores();
      return;
    }

    this.selectedFilter = filter;

    switch (filter) {
      case 'minorQueue':
        // this.service.loadStoresByMinorQueue().subscribe({
        //   next: (res) => (this.companies = res.data),
        //   error: (err) => console.error(err),
        // });
        break;
      case 'favorites':
        // this.service.loadFavoriteStores().subscribe({
        //   next: (res) => (this.companies = res.data),
        //   error: (err) => console.error(err),
        // });
        break;
      case 'recent':
        // this.service.loadRecentStores().subscribe({
        //   next: (res) => (this.companies = res.data),
        //   error: (err) => console.error(err),
        // });
        break;
    }
  }
}