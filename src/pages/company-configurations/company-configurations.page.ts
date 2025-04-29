import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StatesService } from 'src/services/states.service';

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
  timeRemoval: number | null = null;
  states: Array<{ id: string, name: string }> = [];

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(private fb: FormBuilder, private stateService: StatesService) {
    this.cadastroForm = this.fb.group({
      cnpj: [''],
      name: [''],
      address: [''],
      number: [''],
      city: [''],
      state: [''],      
      openAutomatic: [false],
      storeSubtitle: [''],
      acceptOtherQueues: [true],
      answerOutOfOrder: [false],
      answerScheduledTime: [false],
      timeRemoval: [null],
      whatsAppNotice: [false],    
      logoPath: [''],
      wallPaperPath: [''],
      openingHours: this.fb.array(this.diasSemana.map(() => this.createHorarioForm())),
      highLights: this.fb.array([]),
    });

      this.states = this.stateService.getStates();    
  }

  createHorarioForm(): FormGroup {
    return this.fb.group({
      activated: [false],
      start: [''],
      end: [''],
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

  enviar() {
    if (this.cadastroForm.invalid) {
      return;
    }

    this.sending = true;

    setTimeout(() => {
      this.sending = false;
      this.sent = true;
      console.log('Dados enviados:', this.cadastroForm.value);
    }, 2000);
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