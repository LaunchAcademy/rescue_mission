Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :answers, only: [:index, :show, :create, :update]
      resources :authentications, only: [:create]
      resources :questions, only: [:index, :show, :create, :update]
      resources :users, only: [:show]
    end
  end
end
