import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-new-queue',
  templateUrl: './new-queue.page.html',
  styleUrls: ['./new-queue.page.scss']
})

export class NewQueuePage implements OnInit {
  
  isEditing = false;
  queueToEdit: any = null;
  form: any;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.queueToEdit = nav?.extras?.state?.['queue'] || null;
    this.isEditing = !!this.queueToEdit;
    this.initializeForm();
  }
  
  ngOnInit() {
    if (this.isEditing) {
      this.patchFormWithQueueData();
    }
  }

  private initializeForm() {
    const today = new Date().toISOString();
    const defaultOpeningTime = new Date();
    defaultOpeningTime.setHours(8, 0, 0);
    
    const defaultClosingTime = new Date();
    defaultClosingTime.setHours(18, 0, 0);

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date: [today.split('T')[0], Validators.required],
      openingTime: [defaultOpeningTime.toISOString(), Validators.required],
      closingTime: [defaultClosingTime.toISOString(), [
        Validators.required,
        this.validateClosingTime.bind(this)
      ]],
      type: ['normal', Validators.required],
      isRecurring: [false],
      recurringDays: [[]],
      recurringEndDate: ['']
    });
  }


  patchFormWithQueueData() {
    if (this.queueToEdit) {
      this.form?.patchValue({
        name: this.queueToEdit.name,
        date: this.queueToEdit.date,
        openingTime: this.queueToEdit.openingTime || new Date().toISOString(),
        closingTime: this.queueToEdit.closingTime || new Date().toISOString(),
        type: this.queueToEdit.type || 'normal',
        isRecurring: this.queueToEdit.isRecurring || false,
        recurringDays: this.queueToEdit.recurringDays || [],
        recurringEndDate: this.queueToEdit.recurringEndDate || ''
      });
    }
  }

  validateClosingTime(control: any) {
    if (!this.form) return null;
    
    const openingTime = this.form.get('openingTime')?.value;
    const closingTime = control.value;
    
    if (!openingTime || !closingTime) return null;
    
    const opening = new Date(openingTime).getTime();
    const closing = new Date(closingTime).getTime();
    
    return closing > opening ? null : { invalidClosingTime: true };
  }

  async save() {
    if (this.form?.invalid) {
      await this.showToast('Preencha todos os campos corretamente', 'danger');
      return;
    }

    const formValue = this.form?.value;
    const queueData = {
      ...formValue,
      status: 'Aberta',
      currentCount: 0
    };

    // implementar a lógica para salvar no  serviço
    // Exemplo: this.queueService.saveQueue(queueData, this.isEditing);
    
    await this.showToast(
      `Fila ${this.isEditing ? 'atualizada' : 'criada'} com sucesso!`, 
      'success'
    );
    
    this.router.navigate(['/queue-admin']);
  }

  cancel() {
    this.router.navigate(['/queue-admin']);
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  formatTime(timeString: string): string {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
