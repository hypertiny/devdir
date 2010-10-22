o_O('FavoritesController', {
  create: function(){
    var link = $(this);
    f = Favorite.initialize();
    f.save({
      url: '/developers/' + link.attr('data-provider-id') + '/favorites',
      loading: function(){
        link.text('adding...')
      },
      success: function(){
        link.text('added!')
      }
    })
  },
  destroy: function(){
    var link = $(this);
    f = Favorite.initialize({id: link.attr('data-id')})
    f.destroy({
      loading: function(){
        link.text('removing...')
      },
      success: function(){
        link.text('removed!')
      }
    })
  }
})