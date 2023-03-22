import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { PhysicalSize } from '@myrmidon/cadmus-mat-physical-size';
import { HistoricalDateModel } from '@myrmidon/cadmus-refs-historical-date';
import { ProperName } from '@myrmidon/cadmus-refs-proper-name';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';
import { NgToolsValidators } from '@myrmidon/ng-tools';

import { GrfSummaryPart, GRF_SUMMARY_PART_TYPEID } from '../grf-summary-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * GrfSummary part editor component.
 * Thesauri: grf-place-languages, grf-place-piece-types, grf-support-types,
 * grf-support-object-types, grf-support-functions, grf-support-materials,
 * physical-size-tags, physical-size-units, physical-size-dim-tags,
 * grf-features, grf-support-states.
 */
@Component({
  selector: 'cadmus-grf-summary-part',
  templateUrl: './grf-summary-part.component.html',
  styleUrls: ['./grf-summary-part.component.css'],
})
export class GrfSummaryPartComponent
  extends ModelEditorComponentBase<GrfSummaryPart>
  implements OnInit
{
  private readonly _flagAdapter: FlagsPickerAdapter;
  private _featEntries?: ThesaurusEntry[];

  // flags
  public featFlags$: Observable<Flag[]>;

  public place: FormControl<ProperName | null>;
  public supportType: FormControl<string>;
  public objectType: FormControl<string | null>;
  public hasOriginalFn: FormControl<boolean>;
  public originalFn: FormControl<string | null>;
  public currentFn: FormControl<string>;
  public indoor: FormControl<boolean>;
  public material: FormControl<string>;
  public description: FormControl<string>;
  public size: FormControl<PhysicalSize | null>;
  public date: FormControl<HistoricalDateModel | null>;
  public features: FormControl<Flag[]>;
  public figDescription: FormControl<string | null>;
  public frameDescription: FormControl<string | null>;
  public lastSeen: FormControl<string>;

  // grf-place-languages
  public plngEntries?: ThesaurusEntry[];
  // grf-place-piece-types
  public plptEntries?: ThesaurusEntry[];
  // grf-support-types
  public suptEntries?: ThesaurusEntry[];
  // grf-support-object-types
  public supoEntries?: ThesaurusEntry[];
  // grf-support-functions
  public supfEntries?: ThesaurusEntry[];
  // grf-support-materials
  public supmEntries?: ThesaurusEntry[];
  // physical-size-tags
  public szTagEntries?: ThesaurusEntry[];
  // physical-size-units
  public szUnitEntries?: ThesaurusEntry[];
  // physical-size-dim-tags
  public szDimEntries?: ThesaurusEntry[];
  // grf-features
  public get featEntries(): ThesaurusEntry[] | undefined {
    return this._featEntries;
  }
  public set featEntries(value: ThesaurusEntry[] | undefined) {
    if (this._featEntries === value) {
      return;
    }
    this._featEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'features',
      this._featEntries.map(entryToFlag)
    );
  }
  // grf-support-states
  public stateEntries?: ThesaurusEntry[];

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.place = formBuilder.control(null, Validators.required);
    this.supportType = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.objectType = formBuilder.control('', Validators.maxLength(100));
    this.hasOriginalFn = formBuilder.control(false, { nonNullable: true });
    this.originalFn = formBuilder.control(null, Validators.maxLength(100));
    this.currentFn = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.indoor = formBuilder.control(false, { nonNullable: true });
    this.material = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.description = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(5000)],
      nonNullable: true,
    });
    this.size = formBuilder.control(null, {
      validators: Validators.required,
      nonNullable: true,
    });
    this.date = formBuilder.control(null, {
      validators: Validators.required,
      nonNullable: true,
    });
    this.features = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.figDescription = formBuilder.control(null, Validators.maxLength(5000));
    this.frameDescription = formBuilder.control(
      null,
      Validators.maxLength(5000)
    );
    this.lastSeen = formBuilder.control(new Date().toUTCString(), {
      validators: Validators.required,
      nonNullable: true,
    });
    // flags
    this._flagAdapter = new FlagsPickerAdapter();
    this.featFlags$ = this._flagAdapter.selectFlags('features');
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      place: this.place,
      supportType: this.supportType,
      objectType: this.objectType,
      hasOriginalFn: this.hasOriginalFn,
      originalFn: this.originalFn,
      currentFn: this.currentFn,
      indoor: this.indoor,
      material: this.material,
      description: this.description,
      size: this.size,
      date: this.date,
      features: this.features,
      figDescription: this.figDescription,
      frameDescription: this.frameDescription,
      lastSeen: this.lastSeen,
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
    key = 'grf-support-types';
    if (this.hasThesaurus(key)) {
      this.suptEntries = thesauri[key].entries;
    } else {
      this.suptEntries = undefined;
    }
    key = 'grf-support-object-types';
    if (this.hasThesaurus(key)) {
      this.supoEntries = thesauri[key].entries;
    } else {
      this.supoEntries = undefined;
    }
    key = 'grf-support-functions';
    if (this.hasThesaurus(key)) {
      this.supfEntries = thesauri[key].entries;
    } else {
      this.supfEntries = undefined;
    }
    key = 'grf-support-materials';
    if (this.hasThesaurus(key)) {
      this.supmEntries = thesauri[key].entries;
    } else {
      this.supmEntries = undefined;
    }
    key = 'physical-size-tags';
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
      this.szDimEntries = thesauri[key].entries;
    } else {
      this.szDimEntries = undefined;
    }
    key = 'grf-features';
    if (this.hasThesaurus(key)) {
      this.featEntries = thesauri[key].entries;
    } else {
      this.featEntries = undefined;
    }
    key = 'grf-state-entries';
    if (this.hasThesaurus(key)) {
      this.stateEntries = thesauri[key].entries;
    } else {
      this.stateEntries = undefined;
    }
  }

  private updateForm(part?: GrfSummaryPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.place.setValue(part.place);
    this.supportType.setValue(part.supportType);
    this.objectType.setValue(part.objectType || null);
    this.hasOriginalFn.setValue(part.originalFn ? true : false);
    this.originalFn.setValue(part.originalFn || null);
    this.currentFn.setValue(part.currentFn);
    this.indoor.setValue(part.indoor ? true : false);
    this.material.setValue(part.material);
    this.description.setValue(part.description);
    this.size.setValue(part.size);
    this.date.setValue(part.date);
    this.features.setValue(
      this._flagAdapter.setSlotChecks('features', part.features || [])
    );
    this.figDescription.setValue(part.figDescription || null);
    this.frameDescription.setValue(part.frameDescription || null);
    this.lastSeen.setValue(part.lastSeen.toUTCString());
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfSummaryPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfSummaryPart {
    let part = this.getEditedPart(GRF_SUMMARY_PART_TYPEID) as GrfSummaryPart;
    part.place = this.place.value!;
    part.supportType = this.supportType.value?.trim();
    part.objectType = this.objectType.value?.trim();
    if (this.hasOriginalFn.value) {
      part.originalFn = this.originalFn.value?.trim();
    }
    part.currentFn = this.currentFn.value?.trim();
    part.indoor = this.indoor.value;
    part.material = this.material.value?.trim();
    part.description = this.description.value?.trim();
    part.size = this.size.value!;
    part.date = this.date.value!;
    part.features = this._flagAdapter.getOptionalCheckedFlagIds('features');
    part.figDescription = this.figDescription.value?.trim();
    part.frameDescription = this.frameDescription.value?.trim();
    part.lastSeen = part.lastSeen = new Date(Date.parse(this.lastSeen.value));

    return part;
  }

  public onNameChange(name: ProperName | undefined): void {
    this.place.setValue(name || null);
    this.place.updateValueAndValidity();
    this.place.markAsDirty();
  }
}
