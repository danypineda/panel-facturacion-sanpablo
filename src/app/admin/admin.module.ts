import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatButtonModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: [AdminComponent, DashboardComponent, PanelPrincipalComponent]
})
export class AdminModule { }
