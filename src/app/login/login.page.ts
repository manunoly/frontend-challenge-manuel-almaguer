import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.credentialsForm = this.fb.group({
      email: ['manuel@code.com', [Validators.email, Validators.required]],
      password: ['coding', [Validators.minLength(6), Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const respLogin = await this.auth.login(this.credentialsForm.value);
    loading.dismiss();
    if (respLogin) {
      this.router.navigateByUrl('/movies', { replaceUrl: true });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Please check your email and passowrd',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
