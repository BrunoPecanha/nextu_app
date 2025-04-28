import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/services/components/notification-service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
})
export class FooterMenuComponent implements OnInit {
  notificationsCount: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {    
    this.notificationService.fetchNotifications();

    // Assine o Observable para receber atualizações
    this.notificationService.notificationsCount$.subscribe(count => {
      this.notificationsCount = count;
    });
  }
}
