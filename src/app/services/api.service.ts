import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MovieResponse } from '../movie-details/movie.model';

export interface Country {
  code: string;
  name: string;
}

export interface Holiday {
  date: string;
  name: string;
  local_name: string;
  country_code: string;
  regions: string[];
  types: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  currentAccessToken = environment.token;
  url = environment.api;

  countries: Country[] = [
    {
      code: 'GB',
      name: 'United Kingdom',
    },
    {
      code: 'HU',
      name: 'Hungary',
    },
    {
      code: 'IT',
      name: 'Italy',
    },
    {
      code: 'JP',
      name: 'Japan',
    },
    {
      code: 'KR',
      name: 'South Korea',
    },
    {
      code: 'MX',
      name: 'Mexico',
    },
    {
      code: 'SG',
      name: 'Singapore',
    },
    {
      code: 'US',
      name: 'United States',
    },
    {
      code: 'ZA',
      name: 'South Africa',
    },
  ];

  holidays: Holiday[] = [
    {
      date: '2022-01-01',
      name: "New Year's Day",
      local_name: "New Year's Day",
      country_code: 'GB',
      regions: ['GB-NIR'],
      types: ['Public'],
    },
    {
      date: '2022-01-03',
      name: "New Year's Day",
      local_name: "New Year's Day",
      country_code: 'GB',
      regions: ['GB-ENG', 'GB-WLS'],
      types: ['Public'],
    },
    {
      date: '2022-01-03',
      name: "New Year's Day",
      local_name: "New Year's Day",
      country_code: 'GB',
      regions: ['GB-SCT'],
      types: ['Public'],
    },
    {
      date: '2022-01-04',
      name: "New Year's Day",
      local_name: "New Year's Day",
      country_code: 'GB',
      regions: ['GB-SCT'],
      types: ['Public'],
    },
    {
      date: '2022-03-17',
      name: "Saint Patrick's Day",
      local_name: "Saint Patrick's Day",
      country_code: 'GB',
      regions: ['GB-NIR'],
      types: ['Public'],
    },
    {
      date: '2022-04-15',
      name: 'Good Friday',
      local_name: 'Good Friday',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
    {
      date: '2022-04-18',
      name: 'Easter Monday',
      local_name: 'Easter Monday',
      country_code: 'GB',
      regions: ['GB-ENG', 'GB-WLS', 'GB-NIR'],
      types: ['Public'],
    },
    {
      date: '2022-05-02',
      name: 'Early May Bank Holiday',
      local_name: 'Early May Bank Holiday',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
    {
      date: '2022-06-02',
      name: 'Spring Bank Holiday',
      local_name: 'Spring Bank Holiday',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
    {
      date: '2022-06-03',
      name: 'Queen’s Platinum Jubilee',
      local_name: 'Queen’s Platinum Jubilee',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
    {
      date: '2022-07-12',
      name: 'Battle of the Boyne',
      local_name: 'Battle of the Boyne',
      country_code: 'GB',
      regions: ['GB-NIR'],
      types: ['Public'],
    },
    {
      date: '2022-08-01',
      name: 'Summer Bank Holiday',
      local_name: 'Summer Bank Holiday',
      country_code: 'GB',
      regions: ['GB-SCT'],
      types: ['Public'],
    },
    {
      date: '2022-08-29',
      name: 'Summer Bank Holiday',
      local_name: 'Summer Bank Holiday',
      country_code: 'GB',
      regions: ['GB-ENG', 'GB-WLS', 'GB-NIR'],
      types: ['Public'],
    },
    {
      date: '2022-11-30',
      name: "Saint Andrew's Day",
      local_name: "Saint Andrew's Day",
      country_code: 'GB',
      regions: ['GB-SCT'],
      types: ['Public'],
    },
    {
      date: '2022-12-26',
      name: "St. Stephen's Day",
      local_name: 'Boxing Day',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
    {
      date: '2022-12-27',
      name: 'Christmas Day',
      local_name: 'Christmas Day',
      country_code: 'GB',
      regions: [],
      types: ['Public'],
    },
  ];

  constructor(private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

  // TODO:Use Angular interceptor to add token will be better
  getHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.currentAccessToken}`,
        Accept: 'application/json',
      }),
    };
  }

  getCountries(): Promise<Country[]> {
    // I have problems with mi Credict card, I can't use https://m3o.com/
    // return this.http
    //   .post(`${this.url}/holidays/Countries`, {}, this.getHeader())
    //   .toPromise() as any;
    return new Promise((resolve, reject) => {
      resolve(this.countries);
    });
  }

  getCountryhollidays(
    countryCode: string = 'GB',
    year: number = 2022
  ): Promise<Holiday[]> {
    // I have problems with mi Credict card, I can't use https://m3o.com/
    //
    // return this.http
    //   .post(
    //     `${this.url}/holidays/List`,
    //     { country_code: countryCode, year: year },
    //     this.getHeader()
    //   )
    //   .toPromise() as any;
    return new Promise((resolve, reject) => {
      const hollidays: Holiday[] = this.holidays.filter(
        (holiday) =>
          holiday.country_code.toLocaleLowerCase() ==
          countryCode.toLocaleLowerCase()
      );
      resolve(hollidays);
    });
  }

  /**
   * Get movies by language
   * @param apiKey
   * @param language
   * @returns
   * TODO: improve can be implement handle observable error for async pipe
   * https://eliteionic.com/tutorials/handle-errors-reactively-when-using-async-pipe/
   */
  getMovies(language: string = environment.lang): Observable<MovieResponse> {
    const path = `${this.url}/movie/popular?language=${language}&api_key=${environment.apiKey}`;
    return this.http.get<MovieResponse>(path);
  }
}
