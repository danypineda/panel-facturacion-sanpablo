import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatSelectModule, MatTableModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatButtonModule,
        MatGridListModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        // AngularFontAwesomeModule,
        ReactiveFormsModule,
        NgMaterialMultilevelMenuModule,
        MatStepperModule,
        MatSelectModule,
        MatTableModule,
        MatChipsModule,
        MatSlideToggleModule,
        FormsModule,
        // NgBreadcrumbModule,
    ],
    declarations: [AdminComponent, DashboardComponent, MenuLateralComponent]
})
export class AdminModule { }
