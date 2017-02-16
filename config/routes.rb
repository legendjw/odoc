Rails.application.routes.draw do
  root 'home#index'

  resources :sessions, only: [:new, :create, :destroy]

  match 'users/object', to: 'users#object', via: :get
  resources :users

  #resources :models

  match 'models/:model_id/object', to: 'models#object', via: :get
  match 'models/:model_id', to: 'models#index', via: :get

  match 'menus', to: 'menus#index', via: :get

  match 'signup', to: 'users#signup', via: [:get, :post]
  match 'signin', to: 'sessions#new', via: :get
  match 'signout', to: 'sessions#destroy', via: :delete
end
