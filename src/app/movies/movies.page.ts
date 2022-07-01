import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieModel, MovieResponse } from '../movie-details/movie.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  movies: Observable<MovieResponse>;
  movie: MovieModel;

  constructor(
    private api: ApiService,
    private modalCtrl: ModalController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(lang: string = 'en') {
    this.movies = this.api.getMovies(lang);
  }

  openMovie(movie) {
    this.movie = movie;
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MovieDetailsComponent,
      componentProps: { movie: this.movie },
    });
    modal.present();
  }

  getColor(rating: number) {
    if (rating % 2 !== 0) {
      return 'odd';
    }
  }

  logout() {
    this.auth.logout();
  }
}
