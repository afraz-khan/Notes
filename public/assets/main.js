$(document).ready(function(){
    
    var add_btn = $('#plus');
    var add_notification = $('#add_notf');
    
    // add notification
    add_btn.click(function(e){
        e.preventDefault();

        var add_txt = $('#add_text').val()
        var note = {note:add_txt}
        $.ajax({
            type:'post',
            url:'addNote/',
            data:note,
            success:function(data){
                if(data.msg[0] != 'error'){
                    var id = data.msg[0]._id;
                    var note2 = data.msg[0].note;
                    console.log(note2)
                add_notification.show('slow',function(){
                    setTimeout(function(){
                        add_notification.hide('slow',function(){
                            $('#add_text').val(" ")
                             var item = '<li id='+id+  " class='list-group-item'><input type='text' class='form-control' value='"+note2+"' /><a href='#'' style='float:right;color:green' >Update</a> <span style='float:right' >|</span> <a style='float:right;color: firebrick;margin-left: 30px' href='#' >Delete</a></li>"
                      
                            // add new item to list
                             $('#notelist').prepend(item)
                            })
                    },2000)
                
                    
                })
            }
            }
        })
        
        
    })

    var search_btn = $('#search');
    var search_notification = $('#not_notf');

    // // search notification
    
    search_btn.click(function(){

        
        var value = {value:$('#search_txt').val()}

        $.ajax({
            type:'post',
            url:'/searchnote',
            data : value,
            success:function(data){
                var count = parseInt(data.msg)
                if(count==0){
                    search_notification.show('slow',function(){
                        setTimeout(function(){
                            search_notification.hide('slow',function(){
                                return 0
                                })
                        },2000)
                    
                        
                    })  
                }
                else{
                    var record ="records contain"
                    if(count == 1){
                        record = 'record contains'
                    }

                    var check = '<i class="fa fa-check"' +'style="color: green;padding-right:5px"></i>'+count.toString()+ " "+record+" above note"
                    search_notification.html(check)
                    search_notification.show('slow',function(){
                        setTimeout(function(){
                            search_notification.hide('slow',function(){
                                var cross = '<i class="fa fa-times"' +'style="color: red;padding-right:5px"></i>( Not found )'
                                search_notification.html(cross)
                                })
                        },2000)
                    
                        
                    })  
                }
            }
        })
    })
    





})
