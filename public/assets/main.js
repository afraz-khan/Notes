$(document).ready(function(){
    
    var add_btn = $('#plus');
    var add_notification = $('#add_notf');


    // add notification
    add_btn.click(function(e){
        e.preventDefault();
        
        add_notification.show('slow',function(){
            setTimeout(function(){
                add_notification.hide('slow',function(){
                    return 0
                })
            },2000)
            
        })
    })


})
