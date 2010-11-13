role :app, "staging.sencha.com"
role :web, "staging.sencha.com"
role :db,  "staging.sencha.com", :primary => true
set :rails_env, 'production'
set :branch, "master"

namespace :deploy do
  desc "Deploy!" 
  task :default do
     transaction do
       update_code
       symlink
       #migrate
       restart
     end
     cleanup
  end
end