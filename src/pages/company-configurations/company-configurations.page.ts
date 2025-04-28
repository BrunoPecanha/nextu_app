import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-configurations',
  templateUrl: './company-configurations.page.html',
  styleUrls: ['./company-configurations.page.scss'],
})
export class CompanyConfigurationsPage  {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('wallpaperInput') wallpaperInput!: ElementRef<HTMLInputElement>;

  cadastroForm: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  wallpaperPreview: string | ArrayBuffer | null = null;
  enviando = false;
  enviado = false;

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      cpf: [''],
      cnpj: [''],
      nomeEmpresa: [''],
      endereco: [''],
      horarios: this.fb.array(this.diasSemana.map(() => this.createHorarioForm())),
      abrirAutomaticamente: [false],
      aceitarOutrasFilas: [false],
      atenderForaDeOrdem: [false],
      atenderHoraMarcada: [false],
      avisoWhatsApp: [false],
      subtituloLoja: [''],
      destaques: this.fb.array([]), // ← novo FormArray para ícones + frases
    });
  }

  createHorarioForm(): FormGroup {
    return this.fb.group({
      ativo: [false],
      inicio: [''],
      fim: [''],
    });
  }

  get destaques(): FormArray {
    return this.cadastroForm.get('destaques') as FormArray;
  }

  adicionarIconeFrase() {
    this.destaques.push(this.fb.group({
      icone: [''],
      frase: [''],
    }));
  }

  removerIconeFrase(index: number) {
    this.destaques.removeAt(index);
  }

  getHorarioFormGroup(index: number): FormGroup {
    return (this.cadastroForm.get('horarios') as FormArray).at(index) as FormGroup;
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

    this.enviando = true;

    // Simulação de envio
    setTimeout(() => {
      this.enviando = false;
      this.enviado = true;
      console.log('Dados enviados:', this.cadastroForm.value);
    }, 2000);
  }
}