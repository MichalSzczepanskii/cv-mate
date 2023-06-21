import { Injectable } from '@angular/core';
import { Resume } from '../../models/resume';
import { ComponentStore } from '@ngrx/component-store';
import { SupportedLanguage } from '../../constants/supported-language';
import { Observable } from 'rxjs';
import { LocalStorageKey } from '../../constants/local-storage-key';

export interface ResumeState {
  resumes: Resume[];
}

const resumeInitialState: ResumeState = {
  resumes: [
    {
      id: '1',
      name: 'test cv',
      language: Object.keys(SupportedLanguage)[0],
      data: {},
    },
    {
      id: '2',
      name: 'test cv 2',
      language: Object.keys(SupportedLanguage)[1],
      data: {},
    },
    {
      id: '3',
      name: 'test cv 3',
      language: Object.keys(SupportedLanguage)[0],
      data: {},
    },
  ],
};

@Injectable()
export class ResumeStore extends ComponentStore<ResumeState> {
  constructor() {
    super(resumeInitialState);
    const resumes = this.getValidResumes();
    if (resumes) {
      this.setState({ resumes: resumes });
    }
  }

  private getValidResumes() {
    const resumes = JSON.parse(
      localStorage.getItem(LocalStorageKey.RESUMES) ?? '[]'
    ) as Resume[];

    return resumes.filter(this.isValidResume);
  }

  private isValidResume(resume: Resume) {
    return resume.id && resume.name && resume.language && resume.data;
  }

  readonly resumes$: Observable<Resume[]> = this.select(state => state.resumes);
}
