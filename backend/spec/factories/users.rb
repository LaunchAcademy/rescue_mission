FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "hello#{n}@world.com" }
    sequence(:uid) { |n| n.to_s }
    sequence(:username) { |n| "user#{n}name" }
    provider 'github'

    trait :admin do
      role 'admin'
    end

    factory :admin, traits: [:admin]
  end
end
