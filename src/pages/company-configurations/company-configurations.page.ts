import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-configurations',
  templateUrl: './company-configurations.page.html',
  styleUrls: ['./company-configurations.page.scss'],
})
export class CompanyConfigurationsPage implements OnInit {

  @ViewChild('fileInput') fileInput: any;

  cadastroForm: FormGroup;
  diasAtivos: boolean[] = [];
  logoFile: File | null = null;
  logoPreview: string | null = null;
  imagemPreview: string | null = null;
  imagemFile: File | null = null;
  enviando = false;
  enviado = false;


  diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.cadastroForm = this.fb.group({
      cpf: [''],
      cnpj: [''],
      nomeEmpresa: [''],
      endereco: [''],
      abrirAutomaticamente: [false],
      horarios: this.fb.array(
        this.diasSemana.map(() =>
          this.fb.group({
            ativo: [false],
            inicio: [''],
            fim: ['']
          })
        )
      )
    });

  }

  ngOnInit() { }

  get horarios(): FormArray {
    return this.cadastroForm.get('horarios') as FormArray;
  }

  criarHorario(): FormGroup {
    return this.fb.group({
      ativo: [false],
      inicio: [''],
      fim: ['']
    });
  }

  selecionarImagem() {
    this.fileInput.nativeElement.click();
  }


  onImagemSelecionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagemFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getHorarioFormGroup(index: number): FormGroup {
    return this.horarios.at(index) as FormGroup;
  }

  // async enviar() {
  //   if (this.cadastroForm.valid) {
  //     this.enviando = true;

  //     const formData = new FormData();
  //     formData.append('cpf', this.cadastroForm.value.cpf);
  //     formData.append('cnpj', this.cadastroForm.value.cnpj);
  //     formData.append('nomeEmpresa', this.cadastroForm.value.nomeEmpresa);
  //     formData.append('abrirAutomaticamente', this.cadastroForm.value.abrirAutomaticamente);

  //     this.cadastroForm.value.horarios.forEach((h: any, index: number) => {
  //       formData.append(`horarios[${index}][ativo]`, h.ativo);
  //       formData.append(`horarios[${index}][inicio]`, h.inicio);
  //       formData.append(`horarios[${index}][fim]`, h.fim);
  //     });

  //     if (this.imagemFile) {
  //       formData.append('logo', this.imagemFile);
  //     }

  //     // Simulando envio (troque pelo seu serviço HTTP real)
  //     setTimeout(() => {
  //       console.log('Dados enviados:', formData);
  //       this.enviando = false;
  //     }, 2000);

  //   } else {
  //     this.cadastroForm.markAllAsTouched();
  //   }
  // }

  enviar() {
    if (this.cadastroForm.valid) {
      this.enviando = true;

      setTimeout(() => {
        this.enviando = false;
        this.enviado = true;
      
        setTimeout(() => {
          this.enviado = false;
          this.router.navigate(['/role-registration']); // 
        }, 3000);
      
      }, 2000);       
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  formatarCPF(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.cadastroForm.get('cpf')?.setValue(valor, { emitEvent: false });
  }

  formatarCNPJ(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 14) valor = valor.substring(0, 14);
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    this.cadastroForm.get('cnpj')?.setValue(valor, { emitEvent: false });
  }
}