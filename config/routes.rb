Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update] do
    member do
      patch 'change_password'
    end
  end

  post '/login', to: 'auth#login'
  scope '/auth' do 
    get '/' => 'auth#get_auth_user', as: :get_auth_user
  end
end
