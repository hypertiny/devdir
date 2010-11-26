Ext.BLANK_IMAGE_URL = '/ext/resources/images/default/s.gif';

Ext.onReady(function() {
  
  Ext.QuickTips.init();
  
  // confirm dialog for deletes
  Ext.select('input.confirm, input.delete').on('click', function(){
    return confirm(I18n.t('forms.confirm'));
  })

  // only allow N characters in the company description
  function textarea_maxlength(e){
    var textarea = Ext.get(e.target)
    remaining = textarea.getAttribute('data-count') - textarea.getValue().length
    console.log(remaining)
    Ext.select('em.number').update(remaining + '')
    if(remaining >= 0)
    {
        Ext.select('.number').removeClass('over-limit')
    }
    else
    {
      Ext.select('.number').addClass('over-limit')
    }
  }
  
  Ext.select('textarea[data-count]').on('keyup',textarea_maxlength)
  Ext.select('textarea[data-count]').on('change',textarea_maxlength)
  
  // before submitting an enquiry, check if devs have been checked
  // and only allow a max of 3
  if(Ext.get('next'))
  {
    Ext.get('next').on('click', function(){
      if(Ext.select('input[type=checkbox]:checked').elements.length === 0)
      {
        alert("Please choose at least one developer")
        return false
      }
      if(Ext.select('input[type=checkbox]:checked').elements.length > 3)
      {
        alert(I18n.t('rfp.three_provider_max'))
        return false
      }
    })
  }
  
  // Tooltip on providers#search
  new Ext.ToolTip({
       target: 'confirmed-explanation',
       html: I18n.t('provider.confirmed_explanation')
   });
  
  // convert URLs in string to A tags
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
  
  // display tweets as appropriate
  if(Ext.get('tweet-list'))
  {
    var display_tweets = function(){
      ul = Ext.get('tweet-list')
      var twitter_username = ul.getAttribute('data-username');
      var url = "http://twitter.com/status/user_timeline/"  + twitter_username + ".json";
        function display_tweets(tweets){
          Ext.each(tweets, function(tweet){
            li = new Ext.Element(document.createElement('li'))
            li.addClass('tweet-item')
            li.update(linkify(tweet.text))
            ul.appendChild(li);
          })
          return false;
        }
        Ext.ux.JSONP.request(url, {
            callbackKey: 'callback',
            params: {
                format: 'json',
                count: '3'                 
            },
            callback: display_tweets
        });
    }();
  }
  
  // set the text of the select boxes depending on the selected items
  var update_select_boxes = function(){
    h3 = Ext.get(this).prev('h3');
    if(h3.getAttribute('data-original-value') === void(0))
    {
      h3.set({'data-original-value': h3.innerHTML})
    }
    var selected_items = [];
    Ext.get(this).select('input:checked').each(function(element){
      if(Ext.select('label[for=' + Ext.get(element).getAttribute('id') + ']').elements.length > 0)
      {
        var item = Ext.select('label[for=' + Ext.get(element).getAttribute('id') + ']').elements[0].innerHTML
        selected_items.push(item)
      }
    })
    if(selected_items.length === 0)
    {
      h3.update(h3.getAttribute('data-original-value'));
    }
    else
    {
      var out = Ext.util.Format.trim(selected_items.join(', '))
      h3.update(Ext.util.Format.ellipsis(out, 20));
    }
  }
  
  // dropdowns for searching
  Ext.select('ul.search-details').on('click', update_select_boxes)
  
  Ext.select('ul.search-details').each(function(element){
    update_select_boxes.apply(element)
  })
  
  // drop down the search options when the list is clicked
  Ext.select('li.search-option').on('click', function(e){
    Ext.get(this).select('.search-details').toggleClass('clicked')
  })
  
  // hide the select boxes when clicked outside
  Ext.select('body').on('click', function(e){
    if(!Ext.get(e.target).findParent('.search-option'))
    {
      Ext.select('.search-details').removeClass('clicked')
    }
  })
  
  if(Ext.get('sorting-endorsements'))
  {
    // hide the sorting endorsements list
    Ext.get("sorting-endorsements").hide()

    Ext.select('a.sort-endorsements').on('click',function(){
      if(Ext.get('sorting-endorsements').isVisible())
      {
        Ext.get('sorting-endorsements').hide()
        Ext.get('non-sorting-endorsements').show()
        Ext.get(this).update(I18n.t('provider.sort_endorsements'))
      }
      else
      {
        Ext.get('sorting-endorsements').show()
        Ext.get('non-sorting-endorsements').hide()
        Ext.get(this).update(I18n.t('provider.done_sorting'))
      }
      return false
    })
  }
  
});

// set the recaptcha theme to a basic white one
var RecaptchaOptions = {
  theme : 'clean'
};