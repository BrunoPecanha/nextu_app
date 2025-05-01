import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryModel } from 'src/models/category-model';
import { CategoryResponse } from 'src/models/responses/category-response';
import { CategoryService } from 'src/services/category-service';
import { StatesService } from 'src/services/states.service';
import { StoreService } from 'src/services/store-service';

@Component({
  selector: 'app-company-configurations',
  templateUrl: './company-configurations.page.html',
  styleUrls: ['./company-configurations.page.scss'],
})
export class CompanyConfigurationsPage {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('wallpaperInput') wallpaperInput!: ElementRef<HTMLInputElement>;

  cadastroForm: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  wallpaperPreview: string | ArrayBuffer | null = null;
  sending = false;
  sent = false;
  category: number | null = null;
  cnpj: string | null = null;
  name: string | null = null;
  address: string | null = null;
  timeRemoval: number | null = null;
  states: Array<{ id: string, name: string }> = [];
  categories: CategoryModel[] = [];
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  saved = false;

  weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(private fb: FormBuilder, private stateService: StatesService, private categoryService: CategoryService,
    private storeService: StoreService) {

    this.cadastroForm = this.fb.group({
      ownerId: 1,
      logoPath: [''],
      cnpj: [''],
      name: [''],
      address: [''],
      city: [''],
      state: [''],
      category: [''],
      openingHours: this.fb.array(
        this.weekDays.map(day => this.createHorarioForm(day))
      ),
      openAutomatic: [false],
      acceptOtherQueues: [false],
      answerOutOfOrder: [false],
      answerScheduledTime: [false],
      whatsAppNotice: [false],
      timeRemoval: [null],
      wallPaperPath: [''],
      storeSubtitle: [''],
      highLights: this.fb.array([])
    });

    this.loadStates();
    this.loadCategories();
  }

  createHorarioForm(weekday: string): FormGroup {
    return this.fb.group({
      weekday: [weekday],
      activated: [false],
      start: [null],
      end: [null]
    });
  }

  get highLights(): FormArray {
    return this.cadastroForm.get('highLights') as FormArray;
  }

  adicionarIconeFrase() {
    this.highLights.push(this.fb.group({
      icon: [''],
      phrase: [''],
    }));
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: CategoryResponse) => {
        if (response.valid && response.data) {
          this.categories = response.data.map(category => ({
            id: category.id,
            name: category.name,
            imgPath: category.imgPath
          }));
        } else {
          console.warn('Resposta inválida ao carregar categorias');
          this.categories = [];
        }
      },
      error: (error) => {
        console.error('Erro ao carregar categorias:', error);
        this.categories = [];
      },
      complete: () => {
        console.log('Carregamento de categorias concluído');
      }
    });
  }

  loadStates() {
    this.states = this.stateService.getStates();
  }

  removerIconeFrase(index: number) {
    this.highLights.removeAt(index);
  }

  getHorarioFormGroup(index: number): FormGroup {
    return (this.cadastroForm.get('openingHours') as FormArray).at(index) as FormGroup;
  }

  selecionarImagem() {
    this.fileInput.nativeElement.click();
  }

  onImagemSelecionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  selecionarWallpaper() {
    this.wallpaperInput.nativeElement.click();
  }

  onWallpaperSelecionado(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.wallpaperPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removerWallpaper() {
    this.wallpaperPreview = null;
    if (this.wallpaperInput) {
      this.wallpaperInput.nativeElement.value = '';
    }
  }
  formatarCNPJ(event: any) {
    let valor = event.detail.value;
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    this.cadastroForm.get('cnpj')?.setValue(valor, { emitEvent: false });
  }

  enviar(): void {
    this.successMessage = null;
    this.errorMessage = null;
    this.saved = false; 
  
    const cnpjControl = this.cadastroForm.get('cnpj');
    if (cnpjControl && cnpjControl.value) {
      const cnpjLimpo = cnpjControl.value.replace(/[\.\/\-]/g, '');
      cnpjControl.setValue(cnpjLimpo);
    }
  
    if (this.cadastroForm.valid) {
      this.sending = true;
      this.loading = true; 
  
      const storeData = this.storeService.prepareStoreData(this.cadastroForm);
  
      this.storeService.createStore(storeData).subscribe({
        next: (response) => {
          this.sending = false;
          this.loading = false; 
  
          if (response.valid) {
            this.saved = true; 
            this.successMessage = 'Loja cadastrada com sucesso!';
            console.log('Loja criada com sucesso!', response.data);  
          } else {
            this.errorMessage = response.message || 'Falha ao cadastrar loja. Por favor, tente novamente.';
            console.error('Falha ao criar loja:', response.message);
          }
        },
        error: (error) => {
          this.sending = false;
          this.loading = false;
          this.errorMessage = 'Erro ao conectar com o servidor. Por favor, verifique sua conexão.';
          console.error('Erro na requisição:', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      console.warn('Formulário inválido');
      this.markFormGroupTouched(this.cadastroForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  formatPhoneNumber(phoneNumber: any): string | null {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length < 10 || cleaned.length > 11) {
      return null;
    }

    const isMobile = cleaned.length === 11;

    if (isMobile) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const phoneRegex = /^(\d{2})([2-5]\d{7}|9\d{8})$/;

    return phoneRegex.test(cleaned);
  }

  formatAndValidatePhone(phoneNumber: string): {
    formatted: string | null;
    isValid: boolean;
  } {
    const formatted = this.formatPhoneNumber(phoneNumber);
    const isValid = this.validatePhoneNumber(phoneNumber);

    return {
      formatted,
      isValid
    };
  }
}