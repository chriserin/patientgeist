require "bundler/setup"
require 'coffee-script'

task :compile do
  Dir.glob("lib/patientgeist/client/*.coffee").each do |f|
    compiled = "lib/patientgeist/client/compiled/#{f.split("/").last.split(".").first}.js"
    File.open(compiled, "w") do |out|
      puts "Compiling #{f}"
      out << CoffeeScript.compile(File.read(f), :bare => true)
    end
  end
end
