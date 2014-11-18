class QuestionCreated
  attr_reader :question

  def initialize(question)
    @question = question
  end

  def perform
    chatroom.push_to_team_inbox(message_options)
  end

  private

  def chatroom
    chatroom_provider.new(chatroom_options)
  end

  def chatroom_options
    {
      api_token: flowdock_api_tokens,
      source: 'Rescue Mission',
      from: { name: 'Rescue Mission', address: 'hello@launchacademy.com' }
    }
  end

  def flowdock_api_tokens
    ENV['FLOWDOCK_FLOW_API_TOKENS'].split(', ')
  end

  def chatroom_provider
    if Rails.env.production?
      Flowdock::Flow
    else
      FakeFlowdock::Flow
    end
  end

  def message_options
    {
      subject: question.title,
      content: question.body,
      tags: ['question'],
      link: "https://rescue-mission.launchacademy.com/questions/#{question.id}"
    }
  end
end
