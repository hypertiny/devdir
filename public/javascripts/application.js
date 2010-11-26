$(document).ready(function(){
  
  $('.date').datepicker()
  
  $("div#sorting-endorsements ul").sortable({handle:'strong', cursor:'move', update:function(){
      $.post('/my/recommendations/sort', '_method=put&authenticity_token='+AUTH_TOKEN+'&'+$(this).sortable('serialize'), function(data){
        $('#recommendations-collection').html(data)
      })
    }
  })

})