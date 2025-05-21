import { Component, OnInit, ChangeDetectorRef, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ServiceCategoryResponse } from 'src/models/responses/service-category-response';
import { ServiceResponse } from 'src/models/responses/service-response';
import { ServiceCategoryModel } from 'src/models/service-category-model';
import { ServiceModel } from 'src/models/service-model';
import { ServiceCategoryService } from 'src/services/service-category-service';
import { ServiceService } from 'src/services/services-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.page.html',
  styleUrls: ['./service-registration.page.scss'],
})
export class ServiceRegistrationPage implements OnInit {
  @ViewChildren('fileInput') fileInputs: QueryList<ElementRef> = new QueryList<ElementRef>();
  expandedIndex: number | null = null;
  previewUrls: (string | ArrayBuffer | null)[] = [];
  formattedPrices: string[] = [];
  isNewService = false;
  categories: ServiceCategoryModel[] = [];
  store: any;
  isInitialLoading: boolean = true;
  noRecordsFound: boolean = false;

  serviceFormArray: FormGroup[] = [];
  isLoading: boolean[] = [];
  saved: boolean[] = [];

  services: ServiceModel[] = [];

  constructor(private fb: FormBuilder, public session: SessionService, private cdRef: ChangeDetectorRef, private categoryService: ServiceCategoryService, private service: ServiceService, private navCtrl: NavController) {
  }

  ngOnInit() {
    this.store = this.session.getStore();
    this.loadCategories();
    this.loadServices();
  }

  onImageSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.serviceFormArray[index].patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[index] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.serviceFormArray[index].patchValue({ image: null });
    this.previewUrls[index] = null;
  }

  onPriceInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const onlyNumbers = input.value.replace(/\D/g, '');

    if (!onlyNumbers) {
      this.formattedPrices[index] = '';
      this.serviceFormArray[index].get('price')?.setValue(null);
      return;
    }

    const float = parseFloat(onlyNumbers) / 100;
    const formatted = float.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    this.formattedPrices[index] = formatted;
    this.serviceFormArray[index].get('price')?.setValue(float);
  }

  triggerFileInput(index: number) {
    const fileInputs = this.fileInputs.toArray();
    if (fileInputs[index]) {
      fileInputs[index].nativeElement.click();
    }
  }

  loadServices(): Promise<void> {
    this.isInitialLoading = true;
    this.noRecordsFound = false;

    return new Promise((resolve, reject) => {
      this.service.loadServicesByStore(this.store.id, false).subscribe({
        next: (response: ServiceResponse) => {
          this.services = response.data;
          this.noRecordsFound = this.services.length === 0;
          this.initializeForms();
          this.isInitialLoading = false;
          resolve();
        },
        error: (err) => {
          console.error('Erro ao carregar serviços', err);
          this.isInitialLoading = false;
          this.noRecordsFound = true;
          reject(err);
        }
      });
    });
  }

  initializeForms() {
    this.serviceFormArray = [];
    this.previewUrls = [];
    this.formattedPrices = [];
    this.isLoading = [];
    this.saved = [];

    if (this.services.length > 0) {
      this.services.forEach((service) => {
        const totalMinutes = this.timeSpanToMinutes(service.duration.toString());
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        this.serviceFormArray.push(
          this.fb.group({
            id: [service.id],
            name: [service.name, Validators.required],
            description: [service.description],
            category: [this.categories.find(c => c.id === service.category.id)],
            price: [service.price, [Validators.required, Validators.min(0)]],
            durationHours: [hours, [Validators.required, Validators.min(0)]],
            durationMinutes: [minutes, [Validators.required, Validators.min(0), Validators.max(59)]],
            image: [service.imgPath],
            active: [service.activated],
            variablePrice: [service.variablePrice],
            variableTime: [service.variableTime],
          })
        );

        this.previewUrls.push(service.imgPath);
        this.formattedPrices.push(
          service.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        );
        this.isLoading.push(false);
        this.saved.push(false);
      });
    }

    this.cdRef.detectChanges();
  }

  loadCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoryService.getServiceCategories().subscribe({
        next: (response: ServiceCategoryResponse) => {
          this.categories = response.data.map(cat => ({
            ...cat,
            icon: this.unicodeToEmoji(cat.icon)
          }));
          resolve();
        },
        error: (err) => {
          console.error('Erro ao carregar categorias', err);
          reject(err);
        }
      });
    });
  }

  unicodeToEmoji(text: string): string {
    if (text) {
      return text.replace(/\\u([\dA-F]{4})|\\u\{([\dA-F]{1,6})\}/gi,
        (match, g1, g2) => {
          const hexCode = g1 || g2;
          return String.fromCodePoint(parseInt(hexCode, 16));
        }
      );
    }
    return '';
  }

  private timeSpanToMinutes(timeSpan: string): number {
    if (!timeSpan) return 0;

    const [hours, minutes] = timeSpan.split(':').map(Number);
    return (hours * 60) + minutes;
  }

  async salvar(index: number) {
    const form = this.serviceFormArray[index];
    if (form.invalid) {
      this.markFormGroupTouched(form);
      return;
    }

    this.isLoading[index] = true;
    this.saved[index] = false;
    this.cdRef.detectChanges();

    try {
      const formData = form.value;
      const duration = this.formatDuration(formData);

      const serviceData = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        categoryId: formData.category.id,
        price: formData.price,
        duration: duration,
        activated: formData.active,
        variablePrice: formData.variablePrice,
        variableTime: formData.variableTime,
        storeId: this.store.id
      };

      if (this.isNewService && index === 0) {
        await this.createNewService(serviceData, formData.image, index);
      } else {
        const serviceId = this.services[this.isNewService ? index - 1 : index].id;
        await this.updateExistingService(serviceId, serviceData, formData.image, index);
      }

      this.saved[index] = true;
      setTimeout(() => {
        this.saved[index] = false;
        this.cdRef.detectChanges();
      }, 2000);

      await this.loadServices();
      this.isNewService = false;
      this.expandedIndex = null;

    } catch (error) {
      console.error('Erro ao salvar serviço:', error);

    } finally {
      this.isLoading[index] = false;
      this.cdRef.detectChanges();
    }
  }

  private async createNewService(serviceData: any, imageFile: File | null, index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      Object.keys(serviceData).forEach(key => {
        formData.append(key, serviceData[key]);
      });

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      console.log('Serviço criado com sucesso:', formData);

      this.service.createService(formData).subscribe({
        next: (response) => {
          console.log('Serviço criado com sucesso:', response);
          resolve();
        },
        error: (err) => {
          console.error('Erro ao criar serviço:', err);
          reject(err);
        }
      });
    });
  }

  private async updateExistingService(serviceId: number, serviceData: any, imageFile: File | null, index: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      Object.keys(serviceData).forEach(key => {
        formData.append(key, serviceData[key]);
      });

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      this.service.updateService(serviceId, formData).subscribe({
        next: (response) => {
          console.log('Serviço atualizado com sucesso:', response);
          resolve();
        },
        error: (err) => {
          console.error('Erro ao atualizar serviço:', err);
          reject(err);
        }
      });
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  adicionarNovoServico() {
    if (this.isNewService) {
      return;
    }

    if (this.serviceFormArray.length === 0) {
      this.previewUrls = [];
      this.formattedPrices = [];
      this.isLoading = [];
      this.saved = [];
    }

    const newForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      durationHours: [0, [Validators.required, Validators.min(0)]],
      durationMinutes: [30, [Validators.required, Validators.min(0), Validators.max(59)]],
      image: [null],
      variablePrice: [false],
      variableTime: [false],
      active: [true]
    });

    this.serviceFormArray.unshift(newForm);
    this.previewUrls.unshift(null);
    this.formattedPrices.unshift('');
    this.isLoading.unshift(false);
    this.saved.unshift(false);

    this.isNewService = true;
    this.expandedIndex = 0;

    this.cdRef.detectChanges();
  }

  getHours(duration: number): number {
    return Math.floor(duration / 60);
  }

  getMinutes(duration: number): number {
    return duration % 60;
  }

  cancelar(index: number) {
    if (this.isNewService && index === 0) {
      this.serviceFormArray.shift();
      this.previewUrls.shift();
      this.formattedPrices.shift();
      this.isLoading.shift();
      this.saved.shift();

      this.isNewService = false;
    } else {
      const serviceIndex = this.isNewService ? index - 1 : index;
      const originalService = this.services[serviceIndex];

      const totalMinutes = this.timeSpanToMinutes(originalService.duration.toString());
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      this.serviceFormArray[index].patchValue({
        name: originalService.name,
        description: originalService.description,
        category: this.categories.find(c => c.id === originalService.category.id),
        price: originalService.price,
        durationHours: hours,
        durationMinutes: minutes,
        image: originalService.imgPath,
        active: originalService.activated,
        variablePrice: originalService.variablePrice,
        variableTime: originalService.variableTime
      });

      this.previewUrls[index] = originalService.imgPath;
      this.formattedPrices[index] = originalService.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    this.expandedIndex = null;
    this.cdRef.detectChanges();
  }

  toggleExpand(i: number) {
    if (this.expandedIndex === i) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = i;
    }
  }

  formatDuration(formData: any) {
    const hours = formData.durationHours.toString().padStart(2, '0');
    const minutes = formData.durationMinutes.toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getBack() {    
    this.navCtrl.back();
  }
}