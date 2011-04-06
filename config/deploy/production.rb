role :app, "web1.sencha.com", "web2.sencha.com", "ec2-204-236-210-152.compute-1.amazonaws.com", "ec2-50-17-92-71.compute-1.amazonaws.com"
role :web, "web1.sencha.com", "web2.sencha.com", "ec2-204-236-210-152.compute-1.amazonaws.com", "ec2-50-17-92-71.compute-1.amazonaws.com"
role :db,  "web1.sencha.com", "web2.sencha.com", "ec2-204-236-210-152.compute-1.amazonaws.com", "ec2-50-17-92-71.compute-1.amazonaws.com", :primary => true
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
