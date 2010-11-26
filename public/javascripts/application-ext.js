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
  
});