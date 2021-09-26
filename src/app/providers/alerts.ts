import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class Alerts {
    constructor(public toastController: ToastController) { }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Username or Password is INCORRECT.',
            duration: 2000
        });
        toast.present();
    }
}