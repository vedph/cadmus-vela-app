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
import { DecoratedCount } from '@myrmidon/cadmus-refs-decorated-counts';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';
import { NgToolsValidators } from '@myrmidon/ng-tools';

import { GrfWritingPart, GRF_WRITING_PART_TYPEID } from '../grf-writing-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * GrfWriting part editor component.
 * Thesauri: grf-writing-systems, grf-writing-languages, grf-writing-scripts,
 * grf-writing-casing, grf-writing-script-features, grf-writing-letter-features,
 * grf-writing-count-ids, grf-writing-count-tags, grf-writing-metres.
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
  private _scrEntries: ThesaurusEntry[];
  private _scrFeatEntries: ThesaurusEntry[];
  private _letFeatEntries: ThesaurusEntry[];
  private _mtrEntries: ThesaurusEntry[];
  private readonly _flagAdapter: FlagsPickerAdapter;

  // flags
  public lngFlags$: Observable<Flag[]>;
  public scrFlags$: Observable<Flag[]>;
  public scrFeatFlags$: Observable<Flag[]>;
  public letFeatFlags$: Observable<Flag[]>;
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

  // grf-writing-scripts
  public get scrEntries(): ThesaurusEntry[] | undefined {
    return this._scrEntries;
  }
  public set scrEntries(value: ThesaurusEntry[] | undefined) {
    if (this._scrEntries === value) {
      return;
    }
    this._scrEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'scripts',
      this._scrEntries.map(entryToFlag)
    );
  }

  // grf-writing-casing
  public caseEntries?: ThesaurusEntry[];

  // grf-writing-count-ids
  public cntiEntries?: ThesaurusEntry[];

  // grf-writing-count-tags
  public cnttEntries?: ThesaurusEntry[];

  // grf-writing-script-features
  public get scrFeatEntries(): ThesaurusEntry[] | undefined {
    return this._scrFeatEntries;
  }
  public set scrFeatEntries(value: ThesaurusEntry[] | undefined) {
    if (this._scrFeatEntries === value) {
      return;
    }
    this._scrFeatEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'script-features',
      this._scrFeatEntries.map(entryToFlag)
    );
  }

  // grf-writing-letter-features
  public get letFeatEntries(): ThesaurusEntry[] | undefined {
    return this._letFeatEntries;
  }
  public set letFeatEntries(value: ThesaurusEntry[] | undefined) {
    if (this._letFeatEntries === value) {
      return;
    }
    this._letFeatEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'letter-features',
      this._letFeatEntries.map(entryToFlag)
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
  public scripts: FormControl<Flag[]>;
  public casing: FormControl<string>;
  public scrFeatures: FormControl<Flag[]>;
  public letFeatures: FormControl<Flag[]>;
  public counts: FormControl<DecoratedCount[]>;
  public hasRuling: FormControl<boolean>;
  public ruling: FormControl<string | null>;
  public hasRubrics: FormControl<boolean>;
  public rubrics: FormControl<string | null>;
  public hasProse: FormControl<boolean>;
  public hasPoetry: FormControl<boolean>;
  public metres: FormControl<Flag[]>;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this._lngEntries = [];
    this._scrEntries = [];
    this._scrFeatEntries = [];
    this._letFeatEntries = [];
    this._mtrEntries = [];
    this._flagAdapter = new FlagsPickerAdapter();
    this.lngFlags$ = this._flagAdapter.selectFlags('languages');
    this.scrFlags$ = this._flagAdapter.selectFlags('scripts');
    this.scrFeatFlags$ = this._flagAdapter.selectFlags('script-features');
    this.letFeatFlags$ = this._flagAdapter.selectFlags('letter-features');
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
    this.scripts = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.casing = formBuilder.control('', { nonNullable: true });
    this.scrFeatures = formBuilder.control([], { nonNullable: true });
    this.letFeatures = formBuilder.control([], { nonNullable: true });
    this.counts = formBuilder.control([], { nonNullable: true });
    this.hasRuling = formBuilder.control(false, { nonNullable: true });
    this.ruling = formBuilder.control(null, { nonNullable: true });
    this.hasRubrics = formBuilder.control(false, { nonNullable: true });
    this.rubrics = formBuilder.control(null, { nonNullable: true });
    this.hasProse = formBuilder.control(false, { nonNullable: true });
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
      scripts: this.scripts,
      casing: this.casing,
      scrFeatures: this.scrFeatures,
      letFeatures: this.letFeatures,
      counts: this.counts,
      hasRuling: this.hasRuling,
      ruling: this.ruling,
      hasRubrics: this.hasRubrics,
      rubrics: this.rubrics,
      hasProse: this.hasProse,
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
    key = 'grf-writing-scripts';
    if (this.hasThesaurus(key)) {
      this.scrEntries = thesauri[key].entries;
    } else {
      this.scrEntries = undefined;
    }
    key = 'grf-writing-casing';
    if (this.hasThesaurus(key)) {
      this.caseEntries = thesauri[key].entries;
    } else {
      this.caseEntries = undefined;
    }
    key = 'grf-writing-script-features';
    if (this.hasThesaurus(key)) {
      this.scrFeatEntries = thesauri[key].entries;
    } else {
      this.scrFeatEntries = undefined;
    }
    key = 'grf-writing-letter-features';
    if (this.hasThesaurus(key)) {
      this.letFeatEntries = thesauri[key].entries;
    } else {
      this.letFeatEntries = undefined;
    }
    key = 'grf-writing-count-ids';
    if (this.hasThesaurus(key)) {
      this.cntiEntries = thesauri[key].entries;
    } else {
      this.cntiEntries = undefined;
    }
    key = 'grf-writing-count-tags';
    if (this.hasThesaurus(key)) {
      this.cnttEntries = thesauri[key].entries;
    } else {
      this.cnttEntries = undefined;
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
    this.scripts.setValue(
      this._flagAdapter.setSlotChecks('scripts', part.scripts)
    );
    this.casing.setValue(part.casing);
    this.scrFeatures.setValue(
      this._flagAdapter.setSlotChecks(
        'script-features',
        part.scriptFeatures || []
      )
    );
    this.letFeatures.setValue(
      this._flagAdapter.setSlotChecks(
        'letter-features',
        part.letterFeatures || []
      )
    );
    this.counts.setValue(part.counts || []);
    this.hasRuling.setValue(part.hasRuling || false);
    this.ruling.setValue(part.ruling || null);
    this.hasRubrics.setValue(part.hasRubrics || false);
    this.rubrics.setValue(part.rubrics || null);
    this.hasProse.setValue(part.hasProse || false);
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
    part.scripts = this._flagAdapter.getOptionalCheckedFlagIds('scripts') || [];
    part.casing = this.casing.value?.trim();
    part.scriptFeatures =
      this._flagAdapter.getOptionalCheckedFlagIds('script-features') || [];
    part.letterFeatures =
      this._flagAdapter.getOptionalCheckedFlagIds('letter-features') || [];
    part.counts = this.counts.value.length ? this.counts.value : undefined;
    part.hasRuling = this.hasRuling.value ? true : undefined;
    part.ruling = this.ruling.value?.trim();
    part.hasRubrics = this.hasRubrics.value ? true : undefined;
    part.rubrics = this.rubrics.value?.trim();
    part.hasProse = this.hasProse.value ? true : undefined;
    part.hasPoetry = this.hasPoetry.value ? true : undefined;
    part.metres = this._flagAdapter.getOptionalCheckedFlagIds('metres') || [];
    return part;
  }

  public onCountsChange(counts: DecoratedCount[]): void {
    this.counts.setValue(counts);
    this.counts.markAsDirty();
    this.counts.updateValueAndValidity();
  }

  public onLanguageFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('languages', flags, true);
    this.languages.setValue(flags);
    this.languages.markAsDirty();
    this.languages.updateValueAndValidity();
  }

  public onScriptFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('scripts', flags, true);
    this.scripts.setValue(flags);
    this.scripts.markAsDirty();
    this.scripts.updateValueAndValidity();
  }

  public onScrFeatureFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('script-features', flags, true);
    this.scrFeatures.setValue(flags);
    this.scrFeatures.markAsDirty();
    this.scrFeatures.updateValueAndValidity();
  }

  public onLetFeatureFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('letter-features', flags, true);
    this.letFeatures.setValue(flags);
    this.letFeatures.markAsDirty();
    this.letFeatures.updateValueAndValidity();
  }

  public onMetreFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('metres', flags, true);
    this.metres.setValue(flags);
    this.metres.markAsDirty();
    this.metres.updateValueAndValidity();
  }
}
