Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update] do
    member do
      patch 'change_password'
    end
  end
end
