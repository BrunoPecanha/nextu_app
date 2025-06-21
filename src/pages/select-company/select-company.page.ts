import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CategoryModel } from 'src/models/category-model';
import { StoreModel } from 'src/models/store-model';
import { FavoriteService } from 'src/services/favorite.service';
import { SelectCompanyService } from 'src/services/select-company.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  constructor(
    private router: Router,
    private service: SelectCompanyService,
    private navCtrl: NavController,
    private session: SessionService,
    private favoriteService: FavoriteService
  ) { }

  isLoading = false;
  isEmptyResult = false;
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
    this.loadFilteredStores();
  }

  private loadFilteredStores(categoryId?: number, quickFilter?: string) {
    this.isLoading = true;
    this.isEmptyResult = false;

    const user = this.session.getUser();
    const userId = user?.id;

    this.service.loadFilteredStores(categoryId, quickFilter, userId).subscribe({
      next: (response) => {
        this.companies = response.data.map(store => ({          
          ...store,
          isNew: this.checkIfNew(store.createdAt),
          liked: store.liked || false,
          minorQueue: store.minorQueue || false
        } as StoreModel));

        this.isEmptyResult = this.companies.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar lojas:', err);
        this.isLoading = false;
        this.isEmptyResult = true;
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

  toggleLike(card: StoreModel, event: MouseEvent): void {
    event.stopPropagation();

    const user = this.session.getUser();
    if (!user || !user.id) {
      this.showLoginAlert();
      return;
    }    

    const heart = event.target as HTMLElement;
    heart.classList.add('heart-animation');

    const previousLikeState = card.liked;

    card.liked = !card.liked;

    const likeOperation = card.liked
      ? this.favoriteService.likeStore(card.id, user.id)
      : this.favoriteService.dislikeStore(card.id, user.id);

    likeOperation.subscribe({
      next: (response) => {
        if (!response.valid) {
          card.liked = previousLikeState;
          this.showErrorToast('Ocorreu um erro ao processar sua ação');
        }
        console.log(`${card.name} ${card.liked ? 'curtido' : 'descurtido'}`, response);
      },
      error: (err) => {
        card.liked = previousLikeState;
        console.error('Erro ao atualizar like:', err);
        this.showErrorToast('Falha na conexão. Tente novamente.');
      },
      complete: () => {
        setTimeout(() => heart.classList.remove('heart-animation'), 500);
      }
    });
  }

  private showLoginAlert(): void {
    console.warn('Usuário não logado. Redirecionar para login.'); 
  }

  private showErrorToast(message: string): void {
    console.error(message);
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
      this.loadFilteredStores();
      return;
    }

    this.selectedCategoryId = idCategory;
    this.loadFilteredStores(idCategory);
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
      this.loadFilteredStores();
      return;
    }

    this.selectedFilter = filter;
    let quickFilter: string;

    switch (filter) {
      case 'minorQueue':
        quickFilter = 'minorQueue';
        break;
      case 'favorites':
        quickFilter = 'favorites';
        break;
      case 'recent':
        quickFilter = 'recent';
        break;
    }
    const categoryId = this.selectedCategoryId !== null ? this.selectedCategoryId : undefined;
    this.loadFilteredStores(categoryId, quickFilter);
  }
}