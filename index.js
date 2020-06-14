
// CVPR inner link -> YouTube video link
var relinks = {
	'#eai2020thor': 'https://www.youtube.com/watch?v=5GXNvrVHByo&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM',
	'#eai2020gibson': 'https://www.youtube.com/watch?v=0BvUSjcc0jw&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM',
	'#eai2020habitat': 'https://www.youtube.com/watch?v=YK71Uu7T9gM&list=PL4XI7L9Xv5fVUMEb1eYOaH8y1b6j8xiMM',
	'#eai2020alison': 'https://www.youtube.com/watch?v=ZLIH9GPvS-8&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020linda': 'https://www.youtube.com/watch?v=dxli8qWJHLU&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020alex': 'https://www.youtube.com/watch?v=u5ayFwhLzfY&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'eai2020piotr': 'https://www.youtube.com/watch?v=mwjlRJeo3Ik&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020dieter': 'https://www.youtube.com/watch?v=LJNFzE-VmzI&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020franziska': 'https://www.youtube.com/watch?v=UpjXMmZtxvY&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020judy': 'https://www.youtube.com/watch?v=eNcMHOTpWJA&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020sonia': 'https://www.youtube.com/watch?v=1DPXcXWBfsI&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020heidi': 'https://www.youtube.com/watch?v=LOImoR7gZB8&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#eai2020rishabh': 'https://www.youtube.com/watch?v=3SoCElGefik&list=PL4XI7L9Xv5fX2nIAx8-ldtgaRh5u2yObq',
	'#organizers-live-session': 'https://embodied-ai.org/#(new)_live_sessions',
	'#speakers-live-session': 'https://embodied-ai.org/#livesess2',
}

$(function() {
	// enable redirects from other sites (e.g., CVPR internal)
	var path = window.location.hash.toLowerCase();
	// check if path in the set of relinks
	if (path in relinks) {
		// relink
		window.location.href = relinks[path];
	}

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

