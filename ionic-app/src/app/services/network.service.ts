import { Injectable, NgZone } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public isOnline = new BehaviorSubject<boolean>(true);

  constructor(private ngZone: NgZone) {
    this.initializeNetworkEvents();
  }

  initializeNetworkEvents() {
    Network.getStatus().then(status => {
      this.ngZone.run(() => this.isOnline.next(status.connected));
    });

    Network.addListener('networkStatusChange', status => {
      this.ngZone.run(() => this.isOnline.next(status.connected));
    });
  }
  
  // Renombrado para evitar conflicto
  async getCurrentStatus(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connected;
  }
}
