var search = document.getElementById( 'search' );
var clearSearch = document.getElementById( 'clearsearch' );
var results = document.getElementById( 'results' );
var languageSelection = document.getElementById( 'languageselection' );

initClearSearchLink();

function initClearSearchLink() {
	clearSearch.setAttribute( 'title','Clear' );
	clearSearch.addEventListener( 'mousedown', clearSearchBox, true );
	search.addEventListener( 'keyup', _handleClearSearchLink, false );
}

function navigateToLanguageSelection() {
	var url;
	if ( languageSelection ) {
		url = languageSelection.options[languageSelection.selectedIndex].value;
		if ( url ) {
			location.href = url;
		}
	}
}

function _handleClearSearchLink() {
	if ( clearSearch ) {
		if ( search.value.length > 0 ) {
			clearSearch.style.display = 'block';
		} else {
			clearSearch.style.display = 'none';
			if ( results ) {
				results.style.display = 'none';
			}
		}
	}
}

function clearSearchBox( event ) {
	search.value = '';
	clearSearch.style.display = 'none';
	if ( results ) {
		results.style.display = 'none';
	}
	if ( event ) {
		event.preventDefault();
	}
}

// I don't think this makes sense. Loading this here means that this button
// won't function until the page is loaded. It would probably be an
// improvement to just attach an onclick straight into the html.
document.getElementById( 'logo' ).onclick = function() {
	var n = document.getElementById( 'nav' ).style;
	n.display = n.display == 'block' ? 'none' : 'block';
	if (n.display == 'block') {
		if ( languageSelection ) {
			if ( languageSelection.offsetWidth > 175 ) {
				var newWidth = languageSelection.offsetWidth + 30;
				n.width = newWidth + 'px';
			}
		}
	}
};

// Also problematic, not working until the page loads...
for( var h = document.getElementsByTagName( 'h2' ), i = 0; i < h.length; i++ ) {
	if ( h[i].className == 'section_heading' ) {
		h[i].onclick = function() {
			var section_idx = parseInt( this.id.replace( /section_(\d+)/, '$1' ) );
			wm_toggle_section( section_idx );
		}
	}
};

// And this...
for ( var a = document.getElementsByTagName( 'a' ), i = 0; i < a.length; i++ ) {
	a[i].onclick = function() {
		if ( this.hash.indexOf( '#' ) == 0 ) {
			wm_reveal_for_hash( this.hash );
		}
	}
};

if ( document.location.hash.indexOf( '#' ) == 0 ) {
	wm_reveal_for_hash( document.location.hash );
}

updateOrientation();

// Try to scroll and hide URL bar
window.scrollTo( 0, 1 );

/**
 * updateOrientation checks the current orientation, sets the body's class
 * attribute to portrait, landscapeLeft, or landscapeRight,
 * and displays a descriptive message on "Handling iPhone or iPod touch Orientation Events".
 */
function updateOrientation() {
	switch( window.orientation ) {
		case 0:
			document.body.setAttribute( 'class', 'portrait' );
			break;
		case 90:
		case -90:
			document.body.setAttribute( 'class', 'landscape' );
  }
}

// Point to the updateOrientation function when iPhone switches between portrait and landscape modes.
window.onorientationchange = updateOrientation;

function wm_reveal_for_hash( hash ) {
	var targetel = document.getElementById( hash.substr(1) );
	if ( targetel ) {
		for (var p = targetel.parentNode; p && p.className != 'content_block' && p.className != 'section_heading'; ) {
			p = p.parentNode;
		}
		if ( p && p.style.display != 'block' ) {
			var section_idx = parseInt( p.id.split( '_' )[1] );
			wm_toggle_section( section_idx );
		}
	}
}

function wm_toggle_section( section_id ) {
	var b = document.getElementById( 'section_' + section_id ),
		bb = b.getElementsByTagName( 'button' );
	for ( var i = 0; i <= 1; i++ ) {
		var s = bb[i].style;
		s.display = s.display == 'none' || ( i && !s.display ) ? 'inline-block' : 'none';
	}
	for ( var i = 0, d = ['content_','anchor_']; i<=1; i++ ) {
		var s = document.getElementById( d[i] + section_id ).style;
		s.display = s.display == 'block' ? 'none' : 'block';
	}
}