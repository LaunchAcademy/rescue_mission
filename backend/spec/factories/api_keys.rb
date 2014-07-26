FactoryGirl.define do
  factory :api_key do
    association :user

    trait :active do
      expires_at { Time.zone.now + 1.week }
    end

    trait :inactive do
      expires_at { Time.zone.now - 1.week }
    end
  end
end
