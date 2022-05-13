import { Component, OnInit } from '@angular/core';
import { ApiService, Country } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  countries: any;
  // countries: Promise<Country[]>;

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.loadCountries();
  }

  logout() {
    this.auth.logout();
  }

  async loadCountries(){
    this.countries = this.api.getCountries();
  }
}
