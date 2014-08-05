FactoryGirl.define do
  factory :answer do
    association :user
    association :question
    accepted false

    sequence(:body) do |n|
      "If you just derp #{n} times and refresh, it should work."
    end
  end
end
