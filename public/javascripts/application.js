$(document).ready(function(){
  $('input.confirm').click(function(){
    return confirm(I18n.t('forms.confirm'));
  })
  
  function textarea_maxlength(){
    remaining = $(this).attr('data-count') - $(this).val().length
    $('em.number').text(remaining + '')
    if(remaining >= 0)
    {
        $('.number').removeClass('over-limit')
    }
    else
    {
      $('.number').addClass('over-limit')
    }
  }
  
  $('textarea[data-count]').keyup(textarea_maxlength)
  $('textarea[data-count]').change(textarea_maxlength)
  
  $('input#next').click(function(){
    if($('input[type=checkbox][checked]').length > 3)
    {
      alert(I18n.t('rfp.three_provider_max'))
      return false
    }
  })
  
  $('.date').datepicker()
  
  $('a.tooltip').tooltip({showURL: false})
  
  $('input#country-US, label[for=country-US]').click(function(){
    if($('input#country-US').is(':checked'))
    {
      $('input#country-US').parents('li').find('li input[type=checkbox]').attr('checked', true)
    }
    else
    {
      $('input#country-US').parents('li').find('li input[type=checkbox]').attr('checked', false)
    }
  })
  
  $('ul.location input').each(function(){
    if($(this).attr('id') != 'everywhere')
    {
      $(this).attr('disabled', true)
    }
  })
  
  $('input#everywhere, li.everywhere label').click(function(){
    if($('input#everywhere').is(':checked'))
    {
      $('ul.location input').attr('checked', 'true').attr('disabled', true)
      $('input#everywhere').attr('checked', true).attr('disabled', false)
    }
    else
    {
      $('ul.location input').attr('checked', false).attr('disabled', false)
    }
  })
  
  $('ul.states li input, ul.states li label').click(function(){
    if($('ul.states li input[type=checkbox]:checked').length == 0)
    {
      $('input#country-US').attr('checked', false)
    }
    else
    {
      $('input#country-US').attr('checked', true)
    }
  })
  
  $('form#search-form').submit(function(){
    if($.trim($('input[name=budget]').val()) == '')
    {
      alert(I18n.t('home.enter_budget'))
      return false
    }
  })
  
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
  
  function linkify(text){
      if (text) {
          text = text.replace(
              /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
              function(url){
                  var full_url = url;
                  if (!full_url.match('^https?:\/\/')) {
                      full_url = 'http://' + full_url;
                  }
                  return '<a href="' + full_url + '">' + url + '</a>';
              }
          );
      }
      return text;
  }

  $(function(){
    $('ul.tweet-list').each(function(){
      var ul = $(this);
      var twitter_username = ul.attr('data-username');
      $.jTwitter(twitter_username, 3, function(posts){
        for(var i=0; i<posts.length; i++){
          ul.append('<li class="tweet-item">'  + linkify(posts[i].text) +  '</li>');
        }
        return false;
      });
      return false;
    })

  });
  
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

var RecaptchaOptions = {
  theme : 'clean'
};