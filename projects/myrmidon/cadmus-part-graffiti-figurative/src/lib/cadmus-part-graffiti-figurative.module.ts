import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { CadmusCoreModule } from '@myrmidon/cadmus-core';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { FlagsPickerComponent } from '@myrmidon/cadmus-ui-flags-picker';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { NgToolsModule } from '@myrmidon/ng-tools';

import { GrfFigurativePartComponent } from './grf-figurative-part/grf-figurative-part.component';
import { GrfFigurativePartFeatureComponent } from './grf-figurative-part-feature/grf-figurative-part-feature.component';

@NgModule({ declarations: [GrfFigurativePartComponent, GrfFigurativePartFeatureComponent],
    exports: [GrfFigurativePartComponent, GrfFigurativePartFeatureComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // material
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTooltipModule,
        // myrmex
        NgToolsModule,
        // bricks
        FlagsPickerComponent,
        // cadmus
        CadmusCoreModule,
        CadmusStateModule,
        CadmusUiModule,
        CadmusUiPgModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CadmusPartGraffitiFigurativeModule {}
