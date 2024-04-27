Rails.application.routes.draw do
  get 'categories/index'
  get 'categories/show'
  get 'categories/create'
  get 'categories/update'
  get 'categories/destroy'
  get 'ingredients/index'
  get 'ingredients/show'
  get 'ingredients/create'
  get 'ingredients/update'
  get 'ingredients/destroy'
  
  post '/login', to: 'auth#login'
  scope '/auth' do 
    get '/' => 'auth#get_auth_user', as: :get_auth_user
  end
  resources :users, only: [:index, :show, :create, :update] do
    member do
      patch 'change_password'
    end
  end
  resources :recipes, only: [:index, :show, :create, :update, :destroy] do
    resources :ingredients, only: [:create, :update, :destroy]
    get 'show_stored', on: :collection  # Rota para exibir receitas armazenadas
  end
  resources :categories, only: [:index, :show, :create, :update]
end
