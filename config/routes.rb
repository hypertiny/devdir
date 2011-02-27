ActionController::Routing::Routes.draw do |map|

  # User routes
  map.logout '/logout', :controller => 'sessions', :action => 'destroy'
  map.login '/login', :controller => 'sessions', :action => 'new'
  map.register '/register', :controller => 'users', :action => 'create'
  map.signup '/signup', :controller => 'users', :action => 'new'
  map.resource :session
  map.resources :password_resets

  # Country and state routes
  map.resources :top_cities

  Country.slugs.each do |slug|
    map.send(slug.gsub('-', '_'), "/developers/#{slug}", :controller => "countries", :action => "show", :country => slug)
  end

  State.slugs.each do |slug|
    map.send(slug.gsub('-', '_'), "/developers/us-#{slug}", :controller => "states", :action => "show", :state => slug)
  end

  # App routes
  map.resource :home, :controller => 'home'
  map.resource :provider_directory, :as => :developer_directory, :controller => "provider_directory"

  map.resources :favorites
  map.resources :providers, :as => :developers, :shallow => true, :collection => {:search => :get, :by_location => :get} do |provider|
    provider.resources :endorsements
    provider.resources :portfolio_items
    provider.resources :favorites
  end
  map.resources :rfps
  map.resources :pages, :requirements => { :id => /.*/}

  # Provider admin routes
  map.my '/my', :controller => 'my/dashboard', :action => 'show'
  map.namespace :my do |me|
    me.resource :dashboard, :controller => 'dashboard'
    me.resource :provider, :as => :developer
    me.resources :portfolio_items
    me.resources :endorsement_requests
    me.resources :users
    me.resources :endorsements, :collection => {:sort => :put, :update_all => :post}
    me.resources :requests
  end

  # Admin routes
  map.admin '/admin', :controller => 'admin/dashboard', :action => 'show'
  map.change_password '/admin/change_password', :controller => 'admin/users', :action => 'change_password'
  map.namespace :admin do |admin|
    admin.resource :dashboard, :controller => 'dashboard'
    admin.resources :services
    admin.resources :users, :member => [:take_control, :resend_welcome]
    admin.resources :portfolio_items
    admin.resources :rfps
    admin.resources :endorsements
    admin.resources :providers do |provider|
      provider.resources :users
      provider.resources :portfolio_items
      provider.resources :requests
      provider.resources :endorsements
    end
    admin.resources :pages
    admin.resource :csv
    admin.resources :top_cities, :collection => {:sort => :put}
  end

  map.root :controller => "my/dashboard", :action => 'show'
end
