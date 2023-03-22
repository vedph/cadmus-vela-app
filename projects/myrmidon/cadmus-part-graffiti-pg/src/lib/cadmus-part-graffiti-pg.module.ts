import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// cadmus
import { CadmusCoreModule, PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusStateModule } from '@myrmidon/cadmus-state';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import {
  GrfSummaryPartFeatureComponent,
  GRF_SUMMARY_PART_TYPEID,
} from '@myrmidon/cadmus-part-graffiti-summary';
import {
  GrfTechniquePartFeatureComponent,
  GRF_TECHNIQUE_PART_TYPEID,
} from '@myrmidon/cadmus-part-graffiti-technique';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${GRF_SUMMARY_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfSummaryPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_TECHNIQUE_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfTechniquePartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    RouterModuleForChild,
    CadmusCoreModule,
    CadmusStateModule,
    CadmusUiModule,
    CadmusUiPgModule,
  ],
  exports: [],
})
export class CadmusPartGraffitiPgModule {}
