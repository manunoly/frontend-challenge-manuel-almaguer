import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  router: Router;
  storage: StorageService;
  util: UtilService;

  constructor(storage: StorageService, util: UtilService, router: Router) {
    this.router = router;
    this.storage = storage;
    this.util = util;
    setTimeout(() => {
      //wait until storage service is ready
      this.checkLogin();
    }, 1000);
  }

  /**
   * Check if user is already login
   */
  async checkLogin() {
    const token = await this.storage.get('token');
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
      this.router.navigateByUrl('/countries', { replaceUrl: true });
    } else {
      this.isAuthenticated.next(false);
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  /**
   * Simulate Login
   * @param email
   * @param password
   * @returns
   */
  async login({ email, password }): Promise<Boolean> {
    try {
      let r = (Math.random() + 1).toString(36).substring(7);
      await this.storage.set('token', r);
      await this.util.sleep();
      this.isAuthenticated.next(true);
      return true;
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts ~ line 48 ~ AuthService ~ login ~ error',
        error
      );
      return false;
    }
  }

  async logout(): Promise<void> {
    this.isAuthenticated.next(false);
    setTimeout(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }, 100);
    return await this.storage.remove('token');
  }
}
