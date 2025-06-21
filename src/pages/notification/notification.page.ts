import { Component } from '@angular/core';
import { ActionSheetButton } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MOCK_ADS } from 'src/services/promotion.mock.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  activeFilter: 'all' | 'unread' = 'all';
  actionSheetOpen = false;
  activeAd = MOCK_ADS[0];
  
  notifications = [
    { 
      id: '1', 
      titulo: 'É a sua vez', 
      mensagem: 'Obrigado por se cadastrar no app.', 
      lida: false,
      tipo: 'system',
      data: new Date('2023-06-15T10:30:00')
    },
    { 
      id: '2', 
      titulo: 'Promoção especial', 
      mensagem: 'Hoje temos 10% de desconto para novos clientes.', 
      lida: false,
      tipo: 'promo',
      data: new Date('2023-06-14T15:45:00')
    },
    { 
      id: '3', 
      titulo: 'Agendamento confirmado', 
      mensagem: 'Seu horário foi confirmado para amanhã às 15h.', 
      lida: true,
      tipo: 'appointment',
      data: new Date('2023-06-13T09:20:00')
    }
  ];

  actionSheetButtons: ActionSheetButton[] = [
    {
      text: 'Marcar todas como lidas',
      icon: 'checkmark-done-outline',
      handler: () => this.markAllAsRead()
    },
    {
      text: 'Limpar notificações',
      icon: 'trash-outline',
      role: 'destructive',
      handler: () => this.clearNotifications()
    },
    {
      text: 'Cancelar',
      icon: 'close-outline',
      role: 'cancel'
    }
  ];

  constructor(private navCtrl: NavController) {}

  get filteredNotifications() {
    return this.notifications
      .filter(noti => this.activeFilter === 'all' || !noti.lida)
      .sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  getNotificationIcon(type: string): string {
    const icons: Record<string, string> = {
      'system': 'notifications-outline',
      'promo': 'pricetag-outline',
      'appointment': 'calendar-outline',
      'default': 'notifications-outline'
    };
    return icons[type] || icons['default'];
  }

  toggleNotification(notification: any) {
    notification.lida = !notification.lida;
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(noti => noti.id !== id);
  }

  markAllAsRead() {
    this.notifications.forEach(noti => noti.lida = true);
  }

  clearNotifications() {
    this.notifications = [];
  }

  filterChanged(event: any) {
    this.activeFilter = event.detail.value;
  }

  openNotificationMenu() {
    this.actionSheetOpen = true;
  }

  async handleRefresh(event: any) {
    try {
    //  await this.loadOrders();
    } finally {
      event.target.complete();
    }
  }

  back() {
    this.navCtrl.back();
  }
}