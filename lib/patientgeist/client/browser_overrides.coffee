class Poltergeist.Browser extends Poltergeist.Browser
  constructor: (@owner, width, height) ->
    originalResetFunc = this.resetPage
    initialReset = => originalResetFunc.apply(this)

    this.resetPage = =>
      initialReset()
      @additionalReset()
    super(@owner, width, height)

  additionalReset: =>
    @jsonRequests = []
    @page.onResourceRequested = (request) =>
      @jsonRequests.push(request.id)

  sendResponse: (response) ->
    if not @responseCallback(response)
      callback = => @responseCallback(response)
      @responseInterval = setInterval(callback, 10)

  responseCallback: (response)=>
    if (@page.allRequestsReceived(@jsonRequests) || @page.errors().count > 0)
      errors = @page.errors()
      @page.clearErrors()
      if errors.length > 0 && @js_errors
        @owner.sendError(new Poltergeist.JavascriptError(errors))
        clearInterval(@responseInterval)
      else
        @owner.sendResponse(response)
        clearInterval(@responseInterval)
      return true
    return false

class Poltergeist.WebPage extends Poltergeist.WebPage
  allRequestsReceived: (ids)->
    for requestId in ids
      if @networkTraffic()[requestId].responseParts.length == 0
        return false
    return true
