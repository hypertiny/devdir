class FavoritesController < ApplicationController

  def index
    @providers = @favorites.collect { |f| f.provider }
  end

  def new
    @provider = Provider.find(params[:provider_id])
    @favorite = @provider.favorites.new
  end
  
  def create
    @provider = Provider.find(params[:provider_id])
    @favorite = @provider.favorites.create(params[:favorite])
    @favorite.session_id = session.session_id
    flash[:notice] = "#{@provider.company_name} was added to your favorites."
    redirect_to @provider
  end
end
