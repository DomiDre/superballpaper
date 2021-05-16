import { Component } from '@angular/core';
import { FittingService } from '@shared/services/fitting.service';
import { models } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    public fittingService: FittingService) { }

    ngOnInit() {
      // on creation of component init linspace formgroup with default values
      this.fittingService.initLinspaceGroups(0.01, 0.5, 100);
  
      // set models in fittingService to the module function models
      this.fittingService.models = models;
    }
}
