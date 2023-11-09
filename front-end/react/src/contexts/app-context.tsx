import { UserToken } from '../models';
import { BaseInfoService } from '../business';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { IControls } from '../constants/texts/controls.i';
import { IMessages } from '@/constants/texts/messages.i';
import { TextService } from '@/utils';

interface AppState {
  userToken?: UserToken;
  controlsText: IControls;
  messagesText: IMessages;
}

const initialState: AppState = {
  controlsText: {} as IControls,
  messagesText: {} as IMessages,
  userToken: BaseInfoService.getUser(),
};

export enum APP_CONTEXT_ACTIONS {
  setControlsText = 'SET_CONTROLS_TEXT',
  setMessagesText = 'SET_MESSAGES_TEXT',
  setUserToken = 'SET_USER_TOKEN',
}

const reducer = (
  state: AppState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case APP_CONTEXT_ACTIONS.setControlsText:
      return { ...state, controlsText: action.payload };
    case APP_CONTEXT_ACTIONS.setMessagesText:
      return { ...state, messagesText: action.payload };
    case APP_CONTEXT_ACTIONS.setUserToken:
      return { ...state, userToken: action.payload };
    default:
      return state;
  }
};

export const AppContext = createContext({
  state: initialState,
  dispatch: (action: { type: string; payload: any }) => {},
});

export function AppWrapper({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    dispatch({
      type: APP_CONTEXT_ACTIONS.setControlsText,
      payload: TextService.controls,
    });
    dispatch({
      type: APP_CONTEXT_ACTIONS.setMessagesText,
      payload: TextService.messages,
    });
    dispatch({
      type: APP_CONTEXT_ACTIONS.setUserToken,
      payload: BaseInfoService.getUser(),
    });
    setMounted(true);
  }, []);

  return mounted ? (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  ) : null;
}

export function useAppState() {
  return useContext(AppContext).state;
}

export function useAppContext() {
  return useContext(AppContext);
}
