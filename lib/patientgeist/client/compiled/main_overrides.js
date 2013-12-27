var browser_overrides_path, e, index, old_phantom, path, phantom, phantomjs_script,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

try {
  browser_overrides_path = phantom.args[phantom.args.length - 1];
  phantomjs_script = phantom.args[phantom.args.length - 2];
  old_phantom = phantom;
  phantom = {};
  __extends(phantom, old_phantom);
  index = phantomjs_script.lastIndexOf("/");
  path = phantomjs_script.substr(0, index);
  phantom.injectJs = function(file) {
    old_phantom.injectJs(file);
    if (file.match(/browser.js$/)) {
      old_phantom.injectJs(browser_overrides_path);
      phantom = old_phantom;
      return phantom.libraryPath = path;
    }
  };
  phantom.libraryPath = path;
  phantom.injectJs("" + phantom.libraryPath + "/main.js");
} catch (_error) {
  e = _error;
  console.log(e);
}
