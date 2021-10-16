import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { HttpClient } from '@angular/common/http';
import { allRoutes } from '../../../environments/environment';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ionViewWillEnter() {
    let id = this.route.snapshot.paramMap.get("sessionId");
    this.http.get(allRoutes.getSelectedJobOrder + id).subscribe((response: any) => {
      this.http.get(allRoutes.getCustomersData + response[0].client_id).subscribe((res: any) => {
        response[0].client_id = res
      })
      this.session = response[0]
      console.log(this.session)
    })
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    // if (this.userProvider.hasFavorite(this.session.name)) {
    //   this.userProvider.removeFavorite(this.session.name);
    //   this.isFavorite = false;
    // } else {
    //   this.userProvider.addFavorite(this.session.name);
    //   this.isFavorite = true;
    // }
  }

  shareSession() {
    console.log('Clicked share session');
  }

  capitalizeFirstLetter(string) {
    if (string != undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  addJobOrderToTracker() {
    this.http.post(allRoutes.addJobOrderToTracker, this.dataProvider.dataToPush).subscribe((response: any) => {
      if (response) {
        this.router.navigate(['/app/tabs/schedule'])
      }
    })
  }
}
