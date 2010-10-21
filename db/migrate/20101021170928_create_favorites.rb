class CreateFavorites < ActiveRecord::Migration
  def self.up
    create_table :favorites do |t|

      t.string :session_id

      t.integer :provider_id


      t.timestamps

    end
    
    add_index :favorites, [:session_id, :provider_id], :unique => true
  end

  def self.down
    remove_index :favorites, :column => [:session_id, :provider_id]
    drop_table :favorites
  end
end