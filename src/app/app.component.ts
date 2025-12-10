import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AgvDashboardComponent } from './components/agv-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AgvDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agv-ui';
}
