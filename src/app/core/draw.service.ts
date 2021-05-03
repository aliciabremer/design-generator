import { Injectable } from '@angular/core';

import { ITemplate, IPinFolder, IUser, IRectangle, ICircle, IText, IImage } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  //NEED TO FIX COLOURS

  draw(ctx: any, temp:ITemplate, colourList:string[], fontList:string[], textList:string[], imageList:string[], scaling:number) : void
  {
    var folderIndex: number = 0;

  	for (var i in temp.images)
    {
      this.renderImage(temp.images[i], ctx, scaling, imageList[folderIndex]);
      folderIndex++;
    }

    for (var r in temp.rectangles)
  	{
  		this.renderRectangle(temp.rectangles[r], ctx, scaling, colourList);
  	}
  	for (var ci in temp.circles)
  	{
  		this.renderCircle(temp.circles[ci], ctx, scaling, colourList);
  	}
  	for (var t in temp.texts)
  	{
      //fix text - so take in 2d array and stuff
  		this.renderText(temp.texts[t], ctx, scaling, textList, colourList, fontList);
  	}
  }

  renderRectangle(r:IRectangle, ctx:any, scaling:number, colourList:string[]):void
  {

  	ctx.fillStyle=colourList[r.colour]; //change to preferences
    console.log(colourList);
    console.log("drawing rectangle: " + colourList[r.colour])
    console.log(r);
  	ctx.fillRect(r.x*scaling, r.y*scaling, r.height*scaling, r.width*scaling);
  	
  }

  renderCircle(c:ICircle, ctx:any, scaling:number, colourList:string[]):void
  {

  	ctx.fillStyle=colourList[c.colour]; //change to preferences

  	ctx.beginPath();
	   ctx.arc(c.xPos*scaling, c.yPos*scaling, c.radius*scaling, 0, 2 * Math.PI, false);
	   ctx.fill();
  }

  //FIX RENDER TEXT AND TEXT INTERFACE.

  renderText(t:IText, ctx:any, scaling:number, textList:string[], colourList:string[], fontList:string[]):void
  {
  	ctx.fillStyle=colourList[t.colour];
  	ctx.font = t.size+"px "+fontList[t.font]; //change font to random and size to fit.. just fix lol
    //calculate size from width and height
	  ctx.fillText(textList[t.type], t.y, t.x, t.maxWidth); 
  }


//ADD CROPPING AND STUFF, also scaling of images
  renderImage(i:IImage, ctx:any, scaling:number, image:string):void
  {
  	var pattern = new Image();
  	pattern.src = image;
    ctx.drawImage(pattern, i.x*scaling, i.y*scaling);
  }
}
