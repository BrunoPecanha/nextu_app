import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Professional {
  name: string;
  cpf: string;
}

interface Invite {
  id: number;
  establishmentName: string;
}

@Component({
  selector: 'app-associated-professional',
  templateUrl: './associated-professional.page.html',
  styleUrls: ['./associated-professional.page.scss']
})
export class AssociatedProfessionalPage {
  userRole: 'owner' | 'professional' = 'owner';

  professionals: Professional[] = [
    { name: 'João da Silva', cpf: '123.456.789-00' },
    { name: 'Maria Souza', cpf: '987.654.321-00' }
  ];

  pendingInvites: Invite[] = [
    { id: 1, establishmentName: 'Barbearia do Zé' },
    { id: 2, establishmentName: 'Estética Bella' }
  ];

  sentInvites: Invite[] = [
    { id: 3, establishmentName: 'Convite enviado para João' },
    { id: 4, establishmentName: 'Convite enviado para Maria' }
  ];

  cpfInput: string = '';

  constructor(private alertController: AlertController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  enviarConvite(): void {
    const cpf = this.cpfInput.trim();
    if (!cpf) return;

    this.presentAlert(`Convite enviado para CPF ${cpf}`);
    this.cpfInput = '';
  }

  async confirmarRemocaoProfissional(index: number) {
    const alert = await this.alertController.create({
      header: 'Remover Funcionário',
      message: 'Tem certeza que deseja remover este profissional?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.removerProfissional(index);
          }
        }
      ]
    });
    await alert.present();
  }

  removerProfissional(index: number): void {
    const prof = this.professionals[index];
    this.professionals.splice(index, 1);
    this.presentAlert(`${prof.name} foi removido do estabelecimento.`);
  }

  async confirmarCancelamentoConvite(index: number) {
    const alert = await this.alertController.create({
      header: 'Cancelar Convite',
      message: 'Deseja cancelar este convite?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim, cancelar',
          role: 'destructive',
          handler: () => {
            this.cancelarConvite(index);
          }
        }
      ]
    });
    await alert.present();
  }

  cancelarConvite(index: number): void {
    const convite = this.sentInvites[index];
    this.sentInvites.splice(index, 1);
    this.presentAlert(`Convite para "${convite.establishmentName}" cancelado.`);
  }

  aceitarConvite(id: number): void {
    const convite = this.pendingInvites.find(c => c.id === id);
    if (!convite) return;

    this.pendingInvites = this.pendingInvites.filter(c => c.id !== id);
    this.presentAlert(`Você aceitou o convite de ${convite.establishmentName}`);
  }

  recusarConvite(id: number): void {
    const convite = this.pendingInvites.find(c => c.id === id);
    if (!convite) return;

    this.pendingInvites = this.pendingInvites.filter(c => c.id !== id);
    this.presentAlert(`Você recusou o convite de ${convite.establishmentName}`);
  }
}