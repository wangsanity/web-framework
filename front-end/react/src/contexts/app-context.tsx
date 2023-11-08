import { UserToken } from '../models';
import { BaseInfoService } from '../business';
import { ReactNode, createContext, useContext } from 'react';
import { IControls } from '../constants/texts/controls.i';
import { IMessages } from '@/constants/texts/messages.i';

interface AppState {
  userToken?: UserToken;
  controlsText: IControls;
  messagesText: IMessages;
  setUserToken: (userToken: UserToken) => void;
  setControlsText: (controlsText: IControls) => void;
  setMessagesText: (messagesText: IMessages) => void;
}

let appState: AppState = {
  controlsText: {} as IControls,
  messagesText: {} as IMessages,
  userToken: BaseInfoService.getUser(),
  setUserToken(userToken: UserToken) {
    appState = { ...appState, userToken };
  },
  setControlsText(controlsText: IControls) {
    appState = { ...appState, controlsText };
  },
  setMessagesText(messagesText: IMessages) {
    appState = { ...appState, messagesText };
  },
};

export const AppContext = createContext<AppState>(appState);

export function AppWrapper({ children }: { children: ReactNode }) {
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
