import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { ProperName } from '@myrmidon/cadmus-refs-proper-name';
import { DialogService } from '@myrmidon/ng-mat-tools';

import {
  GRF_LOCALIZATION_PART_TYPEID,
  GrfLocalizationPart,
} from '../grf-localization-part';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';

/**
 * Grf localization part editor component.
 * Thesauri: grf-place-languages, grf-place-piece-types, grf-support-object-types,
 * grf-support-functions.
 */
@Component({
  selector: 'cadmus-grf-localization-part',
  templateUrl: './grf-localization-part.component.html',
  styleUrls: ['./grf-localization-part.component.css'],
})
export class GrfLocalizationPartComponent
  extends ModelEditorComponentBase<GrfLocalizationPart>
  implements OnInit
{
  public place: FormControl<ProperName | null>;
  public objectType: FormControl<string>;
  public function: FormControl<string>;
  public note: FormControl<string | null>;
  public indoor: FormControl<boolean>;

  public initialPlace?: ProperName;

  // grf-place-languages
  public plngEntries?: ThesaurusEntry[];
  // grf-place-piece-types
  public plptEntries?: ThesaurusEntry[];
  // grf-support-object-types
  public suppObjEntries?: ThesaurusEntry[];
  // grf-support-functions
  public suppFnEntries?: ThesaurusEntry[];

  constructor(
    authService: AuthJwtService,
    formBuilder: FormBuilder,
    private _dialog: DialogService
  ) {
    super(authService, formBuilder);
    // form
    this.place = formBuilder.control(null, Validators.required);
    this.objectType = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.function = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.note = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(5000)],
      nonNullable: true,
    });
    this.indoor = formBuilder.control(false, { nonNullable: true });
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      place: this.place,
      objectType: this.objectType,
      function: this.function,
      note: this.note,
      indoor: this.indoor,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-place-languages';
    if (this.hasThesaurus(key)) {
      this.plngEntries = thesauri[key].entries;
    } else {
      this.plngEntries = undefined;
    }
    key = 'grf-place-piece-types';
    if (this.hasThesaurus(key)) {
      this.plptEntries = thesauri[key].entries;
    } else {
      this.plptEntries = undefined;
    }
    key = 'grf-support-object-types';
    if (this.hasThesaurus(key)) {
      this.suppObjEntries = thesauri[key].entries;
    } else {
      this.suppObjEntries = undefined;
    }
    key = 'grf-support-functions';
    if (this.hasThesaurus(key)) {
      this.suppFnEntries = thesauri[key].entries;
    } else {
      this.suppFnEntries = undefined;
    }
  }

  private updateForm(part?: GrfLocalizationPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.initialPlace = part.place;
    this.objectType.setValue(part.objectType);
    this.function.setValue(part.function);
    this.note.setValue(part.note || null);
    this.indoor.setValue(part.indoor ? true : false);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfLocalizationPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfLocalizationPart {
    let part = this.getEditedPart(
      GRF_LOCALIZATION_PART_TYPEID
    ) as GrfLocalizationPart;
    part.place = this.place.value!;
    part.objectType = this.objectType.value.trim();
    part.function = this.function.value.trim();
    part.note = this.note.value?.trim();
    part.indoor = this.indoor.value;

    return part;
  }

  public onNameChange(name: ProperName | undefined): void {
    this.place.setValue(name || null);
    this.place.updateValueAndValidity();
    this.place.markAsDirty();
  }
}