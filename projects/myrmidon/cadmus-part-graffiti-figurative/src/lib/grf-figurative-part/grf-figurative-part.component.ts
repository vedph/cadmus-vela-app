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
import {
  EditedObject,
  ModelEditorComponentBase,
  renderLabelFromLastColon,
} from '@myrmidon/cadmus-ui';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';

import {
  GrfFigurativePart,
  GRF_FIGURATIVE_PART_TYPEID,
} from '../grf-figurative-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * GrfFigurative part editor component.
 * Thesauri: grf-fig-frame-types, grf-fig-types, grf-fig-features.
 */
@Component({
  selector: 'cadmus-grf-figurative-part',
  templateUrl: './grf-figurative-part.component.html',
  styleUrls: ['./grf-figurative-part.component.css'],
})
export class GrfFigurativePartComponent
  extends ModelEditorComponentBase<GrfFigurativePart>
  implements OnInit
{
  private _featEntries: ThesaurusEntry[];
  private readonly _flagAdapter: FlagsPickerAdapter;

  // flags
  public featFlags$: Observable<Flag[]>;

  // grf-fig-frame-types
  public fraEntries?: ThesaurusEntry[];

  // grf-fig-types
  public typEntries?: ThesaurusEntry[];

  // grf-fig-features
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

  // form
  public frameType: FormControl<string>;
  public type: FormControl<ThesaurusEntry | null>;
  public features: FormControl<Flag[]>;
  public note: FormControl<string | null>;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this._featEntries = [];
    this._flagAdapter = new FlagsPickerAdapter();
    this.featFlags$ = this._flagAdapter.selectFlags('features');
    // form
    this.frameType = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.type = formBuilder.control(null, {
      validators: Validators.required,
      nonNullable: true,
    });
    this.features = formBuilder.control([], { nonNullable: true });
    this.note = formBuilder.control(null, Validators.maxLength(5000));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      frameType: this.frameType,
      type: this.type,
      features: this.features,
      note: this.note,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-fig-frame-types';
    if (this.hasThesaurus(key)) {
      this.fraEntries = thesauri[key].entries;
    } else {
      this.fraEntries = undefined;
    }
    key = 'grf-fig-types';
    if (this.hasThesaurus(key)) {
      this.typEntries = thesauri[key].entries;
    } else {
      this.typEntries = undefined;
    }
    key = 'grf-fig-features';
    if (this.hasThesaurus(key)) {
      this.featEntries = thesauri[key].entries;
    } else {
      this.featEntries = undefined;
    }
  }

  private updateForm(part?: GrfFigurativePart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.frameType.setValue(part.frameType);
    this.type.setValue(
      this.typEntries?.find((e) => e.id === part.type) || null
    );
    this.features.setValue(
      this._flagAdapter.setSlotChecks('features', part.features || [])
    );
    this.note.setValue(part.note || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfFigurativePart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfFigurativePart {
    let part = this.getEditedPart(
      GRF_FIGURATIVE_PART_TYPEID
    ) as GrfFigurativePart;

    const featIds = this._flagAdapter.getOptionalCheckedFlagIds('features');

    part.frameType = this.frameType.value?.trim();
    part.type = this.type.value?.id!;
    part.features = featIds?.length ? featIds : undefined;
    part.note = this.note.value?.trim();
    return part;
  }

  public onFeatureFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('features', flags, true);
    this.features.setValue(flags);
    this.features.markAsDirty();
    this.features.updateValueAndValidity();
  }

  public onTypeChange(entry: ThesaurusEntry): void {
    this.type.setValue(entry);
    this.type.updateValueAndValidity();
    this.type.markAsDirty();
  }

  public renderLabel(label: string): string {
    return renderLabelFromLastColon(label);
  }
}
