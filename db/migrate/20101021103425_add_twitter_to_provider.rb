class AddTwitterToProvider < ActiveRecord::Migration
  def self.up
    add_column :providers, :twitter, :string

  end

  def self.down
    remove_column :providers, :twitter

  end
end
