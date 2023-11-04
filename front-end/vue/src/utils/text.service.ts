import { LocalDataService } from './';
import { ZHCNCONTROLS, ZHCNMESSAGES, ENUSCONTROLS, ENUSMESSAGES } from '../constants/texts';
import type { IControls } from '@/constants/texts/controls.i';
import type { IMessages } from '@/constants/texts/messages.i';

const languages: { [key: string]: string } = {
  'zh-cn': '中文',
  'en-us': 'English'
};

export interface Language {
  name: string;
  text: string;
}

export class TextService {
  private static msgs: IMessages;
  private static ctls: IControls;
  private static language: Language;

  static getLanguage(): Language {
    const langObject = LocalDataService.localStorageGet('language');
    if (!langObject) {
      let langName: string =
        window.navigator.language ||
        (window as any).navigator['browserLanguage'] ||
        (window as any).navigator['userLanguage'] ||
        (window as any).navigator['systemLanguage'];
      langName = langName.substr(0, 2).toLowerCase();
      langName = langName === 'en' || langName.indexOf('en-') > -1 ? 'en-us' : 'zh-cn';
      return { name: langName, text: languages[langName] };
    }
    return langObject as Language;
  }

  /**
   * set system language
   * @param lang : language name
   * @param text : language display text
   */
  static setLanguage(name: string, text: string) {
    const langObject = { name, text };
    LocalDataService.localStorageSet('language', langObject);
    switch (name) {
      case 'zh-cn':
        this.ctls = ZHCNCONTROLS;
        this.msgs = ZHCNMESSAGES;
        break;
      case 'en-us':
        this.ctls = ENUSCONTROLS;
        this.msgs = ENUSMESSAGES;
        break;
      default:
        this.ctls = ZHCNCONTROLS;
        this.msgs = ZHCNMESSAGES;
        break;
    }
    window.location.reload();
  }

  static get messages(): IMessages {
    if (!this.msgs) {
      switch (this.languageName) {
        case 'zh-cn':
          this.msgs = ZHCNMESSAGES;
          break;
        case 'en-us':
          this.msgs = ENUSMESSAGES;
          break;
        default:
          this.msgs = ZHCNMESSAGES;
          break;
      }
    }
    return this.msgs;
  }

  static get controls(): IControls {
    if (!this.ctls) {
      switch (this.languageName) {
        case 'zh-cn':
          this.ctls = ZHCNCONTROLS;
          break;
        case 'en-us':
          this.ctls = ENUSCONTROLS;
          break;
        default:
          this.ctls = ZHCNCONTROLS;
          break;
      }
    }
    return this.ctls;
  }

  static get languageObject(): Language {
    if (!this.language) {
      this.language = this.getLanguage();
    }
    return this.language;
  }

  static get languageName(): string {
    if (!this.language) {
      this.language = this.getLanguage();
    }
    return this.language.name;
  }
}
