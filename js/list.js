var recuperarDenuncias = function() {

	var Post = Parse.Object.extend('Post');
	var query = new Parse.Query(Post);

	// query.equalTo("playerName", "Dan Stemkoski");

	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				aumentarListaDenuncias(results[i]);
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};

var aumentarListaDenuncias = function(denuncia) {
	var list = $('#posts_list');

	var newItem = $('<li>');

	var itemContent = denuncia.attributes.text;

	if (denuncia.attributes.image) {
		itemContent += ' <img class="image image--small" src="' + denuncia.attributes.image._url + '">';
	}

	newItem.html(itemContent);

	console.log(list);
	console.log(newItem);
	console.log(denuncia);
	console.log(denuncia.attributes.text);

	list.append(newItem);
};

$(document).on('ready', function() {
	recuperarDenuncias();
});