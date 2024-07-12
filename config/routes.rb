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
  get '/auth', to: 'auth#get_auth_user'

  resources :users, only: [:index, :show, :create, :update] do
    member do
      patch 'change_password'
    end
  end
  resources :recipes, only: [:index, :show, :create, :update, :destroy] do
    resources :ingredients, only: [:create, :update, :destroy]
    
    # Rota para exibir receitas armazenadas do usuário
    get 'stored/:user_id', to: 'recipes#show_stored_recipes', as: 'stored_user', on: :collection

    get 'user/:user_id', to: 'recipes#show_user_recipes', as: 'user', on: :collection   # Rota para exibir receitas do usuário
  end
  resources :categories, only: [:index, :show, :create, :update]
end
