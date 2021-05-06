$('#add_user').submit(function(event){
    alert("Data Inserted Succesfully");
})
$('#update_user').submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {};
    var n;
    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value'];
    })

    var request = {
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }
    $.ajax(request).done(function(response){
        alert("Data Updated Succesfully");
    })
})

if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE"
        }  
        if(confirm("Really Want to Delete the Record ??")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Succesfully");
                location.reload();
            })
        }      
    })
}