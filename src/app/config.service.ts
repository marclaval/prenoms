import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  gender: string;

  setGender(value: string) {
    this.gender = value;
  }

  getGender(): string {
    return this.gender;
  }

}
