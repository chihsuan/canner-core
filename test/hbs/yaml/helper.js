module.exports= function (hbs) {
	hbs.registerHelper('agree_button', function() {
	  var emotion = hbs.escapeExpression(this.emotion),
	      name = hbs.escapeExpression(this.name);

	  return new hbs.SafeString(
	    "<button>I agree. I " + emotion + " " + name + "</button>"
	  );
	});
}