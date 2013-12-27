try
  browser_overrides_path = phantom.args[phantom.args.length - 1]
  phantomjs_script       = phantom.args[phantom.args.length - 2]

  old_phantom = phantom
  phantom = {}
  phantom extends old_phantom

  index = phantomjs_script.lastIndexOf("/")
  path  = phantomjs_script.substr(0, index)

  phantom.injectJs = (file)->
    old_phantom.injectJs(file)
    if file.match(/browser.js$/)
      old_phantom.injectJs(browser_overrides_path)
      phantom = old_phantom
      phantom.libraryPath = path

  phantom.libraryPath = path
  phantom.injectJs("#{phantom.libraryPath}/main.js")
catch e
  console.log e
