import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';

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
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      name: ['', [Validators.required]],
      lastName: [''],
      address: [''],
      number: [''],
      password: [''],
      subtitle: [''],
      email: ['', [Validators.required, Validators.email]],
      ddd: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      city: [''],
      stateId: [''],
      servicesProvided: [''],
      aceptMesageFromOtherUsers: [false],
      acceptAwaysMinorQueue: [false],
      deleteAccount: [false]
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
      this.selectedImageFile = file; // Armazena o arquivo original
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

    const formData = new FormData();

    Object.keys(this.cadastroForm.controls).forEach(key => {
      const control = this.cadastroForm.get(key);
      if (control && key !== 'deleteAccount') {
        formData.append(key, control.value);
      }
    });

    if (this.selectedImageFile) {
      formData.append('profileImage', this.selectedImageFile, this.selectedImageFile.name);
    }

    try {
      if (this.cadastroForm.get('deleteAccount')?.value) {        
        await this.deleteAccount(formData);
      } else {        
        await this.updateProfile(formData);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      this.showErrorToast('Erro ao enviar dados. Tente novamente.');
    } finally {
      this.enviando = false;
    }
  }

  private async deleteAccount(formData: FormData) {  
    formData.append('deleteAccount', 'true');

    const response = await fetch('SUA_URL_API_DELETE_ACCOUNT', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      this.logout();
      this.showSuccessToast('Sua conta foi deletada com sucesso');
    } else {
      throw new Error('Falha ao deletar conta');
    }
  }

  private async showSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }


  private async updateProfile(formData: FormData) {    
    const response = await fetch('SUA_URL_API_AQUI', {
      method: 'POST',
      body: formData    
    });

    if (response.ok) {
      this.enviado = true;
      this.showSuccessToast('Perfil atualizado com sucesso!');
      setTimeout(() => this.enviado = false, 2000);
    } else {
      throw new Error('Falha ao atualizar perfil');
    }
  }

  getBack() {
    this.navCtrl.back();
  }

  async onDeleteAccountToggle(event: any) {
    if (event.detail.checked) {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar exclusão',
        message: 'Esta ação é irreversível e você perderá todos os dados associados à sua conta. Tem certeza que deseja continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              this.cadastroForm.get('deleteAccount')?.setValue(false);
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              return true;
            }
          }
        ]
      });

      await alert.present();
    }
  }

  logout() {
    this.navCtrl.navigateRoot('/splash');

    this.toastCtrl.create({
      message: 'Sua conta foi deletada com sucesso',
      duration: 3000,
      color: 'success',
      position: 'top'
    }).then(toast => toast.present());
  }
}