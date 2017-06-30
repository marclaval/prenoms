import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfigService {
  gender: string;
  emitter: Subject<string> = new Subject<string>();

  setGender(value: string) {
    this.gender = value;
    this.emitter.next(value);
  }

  getGender(): string {
    return this.gender;
  }

  getChangeEmitter(): Subject<string> {
    return this.emitter;
  }

}
