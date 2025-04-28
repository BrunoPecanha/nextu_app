import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-configurations',
  templateUrl: './user-configurations.page.html',
  styleUrls: ['./user-configurations.page.scss'],
})
export class UserConfigurationsPage {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('wallpaperInput') wallpaperInput!: ElementRef<HTMLInputElement>;

  cadastroForm: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  wallpaperPreview: string | ArrayBuffer | null = null;
  enviando = false;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      cpf: [''],
      nome: [''],
      endereco: [''],
      aceitarMensagemOutrosUsuarios: [false],
      profile: [''],
      senha: [''],
      wallpaper: ['']
    });
  }

  createHorarioForm(): FormGroup {
    return this.fb.group({
      ativo: [false],
      inicio: [''],
      fim: [''],
    });
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

  formatarCPF(event: any) {
    let valor = event.detail.value;
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.cadastroForm.get('cpf')?.setValue(valor, { emitEvent: false });
  }

  enviar() {
    if (this.cadastroForm.invalid) {
      return;
    }

    this.enviando = true;

    setTimeout(() => {
      this.enviando = false;
      this.enviado = true;
      console.log('Dados enviados:', this.cadastroForm.value);
    }, 2000);

    setTimeout(() => {
      this.enviado = false;
    }, 4000);
  }
}