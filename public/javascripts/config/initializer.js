// This is a very handy place to put any initial logic
// For example, choosing your adapter

o_O.model.adapter = o_O.rest;
o_O.config.authenticity_token = AUTH_TOKEN;
o_O.config.template_path = '/javascripts/app/views';

jQuery.ajaxSetup({ 
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept",
    "text/javascript")} 
})
