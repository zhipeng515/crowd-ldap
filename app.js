var ldapjs = require('ldapjs');
var ldapjsCrowd = require('./crowd.js');

server = ldapjs.createServer();

var config = {
  crowd: {
      applicationPassword: process.env.APP_PWD,
      url: 'http://127.0.0.1:8095/crowd/',
      debug: true,
      applicationName: 'ldap',
      sslRootCertificate: null
    },
  ldap: {
    uid: 'uid',
    bindPassword: 'password',
    dnSuffix: 'dc=crowd',
    bindDn: 'uid=jzdarsky,ou=users',
    searchBase: 'ou=users',
    port: 389
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
