// src/app/agv-dashboard/agv-dashboard.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { AgvSocketService, AgvMessage } from "../services/agv-socket.service";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-agv-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./agv-dashboard.component.html",
  styleUrls: ["./agv-dashboard.component.css"]
})
export class AgvDashboardComponent implements OnInit, OnDestroy {
  agvs: Record<string, any> = {};
  sub!: Subscription;

  constructor(private agvSocket: AgvSocketService) {}

  ngOnInit() {
    this.sub = this.agvSocket.onAgvStatus().subscribe((msg: AgvMessage) => {
      this.agvs[msg.serial] = { ...this.agvs[msg.serial], ...msg.payload };
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  serials() {
    return Object.keys(this.agvs).sort();
  }
objectKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

isObject(val: any): boolean {
  return val && typeof val === 'object' && !Array.isArray(val);
}

isArray(val: any): boolean {
  return Array.isArray(val);
}
showDetails: { [sn: string]: boolean } = {};

toggleDetails(sn: string) {
  this.showDetails[sn] = !this.showDetails[sn];
}


}
