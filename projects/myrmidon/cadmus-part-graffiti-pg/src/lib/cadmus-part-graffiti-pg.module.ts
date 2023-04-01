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
  GRF_LOCALIZATION_PART_TYPEID,
  GrfLocalizationPartFeatureComponent,
} from '@myrmidon/cadmus-part-graffiti-localization';
import {
  GRF_SUPPORT_PART_TYPEID,
  GrfSupportPartFeatureComponent,
} from '@myrmidon/cadmus-part-graffiti-support';
import {
  GrfTechniquePartFeatureComponent,
  GRF_TECHNIQUE_PART_TYPEID,
} from '@myrmidon/cadmus-part-graffiti-technique';
import {
  GrfWritingPartFeatureComponent,
  GRF_WRITING_PART_TYPEID,
} from '@myrmidon/cadmus-part-graffiti-writing';
import {
  GrfFigurativePartFeatureComponent,
  GRF_FIGURATIVE_PART_TYPEID,
} from '@myrmidon/cadmus-part-graffiti-figurative';
import {
  GRF_FRAME_PART_TYPEID,
  GrfFramePartFeatureComponent,
} from '@myrmidon/cadmus-part-graffiti-frame';
import {
  GRF_STATES_PART_TYPEID,
  GrfStatesPartFeatureComponent,
} from '@myrmidon/cadmus-part-graffiti-states';

export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${GRF_LOCALIZATION_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfLocalizationPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_SUPPORT_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfSupportPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_FRAME_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfFramePartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_STATES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfStatesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_TECHNIQUE_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfTechniquePartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_WRITING_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfWritingPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${GRF_FIGURATIVE_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: GrfFigurativePartFeatureComponent,
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
