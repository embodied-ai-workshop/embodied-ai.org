$(function() {
	// change the url on header click
	$('h2').click(function() {moveToHeader(this);});
	$('#headerOptions li').click(function() {moveToHeader(this);})

	$('#click').click(function() {
		if ($('#headerOptions').css('display') === 'none') {
			$('#headerOptions').css('display', 'block');
			$('#click').css('transform', 'rotate(-90deg)');
			
		} else {
			$('#headerOptions').css('display', 'none');
			$('#click').css('transform', 'rotate(0deg)');
		}
	});

	$(window).scroll(function() {updateHeader();});
	$(window).resize(function() {updateHeader();});
});

function updateHeader() {
	if ($(window).width() < 1300) {
		if ($('#headerOptions').css('display') !== 'none') {
			$('#headerOptions').css('display', 'none');
			$('#click').css('transform', 'rotate(0deg)');
		}
	} else {
		$('#headerOptions').css('display', 'block');
		$('#click').css('transform', 'rotate(0deg)');
	}
}

function idFromText(text) {
	return text.replace(/ /g, "_").toLowerCase();
}

function moveToHeader(element) {
	var id = idFromText($(element).text());
	window.location.replace(window.location.origin + window.location.pathname + '#' + id);

	// scroll up a little since the header covers the text
	$('html, body').scrollTop($('html, body').scrollTop() - 80);
}