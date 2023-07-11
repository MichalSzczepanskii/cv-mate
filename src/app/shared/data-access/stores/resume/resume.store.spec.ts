import { ResumeStore } from './resume.store';
import { Resume } from '../../models/resume';
import { SupportedLanguage } from '../../constants/supported-language';
import { LocalStorageKey } from '../../constants/local-storage-key';

describe('ResumeStore', () => {
  let resumeStore: ResumeStore;

  const resumes: Resume[] = [
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
  ];

  beforeEach(() => {
    resumeStore = new ResumeStore();
  });

  it('should set initial state', done => {
    resumeStore.state$.subscribe(state => {
      expect(state.resumes.length).toEqual(3);
      expect(state.resumes).toEqual(resumes);
      done();
    });
  });

  it('should set state with initial value if array from localStorage is empty', done => {
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify('[]'));

    resumeStore = new ResumeStore();

    expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.RESUMES);
    resumeStore.state$.subscribe(state => {
      expect(state.resumes.length).toEqual(3);
      expect(state.resumes).toEqual(resumes);
      done();
    });
  });

  it('should set initial state from localStorage if it is defined', done => {
    const mockResumes: Resume[] = [
      {
        id: '3',
        name: 'test cv 3',
        language: Object.keys(SupportedLanguage)[0],
        data: {},
      },
    ];
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockResumes));

    resumeStore = new ResumeStore();

    expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.RESUMES);
    resumeStore.state$.subscribe(state => {
      expect(state.resumes.length).toEqual(1);
      expect(state.resumes).toEqual(mockResumes);
      done();
    });
  });

  it('should filter out invalid resumes from local storage', done => {
    const validResume = {
      id: '3',
      name: 'test cv 3',
      language: Object.keys(SupportedLanguage)[0],
      data: {},
    };
    const invalidResume = {
      id: '4',
      data: {},
    };
    const mockResumes = [validResume, invalidResume];
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify(mockResumes));

    resumeStore = new ResumeStore();

    expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.RESUMES);
    resumeStore.state$.subscribe(state => {
      expect(state.resumes.length).toEqual(1);
      expect(state.resumes).toEqual([validResume]);
      done();
    });
  });

  it('should select current resumes', done => {
    resumeStore.resumes$.subscribe(resumes => {
      expect(resumes.length).toEqual(3);
      expect(resumes).toEqual(resumes);
      done();
    });
  });
});
