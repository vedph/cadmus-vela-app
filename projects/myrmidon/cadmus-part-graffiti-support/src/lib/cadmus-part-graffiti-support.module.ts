import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PhysicalSizeComponent } from '@myrmidon/cadmus-mat-physical-size';
import { DecoratedCountsComponent } from '@myrmidon/cadmus-refs-decorated-counts';
import { HistoricalDateComponent } from '@myrmidon/cadmus-refs-historical-date';
import { ProperNameComponent } from '@myrmidon/cadmus-refs-proper-name';
import { FlagsPickerComponent } from '@myrmidon/cadmus-ui-flags-picker';
import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { NgToolsModule } from '@myrmidon/ng-tools';

import { GrfSupportPartComponent } from './grf-support-part/grf-support-part.component';
import { GrfSupportPartFeatureComponent } from './grf-support-part-feature/grf-support-part-feature.component';

@NgModule({ declarations: [GrfSupportPartComponent, GrfSupportPartFeatureComponent],
    exports: [GrfSupportPartComponent, GrfSupportPartFeatureComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // material
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        // myrmex
        NgToolsModule,
        // cadmus
        HistoricalDateComponent,
        ProperNameComponent,
        FlagsPickerComponent,
        PhysicalSizeComponent,
        DecoratedCountsComponent,
        CadmusCoreModule,
        CadmusStateModule,
        CadmusUiModule,
        CadmusUiPgModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CadmusPartGraffitiSupportModule {}
