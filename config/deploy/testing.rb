role :app, "192.168.10.42"
role :web, "192.168.10.42"
role :db,  "192.168.10.42", :primary => true
set :rails_env, 'testing'
set :branch, "development"

#############################################################
#	Passenger
#############################################################

namespace :deploy do
  desc "Create the database yaml file"
  task :after_update_code do
    db_config = <<-EOF
    testing:    
      adapter: mysql
      encoding: utf8
      username: root
      password: 
      database: eason_testing
      host: localhost
    EOF
    
    put db_config, "#{release_path}/config/database.yml"
    
    #########################################################
    # Uncomment the following to symlink an uploads directory.
    # Just change the paths to whatever you need.
    #########################################################
    
    # desc "Symlink the upload directories"
    # task :before_symlink do
    #   run "mkdir -p #{shared_path}/uploads"
    #   run "ln -s #{shared_path}/uploads #{release_path}/public/uploads"
    # end
  
  end
end