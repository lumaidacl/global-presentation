
var allowedFileExtensions = [
	'jpg',
	'png',
	'gif',
	'jpeg',
];

var crearDenuncia = function() {

	var textoDenuncia = $('#denuncia_text_input').val();

	if (textoDenuncia === '') {
		return;
	}

	var fileUploadControl = $('#denuncia_image_input')[0];

	// Verificar si hay un archivo
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];

		var fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
		fileExtension = fileExtension.toLowerCase();

		if (allowedFileExtensions.indexOf(fileExtension) < 0) {
			alert('Ese tipo de archivo no está permitido! Por favor, asegúrate de subir un archivo de imagen.');
			return;
		}

		var parseFile = new Parse.File(file.name, file);
		parseFile.save().then(function(file) {

			// Una vez subido el archivo, guardar la denuncia
			crearDenunciaFin(textoDenuncia, file);

		}, function(error) {
			alert('Lo siento, ocurrió un error al subir la imagen!');
		});

	} else {
		// Crear la denuncia sin imagen
		crearDenunciaFin(textoDenuncia);
	}

};

var crearDenunciaFin = function(textoDenuncia, image) {

	var nuevaDenuncia = {
		text: textoDenuncia
	};

	if (image) {
		nuevaDenuncia.image = image;
	}

	var Post = Parse.Object.extend('Post');
	var nuevaDenunciaParse = new Post();

	nuevaDenunciaParse.save(nuevaDenuncia).then(function(object) {
		// Limpiar los campos después de crear una denuncia
		$('#denuncia_text_input').val('');
		var fileUploadControl = $('#denuncia_image_input');
		fileUploadControl.replaceWith($('#denuncia_text_input').val('').clone(true));

		alert('Tu denuncia creada, gracias por ayudarnos a limpiar la ciudad!');
	});
};


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

	var newItem = $('li');

	newItem.html(denuncia.text);

	list.append(newItem);
};
