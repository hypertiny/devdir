class AddAvatarFileNameToProvider < ActiveRecord::Migration
  def self.up
    add_column :providers, :avatar_file_name, :string

  end

  def self.down
    remove_column :providers, :avatar_file_name

  end
end
