import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ConfigService } from './config.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  model = 'b';
  activeTab = 'year';
  private subscription: Subscription;

  constructor(private config: ConfigService, private router: Router) {
    this.config.setGender(this.model);
  }

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.activeTab = event.urlAfterRedirects.split('/')[1];
      }
    });
  }

  onGenderChange(value: string) {
    this.model = value;
    this.config.setGender(value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
