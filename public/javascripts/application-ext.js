Ext.BLANK_IMAGE_URL = '/ext/resources/images/default/s.gif';

Ext.onReady(function() {
  
  Ext.select('input.confirm, input.delete').on('click', function(){
    return confirm(I18n.t('forms.confirm'));
  })

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