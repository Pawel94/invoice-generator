import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatButtonModule, MatToolbarModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
