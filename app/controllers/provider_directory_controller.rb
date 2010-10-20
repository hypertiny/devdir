class ProviderDirectoryController < ApplicationController
  
  def show
    @homepage = Homepage.first
    @page_url = 'home'
    @page = Page.find_by_url(@page_url)
    @page_content = @page
    render 'home/show'
  end
  
end
