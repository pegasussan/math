function desenha(base,nNumeros) {
	var bb = document.getElementById("blackboard");
	var cw = bb.width;
	var ch = bb.height;
	var raio = 100;
	var midX = 400;
	var midY = 300;
	var ctx = bb.getContext("2d");
	var coords = [];
	for (var i=0;i<nNumeros;i++) {
		var tx = 200 * Math.sin(2 * Math.PI / nNumeros * (i + 1)) + midX;
		var ty = 200 * Math.cos(2 * Math.PI / nNumeros * (i + 1)) + midY;
		coords.push([tx,ty]);
	}
	ctx.clearRect(0, 0, cw, ch);
	ctx.strokeStyle = '#'+cor;
	ctx.lineWidth = 1;
	//base circle
	if (base) {
		ctx.beginPath();
		ctx.arc(midX,midY,200,0,2*Math.PI);
		ctx.stroke();
	}
	//drawing circles
	function doThis(i) {
		setTimeout(function() {
			ctx.beginPath();
			ctx.arc(coords[i][0],coords[i][1],raio,0,2*Math.PI);
			ctx.stroke();
			if (i == nNumeros - 1) {
				$('#slow_motion').removeAttr('disabled');
				slow_motion = false;
			}
		},i*20+1);
	}
	for (var i=0;i<nNumeros;i++) {
		if (slow_motion) {
			doThis(i);
		} else {
			ctx.beginPath();
			ctx.arc(coords[i][0],coords[i][1],raio,0,2*Math.PI);
			ctx.stroke();
		}
	}
	return 'Done!';
}

var base_path = false;
var slow_motion = false;
var nNumeros = 100;
var cor = 'FFFF00';

$(function() {
	$('#nNumeros').val(nNumeros);
	desenha(base_path,nNumeros);
	
	$('#nNumeros').on('change', function() {
		if ($(this).val() > 3 && $(this).val() < 501) {
			nNumeros = $(this).val();
			desenha(base_path,nNumeros);
		}
		$(this).val(nNumeros);
	});
	
	$('#base_path').on('click',function() {
		if ($(this).is(':checked')) {
			base_path = true;
			desenha(base_path,nNumeros);
		} else {
			base_path = false;
			desenha(base_path,nNumeros);
		}
	});
	
	$('#slow_motion').on('click',function() {
		if (!slow_motion) {
			$(this).attr('disable',true);
			slow_motion = true;
			desenha(base_path,nNumeros);
		}
	});
	
	$('#cpick').ColorPicker({
		color: '#FFFF00',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('#cpick').css('background-color', '#' + hex);
			cor = hex;
			desenha(base_path,nNumeros);
		}
	});
});