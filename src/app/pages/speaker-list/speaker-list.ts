import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { allRoutes } from '../../../environments/environment';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];
  segment = 'OnGoing'

  constructor(
    public confData: ConferenceData,
    public http: HttpClient
  ) { }

  ionViewDidEnter() {
    this.updateSchedule(this.segment)
  }

  updateSchedule(params) {
    this.http.get(allRoutes.getJobOrderToTracker + this.confData.dataToPush.artisan_id + '/' + params).subscribe((response: any) => {
      if (response.length != 0) {
        response.forEach(element => {
          this.http.get(allRoutes.getSelectedJobOrder + this.confData.dataToPush.job_order).subscribe((res: any) => {
            element.job_orders_id = res[0]
            this.http.get(allRoutes.getCustomersData + res[0].client_id).subscribe((result: any) => {
              element.job_orders_id.client_id = result
            })
          })
        })
      }
      this.speakers = response
    })
  }

  capitalizeFirstLetter(string) {
    if (string != undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
