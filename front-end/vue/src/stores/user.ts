import { defineStore } from 'pinia';
import type { User, UserToken } from '../models';
import { LocalDataService } from '../utils';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as User | null,
      userToken: LocalDataService.cookieGet('userInfo') as UserToken | null
    };
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setUserToken(user: UserToken | null) {
      this.userToken = user;
    }
  }
});
