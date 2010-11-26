$(document).ready(function(){
  
  $('.date').datepicker()
  
  $('a.sort-endorsements').click(function(){
    if($('div#sorting-endorsements').is(':hidden'))
    {
      $('div#sorting-endorsements').show()
      $('div#non-sorting-endorsements').hide()
      $(this).html(I18n.t('provider.done_sorting'))
    }
    else
    {
      $('div#sorting-endorsements').hide()
      $('div#non-sorting-endorsements').show()
      $(this).html(I18n.t('provider.sort_endorsements'))
    }
    return false
  })
  
  $("div#sorting-endorsements ul").sortable({handle:'strong', cursor:'move', update:function(){
      $.post('/my/recommendations/sort', '_method=put&authenticity_token='+AUTH_TOKEN+'&'+$(this).sortable('serialize'), function(data){
        $('#recommendations-collection').html(data)
      })
    }
  })
  
  $("div#sorting-endorsements").hide()
  
  $('ul.search-details').click(function(){
    h3 = $(this).prev('h3:first');
    if(h3.attr('data-original-value') === void(0))
    {
      h3.attr('data-original-value', h3.text())
    }
    var selected_items = [];
    $(this).find('input:checked').each(function(){
      selected_items.push($('label[for=' + $(this).attr('id') + ']').text())
    })
    if(selected_items.length === 0)
    {
      h3.text(h3.attr('data-original-value'));
    }
    else
    {
      h3.text($.string(selected_items.join(', ')).truncate(20).str);
    }
  })
})

$('.search-option').click(function(){
  $(this).find('.search-details').toggleClass('clicked')
})

$('body').click(function(e){
  if($(e.target).parents('.search-option').length === 0)
  {
    $('.search-details').removeClass('clicked')
  }
})

var RecaptchaOptions = {
  theme : 'clean'
};