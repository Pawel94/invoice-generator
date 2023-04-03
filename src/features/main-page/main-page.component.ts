import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";

import {SideBarComponent} from "../side-bar/side-bar.component";
import {NewInvoiceComponent} from "../new-invoice/new-invoice.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {BreakpointObserver} from "@angular/cdk/layout";
import {RouterOutlet} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";

const sideBarProp = '(max-width: 800px)'

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    SideBarComponent,
    NewInvoiceComponent,
    RouterOutlet,
    TranslocoModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements AfterViewInit {
  private readonly observer = inject(BreakpointObserver);
  private readonly cdRef = inject(ChangeDetectorRef);
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;


  ngAfterViewInit(): void {
    this.observer.observe([sideBarProp]).subscribe((res) => {
      if (res.matches && this.sidenav) {
        this.sidenav.mode = 'over'
        this.sidenav.close()
      } else if (this.sidenav) {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdRef.detectChanges();
  }


}
