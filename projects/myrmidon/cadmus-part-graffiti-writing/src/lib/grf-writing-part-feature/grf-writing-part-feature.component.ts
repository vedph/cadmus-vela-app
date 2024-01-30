import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditPartFeatureBase, PartEditorService } from '@myrmidon/cadmus-state';
import { ItemService, ThesaurusService } from '@myrmidon/cadmus-api';

@Component({
  selector: 'cadmus-grf-writing-part-feature',
  templateUrl: './grf-writing-part-feature.component.html',
  styleUrls: ['./grf-writing-part-feature.component.css'],
})
export class GrfWritingPartFeatureComponent
  extends EditPartFeatureBase
  implements OnInit
{
  constructor(
    router: Router,
    route: ActivatedRoute,
    snackbar: MatSnackBar,
    itemService: ItemService,
    thesaurusService: ThesaurusService,
    editorService: PartEditorService
  ) {
    super(
      router,
      route,
      snackbar,
      itemService,
      thesaurusService,
      editorService
    );
  }

  protected override getReqThesauriIds(): string[] {
    return [
      'grf-writing-systems',
      'grf-writing-languages',
      'grf-writing-glottologs',
      'grf-writing-scripts',
      'grf-writing-casing',
      'grf-writing-script-features',
      'grf-writing-letter-features',
      'grf-writing-count-ids',
      'grf-writing-count-tags',
      'grf-writing-metres',
    ];
  }
}
