var dials = [];
var prepends = [];
var scales = [];

outlets = 2;

var p = this.patcher;
var sendDials = p.getnamed("sendDials");

function destroy()
{
	//remove existing scripted objects
	for(i = 0; i < dials.length; i++)
	{
			p.remove(dials[i]);
			p.remove(prepends[i]);
			p.remove(scales[i]);
	}
}

function createDials(numDials)
{
	//destroy existing dials
	destroy();

	var xOffset = 65;
	var yOffset = 25;

	var deviceWidth = 125;
	
	//create new Dial-Pairs
	for(i = 0; i < numDials; i++)
	{
		//set position
		var prevX;
		var xPosDial

		if(i % 2 == 1)
		{
			xPosDial = prevX;
		}
		else
		{
			xPosDial = xOffset + i * 25;
			prevX = xPosDial;
		}
	
		var yPosDial = yOffset + (i % 2) * 65;
		var xPosObj = xOffset + i * 120;
		var yPosObj = yOffset + 300;
		
		//set up the dial and related objects
		newDial = p.newdefault(xPosDial, yPosDial, "live.dial", "@varname", "dial_" + (i + 1))
		newDial.presentation(1);
		newScale = p.newdefault(xPosObj, yPosObj, "scale",  0, 127, (0).toFixed(2), (1).toFixed(2))
		newPrepend = p.newdefault(xPosObj, yPosObj + 25, "prepend", i)

		//set connections
		p.connect(newDial, 0, newScale, 0);
		p.connect(newScale, 0, newPrepend, 0);
		p.connect(newPrepend, 0, sendDials, 0);

		//add to arrays
		dials.push(newDial);
		scales.push(newScale);
		prepends.push(newPrepend);

		//adjust device width
		deviceWidth = Math.floor(i / 2) * 50 + 125;

		outlet(0, deviceWidth); 
		outlet(1, deviceWidth - 75); 
	}
		
}
