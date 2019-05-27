$(document).ready(function(){
    
    var add_btn = $('#plus');
    var add_notification = $('#add_notf');
    var update_btns = $('#notelist li #update_btn');
    var delete_btn = $('#notelist li #delete_btn');

    // insert notification
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
                            
                            var notecount = parseInt( $("#notecount").text());
                            var item = "<li id="+id+" class='list-group-item'> <span style='font-size:13px;font-weight: bold' >"+(1).toString()+
                            "-</span> <input type='text' class='form-control' value='"+note2+"'/>"+
                            "<a id='update_btn' style='cursor:pointer;float:right;color:green' >Update</a> <span style='float:right' >|</span>"+
                             "<a id='delete_btn' style='cursor:pointer;float:right;color: firebrick;margin-left: 30px' >Delete</a></li>"
                      
                            // add new item to list
                             $('#notelist').prepend(item)
                             $("#notecount").text(++notecount)

                             var ul = document.getElementById('notelist')
                             var ul_child = ul.children
                             var li = ul_child[0]
                             var li_nxt = li.nextElementSibling;
                             while(li_nxt){
                                 var children = li_nxt.children;
                                 var str = children[0].innerText;
                                 var num = parseInt(str.split('-')[0])
                                 num = num +1;
                                 children[0].innerText = (num).toString()+"-"; 
                                 li_nxt = li_nxt.nextElementSibling
                             }
                            
                            
                             // binding update & delete events to newly added elements
                            update_btns = $('#notelist li #update_btn');
                            delete_btn = $('#notelist li #delete_btn');


                                $.each(update_btns,function(i,val){
                                        
                                    val.onclick = function(){
                                        var li = val.parentElement;
                                        var input = val.previousElementSibling.value;
                                        var note = {id: li.getAttribute('id'),text:input};
                                        $.ajax({
                                            type:'put',
                                            url:'/updatenote',
                                            data:note,
                                            success:function(Data){
                                                $('#success_alert').show('slow',function(){
                                                setTimeout(function(){
                                                    $('#success_alert').hide()
                                                },3000)
                                                })
                                            }
                                        })
                                    }
                                })


                                // delete a note

                                $.each(delete_btn,function(i,val){
                                    val.onclick = function(){
                                        var li = val.parentElement;
                                        var note = {id:li.getAttribute('id')}

                                        $.ajax({
                                            type:'delete',
                                            url:'/deletenote',
                                            data:note,
                                            success:function(Data){
                                                
                                                var ul = li.parentElement;
                                                var li_nxt = li.nextElementSibling;
                                                while(li_nxt){
                                                    var children = li_nxt.children;
                                                    var str = children[0].innerText;
                                                    var num = parseInt(str.split('-')[0])
                                                    num = num -1;
                                                    children[0].innerText = (num).toString()+"-"; 
                                                    li_nxt = li_nxt.nextElementSibling
                                                }
                                                ul.removeChild(li)
                                                var notecount = parseInt( $("#notecount").text());
                                                $("#notecount").text(notecount=notecount-1)
                                                $('#del_success_alert').show('slow',function(){
                                                    setTimeout(function(){
                                                        $('#del_success_alert').hide()
                                                    },3000)
                                                    })

                                            }
                                        })
                                    }
                                })
                             
                            })
                    },1000)
                
                    
                })
            }
            }
        })
        
        
    })

    var search_btn = $('#search');
    var search_notification = $('#not_notf');

    //search notification
    search_btn.click(function(){

        
        var value = {value:$('#search_txt').val()}

        $.ajax({
            type:'post',
            url:'/searchnote',
            data : value,
            success:function(data){
                var count = parseInt(data.msg)

                // if no note found
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

                    // if note exists
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
    

    // update a note

    $.each(update_btns,function(i,val){
            
        val.onclick = function(){
            var li = val.parentElement;
            var input = val.previousElementSibling.value;
            var note = {id: li.getAttribute('id'),text:input};
            $.ajax({
                type:'put',
                url:'/updatenote',
                data:note,
                success:function(Data){
                    $('#success_alert').show('slow',function(){
                    setTimeout(function(){
                        $('#success_alert').hide()
                    },3000)
                    })
                }
            })
        }
    })


    // delete a note

    $.each(delete_btn,function(i,val){
        val.onclick = function(){
            var li = val.parentElement;
            var note = {id:li.getAttribute('id')}

            $.ajax({
                type:'delete',
                url:'/deletenote',
                data:note,
                success:function(Data){
                    
                    var ul = li.parentElement;
                    var li_nxt = li.nextElementSibling;
                    while(li_nxt){
                        var children = li_nxt.children;
                        var str = children[0].innerText;
                        var num = parseInt(str.split('-')[0])
                        num = num -1;
                        children[0].innerText = (num).toString()+"-"; 
                        li_nxt = li_nxt.nextElementSibling
                    }
                    ul.removeChild(li)
                    var notecount = parseInt( $("#notecount").text());
                    $("#notecount").text(notecount=notecount-1)
                    $('#del_success_alert').show('slow',function(){
                        setTimeout(function(){
                            $('#del_success_alert').hide()
                        },3000)
                        })

                }
            })
        }
    })

})
