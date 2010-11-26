// Path to the blank image must point to a valid location on your server
Ext.BLANK_IMAGE_URL = '/ext/resources/images/default/s.gif';

// Main application entry point
Ext.onReady(function() {
// write your application here
  function textarea_maxlength(e){
    var textarea = Ext.get(e.target)
    remaining = textarea.dom.attributes['data-count'].value - textarea.getValue().length
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
});