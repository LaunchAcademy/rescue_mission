require 'rspec/expectations'

RSpec::Matchers.define :permit_attributes do |*attributes|
  match do |policy|
    attributes.all? { |a| policy.permitted_attributes.include?(a) }
  end
end

RSpec::Matchers.alias_matcher :permit_attribute, :permit_attributes
