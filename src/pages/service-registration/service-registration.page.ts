import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-registration',
  templateUrl: './service-registration.page.html',
  styleUrls: ['./service-registration.page.scss'],
})
export class ServiceRegistrationPage implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private cdRef: ChangeDetectorRef) { }

  expandedIndex: number | null = null;
  previewUrls: (string | ArrayBuffer | null)[] = [];
  formattedPrices: string[] = [];
  isNovoServico = false;
  categorias = ['Cabelo', 'Barba', 'Manicure', 'Carro', 'Pet', 'Outros'];

  services = [
    {
      name: 'Corte Masculino',
      description: 'Corte de cabelo completo com finalização.',
      category: 'Cabelo',
      price: 40,      
      status: false,
      duration: 30,
      image: 'assets/images/utils/corte-tesoura.jpg',
      variablePrice: true,
      variableTime: false
    },
    {
      name: 'Corte à tesoura',
      description: 'Modelagem, aparo e toalha quente.',
      category: 'Barba',
      price: 25,      
      status: true,
      duration: 20,
      image: 'assets/images/utils/corte-tesoura.jpg',
      variablePrice: true,
      variableTime: false
    },
    {
      name: 'Manicure Simples',
      description: 'Limpeza e esmaltação básica.',
      category: 'Manicure',
      price: 30,
      duration: 35,      
      status: true,
      image: 'assets/images/utils/unha.png',
      variablePrice: true,
      variableTime: true
    },
    {
      name: 'Corte à máquina desfarçado',
      description: 'Lavagem externa e aspiração interna.',
      category: 'Carro',
      price: 50,      
      status: false,
      duration: 45,
      image: 'assets/images/utils/corte-maquina.jpg',
      variablePrice: true,
      variableTime: true
    },
    {
      name: 'Descoloração',
      description: 'Tosa leve para higiene do pet.',
      category: 'Pet',
      price: 60,
      status: true,
      duration: 40,
      image: 'assets/images/utils/descoloracao.jpg',
      variablePrice: true,
      variableTime: true
    },
  ];

  serviceFormArray: FormGroup[] = [];
  isLoading: boolean[] = [];
  saved: boolean[] = [];

  ngOnInit() {
    this.services.forEach((service, index) => {
      this.serviceFormArray.push(
        this.fb.group({
          name: [service.name, Validators.required],
          description: [service.description],
          category: [service.category, Validators.required],
          price: [service.price, [Validators.required, Validators.min(0)]],
          duration: [service.duration, [Validators.required, Validators.min(1)]],
          image: [service.image],
          active: [service.status],
          variablePrice: [service.variablePrice],
          variableTime: [service.variableTime],
        })
      );

      this.previewUrls.push(service.image);
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

  async salvar(index: number) {
    const form = this.serviceFormArray[index];
    if (form.invalid) return;
  
    this.isLoading[index] = true;
    this.saved[index] = false;
  
    const updatedService = form.value;
  
    setTimeout(() => {
      this.isLoading[index] = false;
      this.saved[index] = true;
  
      this.cdRef.detectChanges();
  
      setTimeout(() => {
        this.expandedIndex = null;
        this.saved[index] = false;
      }, 1000);
    }, 1500);
  }
  
  adicionarNovoServico() {
    const novoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      duration: [null, [Validators.required, Validators.min(1)]],
      image: [null],
      active: [true], 
    });

    this.serviceFormArray.unshift(novoForm);
    this.previewUrls.unshift(null);
    this.formattedPrices.unshift('');
    this.isLoading.unshift(false);
    this.saved.unshift(false);
    this.expandedIndex = 0;
    this.isNovoServico = true;
  }

  cancelar(i: number) {
    if (i === 0 && this.isNovoServico) {
      this.serviceFormArray.splice(i, 1);
      this.previewUrls.splice(i, 1);
      this.formattedPrices.splice(i, 1);
      this.isLoading.splice(i, 1);
      this.saved.splice(i, 1);

      this.isNovoServico = false;
    } else {
      const original = this.services[i]; 
      const form = this.serviceFormArray[i];

      form.patchValue({
        name: original.name,
        description: original.description,
        category: original.category,
        price: original.price,
        duration: original.duration,
        image: original.image,
      });

      this.previewUrls[i] = original.image;
      this.formattedPrices[i] = original.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    if (this.expandedIndex === i) {
      this.expandedIndex = null;
    }

    this.cdRef.detectChanges();
  }

  toggleExpand(i: number) {
    if (this.expandedIndex === i) {
      this.expandedIndex = null; 
    } else {
      this.expandedIndex = i;
    }
  }
}