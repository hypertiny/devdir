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
  