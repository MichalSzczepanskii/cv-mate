import { AppLanguageStore } from './app-language.store';
import { SupportedLanguage } from '../../constants/supported-language';
import { LocalStorageKey } from '../../constants/local-storage-key';

describe('AppLanguageStore', () => {
  let appLanguageStore: AppLanguageStore;
  const supportedLanguages = Object.keys(SupportedLanguage);

  beforeEach(() => {
    appLanguageStore = new AppLanguageStore();
  });

  it('should set initial state to first key of supported languages if no key is saved in local storage', done => {
    appLanguageStore.state$.subscribe(state => {
      expect(state.language).toEqual(supportedLanguages[0]);
      done();
    });
  });

  it('should set initial state to key saved in local storage if is valid', done => {
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(supportedLanguages[1]);
    appLanguageStore = new AppLanguageStore();
    expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.ACTIVE_LANG);
    appLanguageStore.state$.subscribe(state => {
      expect(state.language).toEqual(supportedLanguages[1]);
      done();
    });
  });

  it('should set initial state to first key of supported languages if key saved in local storage is invalid', done => {
    const storageSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('Invalid Language');
    appLanguageStore = new AppLanguageStore();
    expect(storageSpy).toHaveBeenCalledWith(LocalStorageKey.ACTIVE_LANG);
    appLanguageStore.state$.subscribe(state => {
      expect(state.language).toEqual(supportedLanguages[0]);
      done();
    });
  });

  it('should change language', done => {
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem');
    appLanguageStore.changeLanguage(supportedLanguages[1]);
    expect(storageSpy).toHaveBeenCalledWith(
      LocalStorageKey.ACTIVE_LANG,
      supportedLanguages[1]
    );
    appLanguageStore.state$.subscribe(state => {
      expect(state.language).toEqual(supportedLanguages[1]);
      done();
    });
  });

  it('should return language state', done => {
    appLanguageStore.setState({ language: 'SPANISH' });
    appLanguageStore.language$.subscribe(language => {
      expect(language).toEqual('SPANISH');
      done();
    });
  });
});
