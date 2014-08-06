existing_user_count = User.count
users_to_create = 2000 - existing_user_count

users_to_create.times do |n|
  timestamp = (Time.now.to_i + n).to_s

  attributes = {
    email: "user#{timestamp}@example.com",
    provider: 'github',
    uid: timestamp,
    username: "user#{timestamp}"
  }

  puts "Creating User with: #{attributes}"

  User.create!(attributes)
end

questions_to_create = 10000 - Question.count
user_ids = User.pluck(:id)

questions_to_create.times do
  attributes = {
    user: User.find(user_ids.sample),
    title: Faker::Hacker.say_something_smart,
    body: Faker::Lorem.paragraphs(rand(1..5)).join("\n\n")
  }

  puts "Creating Question with: #{attributes}"

  Question.create!(attributes)
end

answers_to_create = 10000 - Answer.count
user_ids = User.pluck(:id)
question_ids = Question.pluck(:id)

answers_to_create.times do
  attributes = {
    question: Question.find(question_ids.sample),
    user: User.find(user_ids.sample),
    body: Faker::Lorem.paragraphs(rand(1..5)).join("\n\n")
  }

  puts "Creating Answer with: #{attributes}"

  Answer.create!(attributes)
end

comments_to_create = 10000 - Comment.count
user_ids = User.pluck(:id)
question_ids = Question.pluck(:id)

comments_to_create.times do
  question = Question.find(question_ids.sample)

  attributes = {
    user: User.find(user_ids.sample),
    body: Faker::Lorem.paragraph
  }

  puts "Creating Question Comment with: #{attributes}"

  question.comments.create!(attributes)
end
