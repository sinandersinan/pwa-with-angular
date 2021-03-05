import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SwPush} from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BGk2Rx3DEjXdRv9qP8aKrypFoNjISAZ54l-3V05xpPOV-5ZQJvVH9OB9Rz5Ug7H_qH6CEr40f4Pi3DpjzYLbfCA';
  readonly VAPID_PRIVAT_KEY = 'D-k70ba0x5ucasrJMfsROWq8Xtt2smbzh98mbXTfhQM';
  private baseUrl = 'https://api4.angular-buch.com/notifications';

  constructor(private http: HttpClient, private swPush: SwPush) {
  }

  get isEnabled(): boolean {
    return this.swPush.isEnabled;
  }

  subscribeToNotifications(): Promise<any> {
    return this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.sendToServer(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  private sendToServer(params: PushSubscriptionJSON): void {
    this.http.post(this.baseUrl, params).subscribe();
  }
}
