# Patientgeist

Be patient when making ajax requests in poltergeist.  Do not take the next action until the ajax request has been completed.

## Installation

Add this line to your application's Gemfile:

    gem 'patientgeist'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install patientgeist

## Usage

```ruby
    click_button 'save'
    wait_for_ajax
    expect(find('#message')).to equal('saved')
```

Can now be:
```ruby
    click_button 'save'
    expect(find('#message')).to equal('saved')
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
