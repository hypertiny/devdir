class PortfolioItemsController < ApplicationController

  before_filter :find_provider

  def index
    @portfolio_items = @provider.portfolio_items.paginate(:page => params[:page])
  end

  private

  def find_provider
    @provider = Provider.find(params[:provider_id])
  end

end
