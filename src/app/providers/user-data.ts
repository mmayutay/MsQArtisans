import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Alerts } from './alerts';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  url = 'http://localhost:8000/api/';
  loadingTrigger = false;

  constructor(
    public storage: Storage,
    public http: HttpClient,
    public alerts: Alerts,
    public router: Router,
    public loadingController: LoadingController
  ) { }

  hasFavorite(session: any) {
    if (!this.favorites.includes(session.name)) {
      this.favorites.push(session)
      return true;
    } else {
      return false;
    }
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(userData: any) {
    this.loadingTrigger = true
    const login = this.http.post(this.url + 'login', userData)
    login.subscribe((response: any) => {
      if (response === null) {
        this.alerts.presentToast()
      } else {
        if (response.length == 0) {
          this.alerts.presentToast()
        } else {
          this.storage.set(this.HAS_LOGGED_IN, response)
          this.router.navigate(['/app/tabs/schedule'])
        }
      }
      this.loadingTrigger = false
    })
  }

  signup(username): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
