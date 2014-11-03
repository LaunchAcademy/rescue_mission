class QuestionPolicy < ApplicationPolicy
  def show?
    true
  end

  def create?
    user
  end

  def update?
    user && (user_created_record? || user.admin?)
  end

  def assign?
    user && user.admin?
  end

  def permitted_attributes
    attributes = [:body, :title]
    attributes += [:assignee_id] if assign?
    attributes
  end

  private

  def user_created_record?
    record.user_id == user.id
  end
end
