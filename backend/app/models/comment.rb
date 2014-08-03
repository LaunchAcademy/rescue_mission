class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true

  validates :commentable, presence: true
  validates :body, length: { in: 15..10000 }
end
