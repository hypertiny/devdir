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
    respond_to do |format|
      format.html { redirect_to @provider }
      format.js { render :json => @favorite }
    end
  end
  
  def destroy
    @favorite = Favorite.find_by_session_id_and_id(session.session_id, params[:id])
    respond_to do |format|
      format.html { redirect_to @favorite.provider }
      format.js { render :json => @favorite }
    end
  end
end
