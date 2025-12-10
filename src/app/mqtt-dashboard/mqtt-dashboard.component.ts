import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgvSocketService, AgvMessage } from '../services/agv-socket.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mqtt-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mqtt-dashboard.component.html',
    styleUrls: ['./mqtt-dashboard.component.css']
})
export class MqttDashboardComponent implements OnInit, OnDestroy {
  agvs: Record<string, AgvMessage> = {};
  private sub?: Subscription;

  constructor(private agvService: AgvSocketService) {}

  ngOnInit() {
    this.sub = this.agvService.onAgvStatus().subscribe((msg) => {
      this.agvs[msg.serial] = msg; 
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
