class Favorite < ActiveRecord::Base
  belongs_to :provider
  validates_uniqueness_of :provider_id, :scope => :session_id
end
