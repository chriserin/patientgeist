# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'patientgeist/version'

Gem::Specification.new do |spec|
  spec.name          = "patientgeist"
  spec.version       = Patientgeist::VERSION
  spec.authors       = ["Christopher Erin"]
  spec.email         = ["chris.erin@gmail.com"]
  spec.description   = %q{Enable capybara to wait for json ajax requests by default.}
  spec.summary       = %q{Enable capybara to wait for json ajax requests by default.}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency "coffee-script"
  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
