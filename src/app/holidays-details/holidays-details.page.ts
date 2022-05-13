import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Holiday } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-holidays-details',
  templateUrl: './holidays-details.page.html',
  styleUrls: ['./holidays-details.page.scss'],
})
export class HolidaysDetailsPage implements OnInit {
  countryHollidays: Promise<Holiday[]>;

  constructor(
    private auth: AuthService,
    private _location: Location,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let countryCode = this.activatedRoute.snapshot.params.code;
    if (!countryCode) {
      return this._location.back();
    }
    this.countryHollidays = this.api.getCountryhollidays(countryCode, 2022);
  }

  logout() {
    this.auth.logout();
  }
}
