import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';

import { GRF_SUPPORT_PART_TYPEID, GrfSupportPart } from '../grf-support-part';

/**
 * GrfSupport part editor component.
 * Thesauri: grf-support-types, grf-support-materials.
 */
@Component({
  selector: 'cadmus-grf-support-part',
  templateUrl: './grf-support-part.component.html',
  styleUrls: ['./grf-support-part.component.css'],
})
export class GrfSupportPartComponent
  extends ModelEditorComponentBase<GrfSupportPart>
  implements OnInit
{
  public type: FormControl<string>;
  public material: FormControl<string>;
  public note: FormControl<string | null>;

  // grf-support-types
  public suppTypeEntries?: ThesaurusEntry[];
  // grf-support-materials
  public suppMatEntries?: ThesaurusEntry[];

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.type = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.material = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.note = formBuilder.control(null, Validators.maxLength(5000));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      type: this.type,
      material: this.material,
      note: this.note,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-support-types';
    if (this.hasThesaurus(key)) {
      this.suppTypeEntries = thesauri[key].entries;
    } else {
      this.suppTypeEntries = undefined;
    }
    key = 'grf-support-materials';
    if (this.hasThesaurus(key)) {
      this.suppMatEntries = thesauri[key].entries;
    } else {
      this.suppMatEntries = undefined;
    }
  }

  private updateForm(part?: GrfSupportPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.type.setValue(part.type);
    this.material.setValue(part.material);
    this.note.setValue(part.note || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfSupportPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfSupportPart {
    let part = this.getEditedPart(GRF_SUPPORT_PART_TYPEID) as GrfSupportPart;
    part.type = this.type.value;
    part.material = this.material.value;
    part.note = this.note.value?.trim() || undefined;
    return part;
  }
}
