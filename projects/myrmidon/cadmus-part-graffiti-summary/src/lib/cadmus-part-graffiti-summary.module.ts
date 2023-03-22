import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusMatPhysicalSizeModule } from '@myrmidon/cadmus-mat-physical-size';
import { CadmusRefsDecoratedCountsModule } from '@myrmidon/cadmus-refs-decorated-counts';
import { CadmusRefsHistoricalDateModule } from '@myrmidon/cadmus-refs-historical-date';
import { CadmusRefsProperNameModule } from '@myrmidon/cadmus-refs-proper-name';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiFlagsPickerModule } from '@myrmidon/cadmus-ui-flags-picker';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';

import { GrfSupportStateComponent } from './grf-support-state/grf-support-state.component';
import { GrfSummaryPartComponent } from './grf-summary-part/grf-summary-part.component';

@NgModule({
  declarations: [GrfSummaryPartComponent, GrfSupportStateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
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
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    // cadmus
    CadmusCoreModule,
    CadmusStateModule,
    CadmusRefsHistoricalDateModule,
    CadmusRefsProperNameModule,
    CadmusUiModule,
    CadmusUiFlagsPickerModule,
    CadmusMatPhysicalSizeModule,
    CadmusRefsDecoratedCountsModule,
    CadmusUiPgModule,
  ],
  exports: [GrfSummaryPartComponent, GrfSupportStateComponent],
})
export class CadmusPartGraffitiSummaryModule {}
