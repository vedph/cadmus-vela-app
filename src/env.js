// https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
(function (window) {
  window.__env = window.__env || {};

  // environment-dependent settings
  window.__env.apiUrl = "http://localhost:5080/api/";
  window.__env.version = "4.0.2";
  window.__env.thesImportEnabled = true;
})(this);
