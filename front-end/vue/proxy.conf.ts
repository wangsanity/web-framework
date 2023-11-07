const PROXY_CONFIG_PROD = {
  '/api': {
    target: 'serverIP',
    secure: false,
    changeOrigin: false,
    bypass: function (req) {
      if (req.url.indexOf('/api/') !== 0) {
        return req.url;
      }
    }
  }
};

const PROXY_CONFIG_MOCK = {
  '/api': {
    target: 'http://localhost:5173/',
    secure: false,
    changeOrigin: false,
    rewrite: (path) => {
      return path.replace('/api/', '/');
    },
    configure: function (proxy) {
      proxy.on('proxyReq', (proxyReq) => {
        const language = proxyReq.getHeader('language') || 'zh-cn';
        const pre = '/mock-data/' + language + '/';
        let path = proxyReq.path.toLowerCase();

        if (path.indexOf('userrole/list') > -1) {
          path = composeUrl('user-roles.json');
        } else if (path.indexOf('role/list') > -1) {
          path = composeUrl('roles.json');
        } else if (path.indexOf('role/accesslist') > -1) {
          path = composeUrl('access-list.json');
        } else if (path.indexOf('/role') > -1) {
          path = composeUrl('role.json');
        } else if (path.indexOf('user/login') > -1) {
          path = composeUrl('token.json');
        } else if (path.indexOf('user/modifypassword') > -1) {
          path = composeUrl('ok.json');
        } else if (path.indexOf('user/list') > -1) {
          path = composeUrl('users.json');
        } else if (path.indexOf('user') > -1) {
          path = composeUrl('user.json');
        } else if (path.indexOf('user/authorizedlist') > -1) {
          path = composeUrl('authorized-list.json');
        } else if (path.indexOf('readme') > -1) {
          path = composeUrl('README.md');
        } else if (path.indexOf('user/saveroles') > -1) {
          path = composeUrl('ok.json');
        }
        proxyReq.path = path;
        proxyReq.method = 'GET';

        function composeUrl(url: string) {
          return pre + url + '?date=' + new Date().getTime();
        }
      });
    }
  }
};console.log(['mock'].indexOf(String(process.env.API_ENV)) > -1);

if (['mock'].indexOf(String(process.env.API_ENV)) > -1) {
  module.exports = PROXY_CONFIG_MOCK;
} else {
  module.exports = PROXY_CONFIG_PROD;
}
