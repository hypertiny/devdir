class AddFeaturedToProvider < ActiveRecord::Migration
  def self.up
    add_column :providers, :featured, :boolean, :default => false
    add_index :providers, :featured
  end

  def self.down
    remove_index :providers, :featured
    remove_column :providers, :featured

  end
end