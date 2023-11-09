const express = require('express');

const host = 'localhost';
const port = 3000;
const app = express();
const fs = require('fs');

app.use(express.static('build'));

app.all('/api/**', (req, res) => {
  const language = req.headers.language || 'zh-cn';
  const pre = '/build/mock-data/' + language + '/';
  let path = req.path.toLowerCase();

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

  function composeUrl(url) {
    return pre + url;
  }
  return res.status(200).send(fs.readFileSync(__dirname + path));
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + `/build/${req.path.toLowerCase()}.html`);
});

app.listen(port, () => {
  console.log(`Server is running on ${host}:${port}`);
});
