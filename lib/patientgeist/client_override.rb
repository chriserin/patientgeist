module Capybara::Poltergeist
  class Client
    alias old_command command
    def command
      main_override_path = File.expand_path('../client/compiled/main_overrides.js', __FILE__)
      command_array = old_command
      command_array[1] = main_override_path
      command_array << PHANTOMJS_SCRIPT
      command_array << File.expand_path('../client/compiled/browser_overrides.js', __FILE__)
    end
  end
end
