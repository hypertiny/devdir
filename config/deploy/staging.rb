role :app, "staging.sencha.com"
role :web, "staging.sencha.com"
role :db,  "staging.sencha.com", :primary => true
set :rails_env, 'production'
set :branch, "master"