import { Injectable } from '@angular/core';

import { ITemplate, IPinFolder, IUser, IRectangle, ICircle, IText, IImage } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DrawService
{

  constructor() { }

  /**
   * Draw out the template, using the colours, fonts, text and image provided.
   * The text, colour and font list should already be shuffled.  The drawing will be scaled
   * based on the scaling value provided.
   *
   * @param ctx - the canvas element to draw on
   * @param temp - the template to use
   * @param colourList - the list of colours to use
   * @param fontList - the list of fonts to use
   * @param textlist - the list of text to use
   * @param imageList - the list of images to use
   * @param scaling - the scaling factor to use
   * @returns void
   */
  draw(ctx: any, temp:ITemplate, colourList:string[], fontList:string[], textList:string[][], imageList:string[], scaling:number) : void
  {
    //console.log(textList);
    let imageInd:number = 0;
    let textInd:number[] = [];

    for (let i = 0; i < textList.length; i++)
    {
      textInd.push(0);
    } 


    //console.log("text index list" + textInd + imageInd);
    //console.log(textList.length);
    //console.log("colours " + colourList);

    //iterate through each shape in orders and draw
    for (let i = 0; i < temp.shapes.length; i++)
    {
      let type:number = temp.shapes[i][0];
      let ind:number = temp.shapes[i][1];

      switch(type)
      {
        case (0):
        {
          this.renderRectangle(temp.rectangles[ind], ctx, scaling, colourList);
          break;
        }
        case (1):
        {
          this.renderCircle(temp.circles[ind], ctx, scaling, colourList);
          break;
        }
        case (2):
        {
          //console.log("rendering text in switch case");
          //console.log(textList[temp.texts[ind].type][textInd[temp.texts[ind].type]]);
          //console.log("index " + textInd[temp.texts[ind].type]);
          //console.log("list length " + textList[temp.texts[ind].type].length);
          this.renderText(temp.texts[ind], ctx, scaling, textList[temp.texts[ind].type][textInd[temp.texts[ind].type]], colourList, fontList);
          if (textInd[temp.texts[ind].type] < textList[temp.texts[ind].type].length-1)
          {
            textInd[i]++;
          }
          break;
        }
        case (3):
        {
          this.renderImage(temp.images[ind], ctx, scaling, imageList[imageInd]);
          if (imageInd < imageList.length-1)
          {
            imageInd++;
          }
          break;
        }
        default:
        {
          break;
        }
      }
    }
  }

  /**
   * Draws the rectangle on the canvas.
   *
   * @param r - the rectangle to draw
   * @param ctx - the canvas element to draw on
   * @param scaling - the scaling factor to use
   * @param colourList - the list of colours to use
   * @returns void
   */
  renderRectangle(r:IRectangle, ctx:any, scaling:number, colourList:string[]):void
  {

  	ctx.fillStyle=colourList[r.colour]; //change to preferences
    //console.log(colourList);
    //console.log("drawing rectangle: " + colourList[r.colour])
    //console.log(r);
  	ctx.fillRect(r.x*scaling, r.y*scaling, r.width*scaling, r.height*scaling);
  	
  }

  /**
   * Draws the circle on the canvas.
   *
   * @param c - the circle to draw
   * @param ctx - the canvas element to draw on
   * @param scaling - the scaling factor to use
   * @param colourList - the list of colours to use
   * @returns void
   */
  renderCircle(c:ICircle, ctx:any, scaling:number, colourList:string[]):void
  {

  	ctx.fillStyle=colourList[c.colour]; //change to preferences

  	ctx.beginPath();
	  ctx.arc(c.xPos*scaling, c.yPos*scaling, c.radius*scaling, 0, 2 * Math.PI, false);
	  ctx.fill();
  }

  /**
   * Draws the text on the canvas.
   *
   * @param t - the text to draw
   * @param ctx - the canvas element to draw on
   * @param scaling - the scaling factor to use
   * @param text - the text to write
   * @param colourList - the list of colours to use
   * @param fontList - the list of fonts to use
   * @returns void
   */
  renderText(t:IText, ctx:any, scaling:number, text:string, colourList:string[], fontList:string[]):void
  {
  	ctx.fillStyle=colourList[t.colour];
  	ctx.font = t.size+"px "+fontList[t.font]; //change font to random and size to fit.. just fix lol
    //console.log("text style: " + ctx.fillStyle+" " + ctx.font);
    //console.log("rendering part 1 : x = "  + t.x +" y= "+ t.y + " maxwidth: "+ t.maxWidth+" text: "+text + " t: "+t);
	  //console.log("rendering part 2: " + ctx.fillStyle+" "+ctx.font);
    ctx.fillText(text, t.x*scaling, t.y*scaling, t.maxWidth*scaling); 
  }

  /**
   * Draws the image on the canvas. Scale the image to fit in the given space.
   *
   * @param i - the image to draw
   * @param ctx - the canvas element to draw on
   * @param scaling - the scaling factor to use
   * @param image - the path of the image
   * @returns void
   */
  renderImage(i:IImage, ctx:any, scaling:number, image:string):void
  {
  	var pattern = new Image();
  	pattern.src = image;

    var hRatio : number = i.width  / pattern.width    ;
    var vRatio : number =  i.height / pattern.height  ;
    var ratio : number  = Math.max ( hRatio, vRatio );
    var centerShift_x : number = ( i.width - pattern.width*ratio ) / 2;
    var centerShift_y : number = ( i.height - pattern.height*ratio ) / 2;  
    ctx.drawImage(pattern, i.x*scaling,i.y*scaling, pattern.width*scaling, pattern.height*scaling,
                      centerShift_x*scaling,centerShift_y*scaling,pattern.width*scaling*ratio, pattern.height*scaling*ratio);  
  }

}
