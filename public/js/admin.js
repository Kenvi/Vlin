$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var delUrl = $(this).attr('data-class');
		var tr = $('.item-id-' + id);

		$.ajax({
			type : 'DELETE',
			url : '/admin/' + delUrl + '/list?id=' + id
		})
		.done(function(results){
			if(results.success === 1){
				alert('删除成功！');

				if(tr.length > 0){
					tr.remove();
				}
			}
		})
	});


});