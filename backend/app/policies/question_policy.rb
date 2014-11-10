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

  def accept_answer?
    user && (user_created_record? || user.admin?)
  end

  def permitted_attributes
    attributes = [:body, :title]
    attributes += [:accepted_answer_id] if accept_answer?
    attributes += [:assignee_id] if assign?
    attributes
  end

  private

  def user_created_record?
    record_is_instance? && record.user == user
  end

  def record_is_instance?
    record.class == Question
  end
end
