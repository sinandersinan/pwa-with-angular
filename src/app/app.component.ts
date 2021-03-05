import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {WebNotificationService} from './web-notification.service';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  permission: NotificationPermission | null = null;

  constructor(private swUpdate: SwUpdate, private notificationService: WebNotificationService) {
  }

  ngOnInit(): void {
    this.permission = this.notificationService.isEnabled ? Notification.permission : null;
  }

  submitNotification(): void {
    this.notificationService.subscribeToNotifications()
      .then(() => this.permission = Notification.permission);
  }
}
