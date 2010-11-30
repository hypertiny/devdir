role :app, "web2.sencha.com"
role :web, "web2.sencha.com"
role :db,  "web2.sencha.com", :primary => true
set :rails_env, 'production'
set :branch, "master"
set :deploy_to, "/mnt/ruby/hypertiny/#{application}"
set :user, "ubuntu"
set :group, "ubuntu"

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
