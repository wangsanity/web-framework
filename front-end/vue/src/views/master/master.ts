import { CtrPopupMenu } from '../../controls';
import { getRoutePaths, routeNames } from '../../router';
import { BaseInfoService } from '../../business';
import { TextService, type Language } from '../../utils';
import { defineComponent } from 'vue';
import { useUserStore } from '../../stores';
import type { UserToken } from '../../models';
import Menus from './menus/menus.vue';

export default defineComponent({
  components: { Menus, CtrPopupMenu },
  data() {
    return {
      userMenus: [] as { name: string; url?: string; click?: Function }[],
      languages: [] as { name: string; click: Function }[],
      currentLanguage: TextService.languageObject.text,
      messages: TextService.messages,
      controls: TextService.controls
    };
  },
  computed: {
    userToken(): UserToken {
      const userStore = useUserStore();
      return userStore.userToken || {}
    }
  },
  created() {
    this.userMenus = [
      { name: this.controls.userProfile, url: getRoutePaths()[routeNames.userProfile] },
      {
        name: this.controls.logout,
        click: () => {
          BaseInfoService.clearToken();
          BaseInfoService.clearAuthorization();
          this.$router.push({ name: routeNames.login });
        }
      }
    ];

    this.languages = this.controls.languages.map((item: Language) => {
      return {
        name: item.text,
        click: () => {
          this.currentLanguage = item.text;
          TextService.setLanguage(item.name, item.text);
        }
      };
    });
  }
});
