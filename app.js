var ldapjs = require('ldapjs');
var ldapjsCrowd = require('./crowd.js');

server = ldapjs.createServer();

var config = {
  crowd: {
      applicationPassword: process.env.APP_PWD,
      url: process.env.CROWD_URL,
      debug: true,
      applicationName: process.env.APP_NAME,
      sslRootCertificate: null
    },
  ldap: {
    uid: 'uid',
    bindPassword: 'password',
    dnSuffix: 'o=' + process.env.APP_NAME,
    bindDn: 'cn=root',
    searchBase: 'ou=crowd',
    port: 1389
  }
};

var backend = ldapjsCrowd.createBackend({
  crowd: config.crowd,
  ldap: config.ldap
});

server.bind(config.ldap.dnSuffix, backend.bind());
server.search(config.ldap.dnSuffix, backend.search());

server.listen(config.ldap.port, function() {
   console.log('LDAP server listening at: ' + server.url);
 });
