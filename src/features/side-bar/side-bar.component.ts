import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterModule} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatButtonModule, MatToolbarModule, RouterLink, RouterModule, TranslocoModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {

}
