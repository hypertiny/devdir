class RenameSlugToCachedSlug < ActiveRecord::Migration
  def self.up
    rename_column :providers, :slug, :cached_slug
  end

  def self.down
    rename_column :providers, :cached_slug, :slug
  end
end