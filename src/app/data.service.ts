import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

export interface NameData {
  name: string,
  gender: string,
  years?: number[],
  times?: number
}

@Injectable()
export class DataService {
  private data = null;

  constructor(private configService: ConfigService) {}

  private getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.data) {
        fetch('assets/data.json').then((response) => {
          return response.json();
        }).then((data) => {
          this.data = data;
          window['prenoms'] = data;
          resolve(this.data);
        }).catch(error => reject(error));
      } else {
        resolve(this.data);
      }
    });
  }

  getByYears(begin: number, end: number): Promise<NameData[]> {
    return new Promise((resolve, reject) => {
      this.getData().then((data) => {
        const result: NameData[] = [];
        const gender = this.configService.getGender();
        const keys: string[] = Object.keys(data.names);
        const beginIndex = begin ? begin - data.beginYear : 0;
        const endIndex = end ? end - data.beginYear : (keys.length - 1);
        keys.forEach((key: string) => {
          const element: NameData = data.names[key];
          if (gender === 'b' || gender === element.gender) {
            let times = 0;
            for (let i = beginIndex; i <= endIndex; i++) {
              times += element.years[i];
            }
            result.push({name: element.name, gender: element.gender, times: times});
          }
        });
        result.sort((a, b) => {
          if (b.times - a.times !== 0) {
            return b.times - a.times;
          } else {
            return b.name > a.name ? -1 : 1;
          }
        });
        resolve(result);
      }).catch(error => reject(error));
    });
  }

  getByName(name: string): Promise<NameData[]> {
    return new Promise((resolve, reject) => {
      this.getData().then((data) => {
      const result: NameData[] = [];
      const gender = this.configService.getGender();
      if (gender === 'b' || gender === 'm') {
        const keyM = name.toUpperCase() + '_1';
        if (data.names.hasOwnProperty(keyM)) {
          result.push(data.names[keyM]);
        }
      }
      if (gender === 'b' || gender === 'f') {
        const keyF = name.toUpperCase() + '_2';
        if (data.names.hasOwnProperty(keyF)) {
          result.push(data.names[keyF]);
        }
      }
      resolve(result);
      }).catch(error => reject(error));
    });
  }

  getBoundaries(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getData().then((data) => {
        resolve({
          begin: data.beginYear,
          end: data.endYear
        });
      }).catch(error => reject(error));
    });
  }

  getStats(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.getData().then((data) => {
        const gender = this.configService.getGender();
        if (gender === 'b') {
          resolve(data.stats);
        } else if (gender === 'm') {
          resolve(data.statsM);
        } else {
          resolve(data.statsF);
        }
      }).catch(error => reject(error));
    });
  }
}
