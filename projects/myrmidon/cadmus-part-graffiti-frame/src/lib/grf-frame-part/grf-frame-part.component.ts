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

import { GrfFramePart, GRF_FRAME_PART_TYPEID } from '../grf-frame-part';
import { PhysicalSize } from '@myrmidon/cadmus-mat-physical-size';

/**
 * GrfFrame part editor component.
 * Thesauri: physical-size-tags, physical-size-units, physical-size-dim-tags.
 */
@Component({
    selector: 'cadmus-grf-frame-part',
    templateUrl: './grf-frame-part.component.html',
    styleUrls: ['./grf-frame-part.component.css'],
    standalone: false
})
export class GrfFramePartComponent
  extends ModelEditorComponentBase<GrfFramePart>
  implements OnInit
{
  public size: FormControl<PhysicalSize | null>;
  public frame: FormControl<string | null>;
  public figure: FormControl<string | null>;

  // physical-size-tags
  public szTagEntries?: ThesaurusEntry[];
  // physical-size-units
  public szUnitEntries?: ThesaurusEntry[];
  // physical-size-dim-tags
  public szDimTagEntries?: ThesaurusEntry[];

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.size = formBuilder.control(null, {
      validators: Validators.required,
      nonNullable: true,
    });
    this.frame = formBuilder.control(null, Validators.maxLength(5000));
    this.figure = formBuilder.control(null, Validators.maxLength(5000));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      size: this.size,
      frame: this.frame,
      figure: this.figure,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'physical-size-tags';
    if (this.hasThesaurus(key)) {
      this.szTagEntries = thesauri[key].entries;
    } else {
      this.szTagEntries = undefined;
    }
    key = 'physical-size-units';
    if (this.hasThesaurus(key)) {
      this.szUnitEntries = thesauri[key].entries;
    } else {
      this.szUnitEntries = undefined;
    }
    key = 'physical-size-dim-tags';
    if (this.hasThesaurus(key)) {
      this.szDimTagEntries = thesauri[key].entries;
    } else {
      this.szDimTagEntries = undefined;
    }
  }

  private updateForm(part?: GrfFramePart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.size.setValue(part.size);
    this.frame.setValue(part.frame || null);
    this.figure.setValue(part.figure || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfFramePart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfFramePart {
    let part = this.getEditedPart(GRF_FRAME_PART_TYPEID) as GrfFramePart;
    part.size = this.size.value!;
    part.frame = this.frame.value || undefined;
    part.figure = this.figure.value || undefined;
    return part;
  }

  public onSizeChange(size: PhysicalSize): void {
    this.size.setValue(size);
    this.size.updateValueAndValidity();
    this.size.markAsDirty();
  }
}
