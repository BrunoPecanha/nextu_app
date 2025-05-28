import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-user-configurations',
  templateUrl: './user-configurations.page.html',
  styleUrls: ['./user-configurations.page.scss'],
})
export class UserConfigurationsPage {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('wallpaperInput') wallpaperInput!: ElementRef<HTMLInputElement>;
  
  cadastroForm: FormGroup;
  imagemPreview: string | null = null;
  wallpaperPreview: string | null = null;
  enviando = false;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      name: ['', [Validators.required]],
      address: [''],
      number: [''],
      password: ['', [Validators.minLength(6)]],
      subtitle: [''],
      email: [''],
      ddd: [''],
      phone: [''],
      city: [''],
      state: [''],
      lastName: [''],
      servicesProvided: [''],
      aceptMesageFromOtherUsers: [false],
      lookForMinorQueue: [false]
    });
  }

    brazilianStates = [
    { acronym: 'AC', name: 'Acre' },
    { acronym: 'AL', name: 'Alagoas' },
    { acronym: 'AP', name: 'Amapá' },
    { acronym: 'AM', name: 'Amazonas' },
    { acronym: 'BA', name: 'Bahia' },
    { acronym: 'CE', name: 'Ceará' },
    { acronym: 'DF', name: 'Distrito Federal' },
    { acronym: 'ES', name: 'Espírito Santo' },
    { acronym: 'GO', name: 'Goiás' },
    { acronym: 'MA', name: 'Maranhão' },
    { acronym: 'MT', name: 'Mato Grosso' },
    { acronym: 'MS', name: 'Mato Grosso do Sul' },
    { acronym: 'MG', name: 'Minas Gerais' },
    { acronym: 'PA', name: 'Pará' },
    { acronym: 'PB', name: 'Paraíba' },
    { acronym: 'PR', name: 'Paraná' },
    { acronym: 'PE', name: 'Pernambuco' },
    { acronym: 'PI', name: 'Piauí' },
    { acronym: 'RJ', name: 'Rio de Janeiro' },
    { acronym: 'RN', name: 'Rio Grande do Norte' },
    { acronym: 'RS', name: 'Rio Grande do Sul' },
    { acronym: 'RO', name: 'Rondônia' },
    { acronym: 'RR', name: 'Roraima' },
    { acronym: 'SC', name: 'Santa Catarina' },
    { acronym: 'SP', name: 'São Paulo' },
    { acronym: 'SE', name: 'Sergipe' },
    { acronym: 'TO', name: 'Tocantins' }
  ];

  selecionarImagem() {
    this.fileInput.nativeElement.click();
  }

  selecionarWallpaper() {
    this.wallpaperInput.nativeElement.click();
  }

  onImagemSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.createImagePreview(file, 'imagemPreview');
    }
  }

  onWallpaperSelecionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.createImagePreview(file, 'wallpaperPreview');
    }
  }

  private createImagePreview(file: File, property: 'imagemPreview' | 'wallpaperPreview') {
    const reader = new FileReader();
    reader.onload = (e) => {
      this[property] = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removerWallpaper() {
    this.wallpaperPreview = null;
    this.wallpaperInput.nativeElement.value = '';
  }

  formatarCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 3) {
      value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
      value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
      value = value.substring(0, 11) + '-' + value.substring(11);
    }
    
    this.cadastroForm.get('cpf')?.setValue(value, { emitEvent: false });
  }

  async enviar() {
    if (this.cadastroForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos obrigatórios corretamente',
        duration: 3000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      return;
    }

    this.enviando = true;
    
    setTimeout(() => {
      this.enviando = false;
      this.enviado = true;
      
      setTimeout(() => this.enviado = false, 2000);
    }, 1500);
  }

  getBack() {    
    this.navCtrl.back();
  }
}