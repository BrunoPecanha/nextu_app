import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetButton } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/models/user-model';
import { NotificationService } from 'src/services/notification.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit, OnDestroy {
  activeFilter: 'all' | 'unread' = 'all';
  actionSheetOpen = false;

  notifications: any[] = [];
  notificacoesNaoLidas = 0;
  user!: UserModel;


  private subscriptions: Subscription[] = [];

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

  constructor(
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private sessionService: SessionService
  ) {
    this.user = this.sessionService.getUser();
    if (!this.user) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit() {
    this.loadNotifications();

    const subCount = this.notificationService.notificacoesNaoLidas$.subscribe(count => {
      this.notificacoesNaoLidas = count;
    });
    this.subscriptions.push(subCount);

    this.notificationService.signalRService.onReceiveNotification((notification: any) => {
      this.notifications.unshift({
        ...notification,
        lida: false,
        data: new Date(notification.data || Date.now()),
      });
      this.notificationService.atualizarContadorNaoLidas();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  async loadNotifications() {
    this.notificationService.getUserNotifications(this.user.id).subscribe(notifs => {
      this.notifications = notifs.map(n => ({
        ...n,
        data: new Date(Date.now()),
      }));
      this.notificationService.atualizarContadorNaoLidas();
    });
  }

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
    if (!notification.lida) {

      this.notificationService.markAsRead(+notification.id).subscribe(() => {
        notification.lida = true;
        this.notificationService.atualizarContadorNaoLidas();
      });
    } else {
      notification.lida = false;
      this.notificationService.atualizarContadorNaoLidas();
    }
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(noti => noti.id !== id);
    this.notificationService.atualizarContadorNaoLidas();
  }

  markAllAsRead() {
    this.notifications.forEach(noti => noti.lida = true);
    this.notificationService.atualizarContadorNaoLidas();
  }

  clearNotifications() {
    this.notifications = [];
    this.notificationService.atualizarContadorNaoLidas();
  }

  filterChanged(event: any) {
    this.activeFilter = event.detail.value;
  }

  openNotificationMenu() {
    this.actionSheetOpen = true;
  }

  async handleRefresh(event: any) {
    try {
      await this.loadNotifications();
    } finally {
      event.target.complete();
    }
  }

  back() {
    this.navCtrl.back();
  }
}
