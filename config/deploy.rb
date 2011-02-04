set :stages, %w(staging testing production)
set :default_stage, "production"
require 'capistrano/ext/multistage'
require "bundler/capistrano"

default_run_options[:pty] = true

set :scm, :git

set :scm_passphrase, ""

set :application, "devdir"
set :scm, :git # using git capistrano 2.2 required
set :repository, "git@github.com:hypertiny/devdir.git"
set :deploy_to, "/var/www/hypertiny/#{application}"
set :deploy_via, :remote_cache

set :user, "paulca"
set :group, "paulca"

set :use_sudo, false

set :mongrel_conf, "#{deploy_to}/current/config/mongrel_cluster.yml"

# run this the first time
#after "deploy:setup", "deploy:create_id_rsa"
after "deploy:update_code", "deploy:database_config"

namespace :deploy do

  desc "Restarting mod_rails with restart.txt"
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "touch #{current_path}/tmp/restart.txt"
  end

  desc "Restarting mod_rails with restart.txt"
  task :start, :roles => :app, :except => { :no_release => true } do
    run "touch #{current_path}/tmp/restart.txt"
  end

  desc "Migrate the database"
  task :migrate, :roles => :app, :except => {:no_release => true} do
    run "cd #{current_path}; bundle exec rake RAILS_ENV=production db:migrate"
  end

  desc "Load the initial database"
  task :load_schema, :roles => :app, :except => {:no_release => true} do
    run "cd #{current_path}; bundle exec rake RAILS_ENV=production db:schema:load"
  end

  # desc "link nginx to the app"
  # task :link_nginx, :roles => :app do
  #   run "if [ -f /usr/local/nginx/conf/nginx.conf ]; then sudo unlink /usr/local/nginx/conf/nginx.conf; fi;"
  #   run "sudo ln -s #{current_path}/doc/nginx.conf /usr/local/nginx/conf/"
  #   run "sudo /etc/init.d/nginx restart"
  # end

  desc "Install gems"
  task :bundle_install, :roles => :app do
    run "cd  #{current_path} && bundle install --deployment"
  end

  desc "Create the database yaml file"
  task :database_config do
    db_config = <<-EOF
production:
  adapter: mysql
  encoding: utf8
  username: hypertiny
  password: 6ZmhmpPBjuEcbTKv
  database: hypertiny
  host: 'sencha1.c59pnykg7amm.us-east-1.rds.amazonaws.com'

    EOF

    put db_config, "#{release_path}/config/database.yml"
  end


end

# namespace :deploy do
#   namespace :ts do
#     desc "Set up the Thinking Sphinx shared config directory"
#     task :setup, :roles => :app do
#       run "mkdir -p #{deploy_to}/shared/config"
#       run "mkdir -p #{deploy_to}/shared/sphinx"
#     end
#   end
# end
#
# namespace :deploy do
#   namespace :ts do
#
#     desc "Run the Sphinx indexer"
#     task :index, :roles => :app do
#       run "cd #{current_path} && RAILS_ENV=production rake ts:index"
#     end
#
#     desc "Start the Sphinx Server"
#     task :start, :roles => :app do
#       run "cd #{current_path} && RAILS_ENV=production rake ts:start"
#     end
#
#     desc "Stop the Sphinx Server"
#     task :stop, :roles => :app do
#       run "cd #{current_path} && RAILS_ENV=production rake ts:stop"
#     end
#
#     desc "Restart the Sphinx Server"
#     task :restart, :roles => :app do
#       run "cd #{current_path} && RAILS_ENV=production rake ts:restart"
#     end
#
#     desc "Stop the Sphinx server, run the indexer, then start the server again"
#     task :refresh, :roles => :app do
#       run "cd #{current_path} && RAILS_ENV=production rake ts:stop && RAILS_ENV=production rake ts:index && RAILS_ENV=production rake ts:start"
#     end
#   end
# end
