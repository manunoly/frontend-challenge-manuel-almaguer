import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * Initialize store
   */
  private async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Get store data by key
   * @param key
   * @returns
   */
  public async get(key: string) {
    return await this._storage.get(key);
  }

  /**
   * Set storage data
   * @param key
   * @param value
   * @returns
   */
  public async set(key: string, value: any) {
    return await this._storage?.set(key, value);
  }

  /**
   * Remove storage data by key
   * @param key
   * @returns
   */
  public async remove(key: string) {
    return await this._storage.remove(key);
  }
}
