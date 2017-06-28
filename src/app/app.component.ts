import { Component } from '@angular/core';

import { DataService } from './data.service';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  model: string = 'b';

  constructor(private dataService: DataService, private config: ConfigService) {
    this.config.setGender(this.model);
  }

  onGenderChange(value: string) {
    this.model = value;
    this.config.setGender(value);
  }
}
