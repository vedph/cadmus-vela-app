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
import { DecoratedCount } from '@myrmidon/cadmus-refs-decorated-counts';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';
import { NgToolsValidators } from '@myrmidon/ng-tools';
import { Observable } from 'rxjs';

import { GrfWritingPart, GRF_WRITING_PART_TYPEID } from '../grf-writing-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * GrfWriting part editor component.
 * Thesauri: grf-writing-systems, grf-writing-languages, grf-writing-types,
 * grf-writing-count-ids, grf-writing-count-tags, grf-writing-features,
 * grf-writing-metres.
 */
@Component({
  selector: 'cadmus-grf-writing-part',
  templateUrl: './grf-writing-part.component.html',
  styleUrls: ['./grf-writing-part.component.css'],
})
export class GrfWritingPartComponent
  extends ModelEditorComponentBase<GrfWritingPart>
  implements OnInit
{
  private _lngEntries: ThesaurusEntry[];
  private _featEntries: ThesaurusEntry[];
  private _mtrEntries: ThesaurusEntry[];
  private readonly _flagAdapter: FlagsPickerAdapter;

  // flags
  public lngFlags$: Observable<Flag[]>;
  public featFlags$: Observable<Flag[]>;
  public mtrFlags$: Observable<Flag[]>;

  // grf-writing-systems
  public sysEntries?: ThesaurusEntry[];

  // grf-writing-languages
  public get lngEntries(): ThesaurusEntry[] | undefined {
    return this._lngEntries;
  }
  public set lngEntries(value: ThesaurusEntry[] | undefined) {
    if (this._lngEntries === value) {
      return;
    }
    this._lngEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'languages',
      this._lngEntries.map(entryToFlag)
    );
  }

  // grf-writing-types
  public typEntries?: ThesaurusEntry[];

  // grf-writing-count-ids
  public cntdEntries?: ThesaurusEntry[];

  // grf-writing-count-tags
  public cnttEntries?: ThesaurusEntry[];

  // grf-writing-features
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

  // grf-writing-metres
  public get mtrEntries(): ThesaurusEntry[] | undefined {
    return this._mtrEntries;
  }
  public set mtrEntries(value: ThesaurusEntry[] | undefined) {
    if (this._mtrEntries === value) {
      return;
    }
    this._mtrEntries = value || [];
    this._flagAdapter.setSlotFlags('metres', this._mtrEntries.map(entryToFlag));
  }

  // form
  public system: FormControl<string>;
  public languages: FormControl<Flag[]>;
  public type: FormControl<string>;
  public counts: FormControl<DecoratedCount[]>;
  public features: FormControl<Flag[]>;
  public hasPoetry: FormControl<boolean>;
  public metres: FormControl<Flag[]>;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this._lngEntries = [];
    this._featEntries = [];
    this._mtrEntries = [];
    this._flagAdapter = new FlagsPickerAdapter();
    this.lngFlags$ = this._flagAdapter.selectFlags('languages');
    this.featFlags$ = this._flagAdapter.selectFlags('features');
    this.mtrFlags$ = this._flagAdapter.selectFlags('metres');
    // form
    this.system = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.languages = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.type = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.counts = formBuilder.control([], { nonNullable: true });
    this.features = formBuilder.control([], { nonNullable: true });
    this.hasPoetry = formBuilder.control(false, { nonNullable: true });
    this.metres = formBuilder.control([], { nonNullable: true });
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      system: this.system,
      languages: this.languages,
      type: this.type,
      counts: this.counts,
      features: this.features,
      hasPoetry: this.hasPoetry,
      metres: this.metres,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-writing-systems';
    if (this.hasThesaurus(key)) {
      this.sysEntries = thesauri[key].entries;
    } else {
      this.sysEntries = undefined;
    }
    key = 'grf-writing-languages';
    if (this.hasThesaurus(key)) {
      this.lngEntries = thesauri[key].entries;
    } else {
      this.lngEntries = undefined;
    }
    key = 'grf-writing-types';
    if (this.hasThesaurus(key)) {
      this.typEntries = thesauri[key].entries;
    } else {
      this.typEntries = undefined;
    }
    key = 'grf-writing-count-ids';
    if (this.hasThesaurus(key)) {
      this.cntdEntries = thesauri[key].entries;
    } else {
      this.cntdEntries = undefined;
    }
    key = 'grf-writing-count-tags';
    if (this.hasThesaurus(key)) {
      this.cnttEntries = thesauri[key].entries;
    } else {
      this.cnttEntries = undefined;
    }
    key = 'grf-writing-features';
    if (this.hasThesaurus(key)) {
      this.featEntries = thesauri[key].entries;
    } else {
      this.featEntries = undefined;
    }
    key = 'grf-writing-metres';
    if (this.hasThesaurus(key)) {
      this.mtrEntries = thesauri[key].entries;
    } else {
      this.mtrEntries = undefined;
    }
  }

  private updateForm(part?: GrfWritingPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.system.setValue(part.system);
    this.languages.setValue(
      this._flagAdapter.setSlotChecks('languages', part.languages)
    );
    this.type.setValue(part.type);
    this.counts.setValue(part.counts || []);
    this.features.setValue(
      this._flagAdapter.setSlotChecks('features', part.languages)
    );
    this.hasPoetry.setValue(part.hasPoetry || false);
    this.metres.setValue(
      this._flagAdapter.setSlotChecks('metres', part.languages)
    );
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfWritingPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfWritingPart {
    let part = this.getEditedPart(GRF_WRITING_PART_TYPEID) as GrfWritingPart;
    part.system = this.system.value?.trim();
    part.languages =
      this._flagAdapter.getOptionalCheckedFlagIds('languages') || [];
    part.type = this.type.value?.trim();
    part.counts = this.counts.value.length ? this.counts.value : undefined;
    part.features =
      this._flagAdapter.getOptionalCheckedFlagIds('features') || [];
    part.hasPoetry = this.hasPoetry.value ? true : undefined;
    part.metres = this._flagAdapter.getOptionalCheckedFlagIds('metres') || [];
    return part;
  }

  public onLanguageFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('languages', flags, true);
    this.languages.setValue(flags);
    this.languages.markAsDirty();
    this.languages.updateValueAndValidity();
  }

  public onFeatureFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('features', flags, true);
    this.features.setValue(flags);
    this.features.markAsDirty();
    this.features.updateValueAndValidity();
  }

  public onMetreFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('metres', flags, true);
    this.metres.setValue(flags);
    this.metres.markAsDirty();
    this.metres.updateValueAndValidity();
  }
}
