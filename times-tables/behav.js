//cores, contornos, modo arco-iris
function desenha(tabuada,nNumeros) {
	var bb = document.getElementById("blackboard");
	var cw = bb.width;
	var ch = bb.height;
	var raio = 250;
	var midX = 400;
	var midY = 300;
	var ctx = bb.getContext("2d");
	var coords = [];
	var coords2 = [];
	var coords3 = [];
	for (var i=0;i<nNumeros;i++) {
		var tx = 250 * Math.sin(2 * Math.PI / nNumeros * (i + 1)) + 400;
		var ty = 250 * Math.cos(2 * Math.PI / nNumeros * (i + 1)) + 300;
		var ctemp = [tx,ty];
		coords.push(ctemp);
		var tx2 = 254 * Math.sin(2 * Math.PI / nNumeros * (i + 1)) + 400;
		var ty2 = 254 * Math.cos(2 * Math.PI / nNumeros * (i + 1)) + 300;
		var ctemp2 = [tx2,ty2];
		coords2.push(ctemp2);
		var tx3 = 268 * Math.sin(2 * Math.PI / nNumeros * (i + 1)) + 400;
		var ty3 = 268 * Math.cos(2 * Math.PI / nNumeros * (i + 1)) + 300;
		var ctemp3 = [tx3,ty3];
		coords3.push(ctemp3);
	}
	ctx.clearRect(0, 0, cw, ch);
	ctx.strokeStyle = '#'+cor;
	ctx.lineWidth = 1;
	ctx.font = "10px Courier";
	ctx.fillStyle = '#'+cor;
	ctx.beginPath();
	//inner circle
	ctx.arc(midX,midY,raio,0,2*Math.PI);
	//outer circle
	ctx.arc(midX,midY,raio + 4,0,2*Math.PI);
	//dots
	for (var i=0;i<nNumeros;i++) {
		ctx.moveTo(coords2[i][0], coords2[i][1]);
		ctx.lineTo(coords[i][0], coords[i][1]);
	}
	//numbers
	if (nNumeros <= 40) {
		for (var i=0;i<nNumeros;i++) {
			ctx.fillText(i,coords3[i][0] - 7, coords3[i][1] + 4);
		}
	} else {
		var nDiv = parseInt(nNumeros / 20);
		for (var i=0;i<nNumeros;i++) {
			if (i%nDiv == 0) {
				ctx.fillText(i,coords3[i][0] - 6, coords3[i][1] + 3);
			}
		}
	}
	ctx.stroke();
	//drawing
	function doThis(i) {
		setTimeout(function() {
			var indice = 0;
			indice = tabuada * i;
			while (indice > nNumeros) {
				indice -= nNumeros;
			}
			if (indice == nNumeros) indice = 0;
			ctx.beginPath();
			ctx.moveTo(coords[i][0], coords[i][1]);
			ctx.lineTo(coords[indice][0], coords[indice][1]);
			ctx.stroke();
			if (i == nNumeros - 1) {
				$('#slow_motion').removeAttr('disabled');
				slow_motion = false;
			}
		},i*(6000 / nNumeros)+1);
	}
	for (var i=0;i<nNumeros;i++) {
		if (slow_motion) {
			doThis(i);
		} else {
			var indice = 0;
			indice = tabuada * i;
			while (indice > nNumeros) {
				indice -= nNumeros;
			}
			if (indice == nNumeros) indice = 0;
			ctx.beginPath();
			ctx.moveTo(coords[i][0], coords[i][1]);
			ctx.lineTo(coords[indice][0], coords[indice][1]);
			ctx.stroke();
		}
	}
	return 'Done!';
}

var tabuada = 2;
var slow_motion = false;
var nNumeros = 100;
var cor = 'FFFF00';

$(function() {
	$('#tabuada').val(tabuada);
	$('#nNumeros').val(nNumeros);
	desenha(tabuada,nNumeros);
	
	$('#tabuada').on('change', function() {
		if ($(this).val() > 1 && $(this).val() < 100) {
			tabuada = $(this).val();
			desenha(tabuada,nNumeros);
		}
		$(this).val(tabuada);
	});
	
	$('#nNumeros').on('change', function() {
		if ($(this).val() > 9 && $(this).val() < 500) {
			nNumeros = $(this).val();
			desenha(tabuada,nNumeros);
		}
		$(this).val(nNumeros);
	});
	
	$('#slow_motion').on('click',function() {
		if (!slow_motion) {
			$(this).attr('disable',true);
			slow_motion = true;
			desenha(tabuada,nNumeros);
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
			desenha(tabuada,nNumeros);
		}
	});
});