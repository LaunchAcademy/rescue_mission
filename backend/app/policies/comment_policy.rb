class CommentPolicy < ApplicationPolicy
  def show?
    true
  end

  def create?
    user
  end

  def update?
    user && (user_created_record? || user.admin?)
  end

  private

  def user_created_record?
    record.user_id == user.id
  end
end
