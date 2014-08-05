FactoryGirl.define do
  factory :comment do
    association :user
    association :commentable, factory: :question

    sequence(:body) do |n|
      "If you just derp #{n} times and refresh, it should work."
    end
  end
end
