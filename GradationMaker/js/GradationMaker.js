function GradationMaker(element){

	this.element = element,
	this.canvasWidth = this.element.offsetWidth - 2,
	this.canvasHeight = this.element.offsetHeight - 2;

	// canvas 설정
	this.canvas = document.createElement('canvas');
	this.canvas.id = 'canvas';
	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
	this.element.appendChild(this.canvas);

	// context 설정
	this.context = this.canvas.getContext('2d');
	this.context.strokeStyle = "#000";
	this.context.lineJoin = "bevel";
	this.context.lineCap = "square";
	this.context.lineWidth = 1;


	// Label information
	this.lineHeight = 20,	// Temporary text height. Context.measuredText can't be measured a height of a text.
	this.font = 'bold 15px Arial';

	this.TXT_ALGIN_LEFT = 0;
	this.TXT_ALGIN_RIGHT = 1;
	this.TXT_ALGIN_CENTER = 2;

	this.axisXLb = null,
	this.axisYLb = null;


	// Margin value information
	var borderAxisLbMargin = 70,
			borderNoneMargin = 32,
			yAxisWMargin = 35,
			yAxisHMargin = 25,
			xImageMargin = 7,
			yImageMargin = 7;

	this.dXLbMarginX = 0,
	this.dXLbMarginY = 10,

	this.dYLbMarginX = 10,
	this.dYLbMarginY = 5;

	this.axisLbMargin = 15;


	// Coordinate of the chart area.
	var cX0 = borderAxisLbMargin,
	    cX1 = this.canvasWidth - borderAxisLbMargin,
			cY0 = borderNoneMargin,
			cY1 = this.canvasHeight - borderNoneMargin;

	// Coordinate of the image area.
	this.iX0 = null,
	this.iX1 = null,
	this.iY0 = null,
	this.iY1 = null;

	// Coordinate of each axis.
	this.leftYAxisLbX = null, this.leftYAxisLbY = null,
	this.rightYAxisLbX = null, this.rightYAxisLbY = null,
	this.bottomXAxisLbX = null, this.bottomXAxisLbY = null;

	this.leftYAxisLineX0 = null,
	this.leftYAxisLineX1 = null,
	this.leftYAxisLineY0 = null,
	this.leftYAxisLineY1 = null,

	this.rightYAxisLineX0 = null,
	this.rightYAxisLineX1 = null,
	this.rightYAxisLineY0 = null,
	this.rightYAxisLineY1 = null,

	this.bottomXAxisLineX0 = null,
	this.bottomXAxisLineX1 = null,
	this.bottomXAxisLineY0 = null,
	this.bottomXAxisLineY1 = null;


	// Axis gratation
	this.longGradation = 6,
	this.shortGradation = 3;


	// y-Axis information
	this.yUnit = null,
	this.yMin = null,
	this.yMax = null,
	this.yGradationNumber =  null;

	// x-Axis information
	this.xUnit = null,
	this.xMin = null,
	this.xMax = null,
	this.xGradationNumber =  null;


	// Background Image
	this.bg = null;			// Constructed image
	this.lbBg = null;		// Image included in gradation and label


	var $maker = this;

	// Left Y Axis - Make an axis
	$maker.leftYAxisLineX0 = cX0 + yAxisWMargin,
	$maker.leftYAxisLineY0 = cY0,
	$maker.leftYAxisLineX1 = cX0 + yAxisWMargin;
	$maker.leftYAxisLineY1 = cY1 - yAxisHMargin - yImageMargin;
	$maker.drawLine($maker.leftYAxisLineX0, $maker.leftYAxisLineY0 - 1, $maker.leftYAxisLineX0, $maker.leftYAxisLineY1 + 1);

	// Right Y Axis - Make an axis
	$maker.rightYAxisLineX0 = cX1 - yAxisWMargin,
	$maker.rightYAxisLineY0 = cY0,
	$maker.rightYAxisLineX1 = cX1 - yAxisWMargin;
	$maker.rightYAxisLineY1 = cY1 - yAxisHMargin - yImageMargin;
	$maker.drawLine($maker.rightYAxisLineX0, $maker.rightYAxisLineY0 - 1, $maker.rightYAxisLineX1, $maker.rightYAxisLineY1 + 1);

	// Bottom X Axis - Make an axis
	$maker.bottomXAxisLineX0 = cX0 + yAxisWMargin + xImageMargin,
	$maker.bottomXAxisLineY0 = cY1 - yAxisHMargin,
	$maker.bottomXAxisLineX1 = cX1 - yAxisWMargin - xImageMargin;
	$maker.bottomXAxisLineY1 = cY1 - yAxisHMargin;
	$maker.drawLine($maker.bottomXAxisLineX0 - 1, $maker.bottomXAxisLineY0, $maker.bottomXAxisLineX1 + 1, $maker.bottomXAxisLineY1);

	// Make a border of image area
	$maker.iX0 = $maker.leftYAxisLineX0 + xImageMargin,
	$maker.iX1 = $maker.rightYAxisLineX1 - xImageMargin,
	$maker.iY0 = $maker.leftYAxisLineY0,
	$maker.iY1 = $maker.bottomXAxisLineY1 - yImageMargin;

	$maker.drawLine($maker.iX0, $maker.iY0 - 1, $maker.iX0, $maker.iY1 + 1);
	$maker.drawLine($maker.iX0, $maker.iY1, $maker.iX1 + 1, $maker.iY1);
	$maker.drawLine($maker.iX1, $maker.iY1, $maker.iX1, $maker.iY0);
	$maker.drawLine($maker.iX1 + 1, $maker.iY0, $maker.iX0, $maker.iY0);

	$maker.bg = $maker.canvas.toDataURL();


	$maker.drawAxisLb($maker.axisXLb, $maker.axisYLb);
}

