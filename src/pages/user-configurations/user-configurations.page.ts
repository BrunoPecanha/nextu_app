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
      nome: ['', [Validators.required]],
      endereco: [''],
      senha: ['', [Validators.minLength(6)]],
      subtitle: [''],
      servicesProvided: [''],
      aceitarMensagemOutrosUsuarios: [false],
      // Adicione outros campos conforme necessário
    });
  }

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