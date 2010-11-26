Ext.BLANK_IMAGE_URL = '/ext/resources/images/default/s.gif';

Ext.onReady(function() {
  
  Ext.QuickTips.init();
  
  Ext.select('input.confirm, input.delete').on('click', function(){
    return confirm(I18n.t('forms.confirm'));
  })

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
  
  new Ext.ToolTip({
       target: 'confirmed-explanation',
       html: I18n.t('provider.confirmed_explanation')
   });
  
  
  
});