// Draw a label of Axis
GradationMaker.prototype.drawAxisLb = function(xLb, yLb){
	var $maker = this;
	// Right Y Axis - Make a label of Axis
	$maker.rightYAxisLbX = $maker.canvasWidth - $maker.axisLbMargin;
	$maker.rightYAxisLbY = $maker.canvasHeight / 2 - $maker.lineHeight / 2;
	$maker.drawLabel(yLb, $maker.rightYAxisLbX, $maker.rightYAxisLbY, $maker.lineHeight, Math.PI / 2, $maker.TXT_ALGIN_CENTER);

	// Left Y Axis - Make a label of Axis
	$maker.leftYAxisLbX = 0 + $maker.axisLbMargin;
	$maker.leftYAxisLbY = $maker.canvasHeight / 2;
	$maker.drawLabel(yLb, $maker.leftYAxisLbX, $maker.leftYAxisLbY, $maker.lineHeight, -Math.PI / 2, $maker.TXT_ALGIN_CENTER);

	// Bottom X Axis - Make a label of Axis
	$maker.bottomXAxisLbX = $maker.canvasWidth / 2;
	$maker.bottomXAxisLbY = $maker.canvasHeight - $maker.axisLbMargin - $maker.lineHeight / 2;
	$maker.drawLabel(xLb, $maker.bottomXAxisLbX, $maker.bottomXAxisLbY, $maker.lineHeight, 0, $maker.TXT_ALGIN_CENTER);

};
// Set a information of y-Axis
GradationMaker.prototype.setAxisY = function(max, min, unit){
	this.yMax = max,
	this.yMin = min,
	this.yUnit = (this.yMax - this.yMin >= 0) ? unit : -unit,
			this.yGradationNumber = (this.yMax - this.yMin) / this.yUnit;
};
// Set a information of x-Axis
GradationMaker.prototype.setAxisX = function(max, min, unit){
	this.xMax = max,
	this.xMin = min,
	this.xUnit = (this.xMax - this.xMin >= 0) ? unit : -unit,
	this.xGradationNumber = (this.xMax - this.xMin) / this.xUnit;
};
// Reset the canvas to Constructed image
GradationMaker.prototype.bgReset = function(){
	this.lbBg = null;
	this.redraw(this.bg);
};
// Reset ths x-Axis
GradationMaker.prototype.resetAxisX = function(gradationIntv, labelIntv){
	var $maker = this;
	$maker.drawAxisGradation({
	  	x0 : $maker.bottomXAxisLineX0,
	    y0 : $maker.bottomXAxisLineY0,
	    x1 : $maker.bottomXAxisLineX1,
	    y1 : $maker.bottomXAxisLineY1
	}, gradationIntv, labelIntv, $maker.TXT_ALGIN_CENTER);

	$maker.lbBg = $maker.canvas.toDataURL();
};
// Reset ths y-Axis
GradationMaker.prototype.resetAxisY = function(gradationIntv, labelIntv){
	var $maker = this;
	$maker.drawAxisGradation({
	  	x0 : $maker.rightYAxisLineX0,
	    y0 : $maker.rightYAxisLineY0,
	    x1 : $maker.rightYAxisLineX1,
	    y1 : $maker.rightYAxisLineY1
	}, gradationIntv, labelIntv, $maker.TXT_ALGIN_LEFT);

	$maker.drawAxisGradation({
	  	x0 : $maker.leftYAxisLineX0,
	    y0 : $maker.leftYAxisLineY0,
	    x1 : $maker.leftYAxisLineX1,
	    y1 : $maker.leftYAxisLineY1
	}, gradationIntv, labelIntv, $maker.TXT_ALGIN_RIGHT);

	$maker.lbBg = $maker.canvas.toDataURL();
};
// Redraw the canvas to selected background image.
GradationMaker.prototype.redraw = function(bg){
	var img = new Image();
		img.src = bg;

	this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	this.context.drawImage(img, 0, 0);

	this.context.strokeStyle = "#000";
};
// Draw a image in image area
GradationMaker.prototype.setImg = function(src){
	var $img = new Image(),
		$maker = this;

	$img.src = src;
	$img.onload = function(){
		$maker.context.imageSmoothingEnabled = false;
		$maker.context.mozImageSmoothingEnabled = false;
		$maker.context.drawImage(this, $maker.iX0, $maker.iY0, $maker.iX1 - $maker.iX0, $maker.iY1 - $maker.iY0);

		$maker.lbBg = $maker.canvas.toDataURL();
	};
};
// Draw a line in canvas
GradationMaker.prototype.drawLine = function(x0, y0, x1, y1){
	this.context.beginPath();
	this.context.moveTo(x0, y0);
	this.context.lineTo(x1, y1);
	this.context.stroke();
	this.context.closePath();
};
// Draw a label
GradationMaker.prototype.drawLabel = function(text, x, y, height, rotate, align){
	var measuredText = this.context.measureText(text),
		textAlign = 'center';

	switch (align) {
		case this.TXT_ALGIN_LEFT:
			textAlign = 'left';
			break;
		case this.TXT_ALGIN_RIGHT:
			textAlign = 'right';
			break;
		case this.TXT_ALGIN_CENTER:
			textAlign = 'center';
			break;
	}

	this.context.font = this.font;
	this.context.textAlign = textAlign;

	this.context.save();
	this.context.translate(x, y);
	this.context.rotate(rotate);

	this.context.fillText(text, 0, height / 2);
	this.context.restore();
};
// Draw a gradation
GradationMaker.prototype.drawAxisGradation = function(axis, gradationIntv, labelIntv, align){
	var gradationBlankSize,
		gradation, dataLb,
		count, startX, startY,
		$maker = this;

	if(axis.x0 == axis.x1){ // y axis
		gradationBlankSize = (axis.y1 - axis.y0) / $maker.yGradationNumber;

		dataLb = $maker.yMin;

		if($maker.yGradationNumber%2){
			count = $maker.yGradationNumber;
		} else {
			count = $maker.yGradationNumber + 1;
		}

	} else {	// x axis
		gradationBlankSize = (axis.x1 - axis.x0) / $maker.xGradationNumber;
		dataLb = $maker.xMin;

		if($maker.xGradationNumber%2){
			count = $maker.xGradationNumber;
		} else {
			count = $maker.xGradationNumber + 1;
		}

	}

	startX = axis.x0;
	startY = axis.y0;

	if(gradationIntv%2 != 0 || labelIntv%2 != 0){
		count++;
	}

	for (var i = 0; i < count; i++) {

		gradation = gradationSelector(gradationIntv, i, align);

    	if(axis.x0 == axis.x1){
    		$maker.drawLine(startX, startY, startX - gradation, startY);
    		$maker.drawLabel(setDataLb(dataLb, labelIntv, i), startX - calDataLbMargin(align, $maker.dYLbMarginX), startY - $maker.dYLbMarginY, $maker.lineHeight, 0, align);

    		dataLb = dataLb + $maker.yUnit;
		  	startY = gradationBlankSize + startY;
    	} else {
    		$maker.drawLine(startX, startY, startX, startY + gradation);
    		$maker.drawLabel(setDataLb(dataLb, labelIntv, i), startX, startY + calDataLbMargin(align, $maker.dXLbMarginY), $maker.lineHeight, 0, align);

		  	dataLb = dataLb + $maker.xUnit;
		  	startX = gradationBlankSize + startX;
    	}


	}

	function setDataLb(dataLabel, interval, number){
		if (number % interval) {
			dataLabel = '';
	      } else {
	    	dataLabel = dataLabel.toFixed(2);
	      }
		return dataLabel;
	}

	function calDataLbMargin(direction, margin){
		if (direction) {
			margin = margin;
		} else {
			margin = -margin;
		}
		return margin;
	}

	function gradationSelector(interval, number, align){
   		if (number % interval) {
   			gradation = $maker.shortGradation;
   	    } else {
   	    	gradation = $maker.longGradation;
   	    }
   		return calDataLbMargin(align, gradation);
	}
}


// Guide line
GradationMaker.prototype.xGuideLine = function(pos, img){
	var x, y, size,
		$maker = this;

	$maker.redraw($maker.lbBg || $maker.bg);

	if(pos - $maker.xMin == 0){
		x = 0;
	} else {
		size = ($maker.iX1 - $maker.iX0) / $maker.xGradationNumber;
		x = size * (pos - $maker.xMin) / $maker.xUnit;
	}

	$maker.context.strokeStyle = '#FF0000';
	$maker.drawLine($maker.iX0 + x, $maker.iY0, $maker.iX0 + x, $maker.bottomXAxisLineY0);
}

GradationMaker.prototype.yGuideLine = function(pos, img){
	var x, y, size,
	$maker = this;

	$maker.redraw($maker.lbBg || $maker.bg);

	if(pos - $maker.yMin == 0){
		y = 0;
	} else {
		size = ($maker.iY1 - $maker.iY0) / $maker.yGradationNumber;
		y = size * (pos - $maker.yMin) / $maker.yUnit;
	}

	$maker.context.strokeStyle = '#FF0000';
	$maker.drawLine($maker.leftYAxisLineX0, $maker.iY0 + y, $maker.rightYAxisLineX1, $maker.iY0 + y);
}
