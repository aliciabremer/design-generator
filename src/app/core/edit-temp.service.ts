import { Injectable } from '@angular/core';

import { ITemplate, IPinFolder, IUser, IRectangle, ICircle, IText, IImage } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EditTempService {

  /**
   * Detect if an item was selected on the click. If an item was select, return
   * the type of the shape and the id. If an item was selected, return the type as
   * -1, signalling the client to deselect all items.
   *
   * @param c - the canvas element to draw on
   * @param e - the mouse click event
   * @param temp - the template being edited
   * @param scaling - the scaling amount for drawing on the canvas
   * @returns an array of the type and id of the shape selected
   */
  clickResponse(c:any, e: any, temp:ITemplate, scaling: number) : number[] 
  {
    //get the x and y coordinates
    let rect = c.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    //console.log("Coordinate x: " + x, 
    //                    "Coordinate y: " + y);

    //find the x and y coordinates of the shape that was clicked - start at the templates in front and iterate through

    let shapeType:number = -1;
    let shapeId: number = 0;

    for (let i = temp.shapes.length-1; i > -1; i--)
    {
      let type:number = temp.shapes[i][0];
      let ind:number = temp.shapes[i][1];

      switch(type)
  	  {
        case (0):
        {
          let r = temp.rectangles[ind];
          if (this.checkShape(x, y, r.x, r.y, r.width, r.height, scaling))
          {
          	shapeType = type;
          	shapeId = ind;
          }
          break;
        }
	      case (1):
	      {
          let circleTo:ICircle = temp.circles[ind];
	        let arr:number[] = this.convertCircle(circleTo);
            if (this.checkShape(x, y, arr[0], arr[1], arr[2], arr[3], scaling))
            {
            	shapeType = type;
            	shapeId = ind;
            }
            break;
  	    }
  	    case (2):
  	    {
  	      let t = temp.texts[ind];
            if (this.checkShape(x, y, t.x, t.y, t.maxWidth, t.height, scaling))
            {
            	shapeType = type;
            	shapeId = ind;
            }
            break;
  	    }
  	    case (3):
  	    {
  	      let img = temp.images[ind];
            if (this.checkShape(x, x, img.x, img.y, img.width, img.height, scaling))
            {
            	shapeType = type;
            	shapeId = ind;
            }
            break;
  	    }
  	    default:
  	    {
  	      break;
  	    }
      }
      //if shape found, break
      if (shapeType!=-1)
      {
      	break;
      }
    }

    let arr:number[] = [shapeType, shapeId];
    console.log(arr);
    return arr;

  }

  /**
   * Get the coordinates and width and height of the box surrounding the circle, to
   * check if the click was on the circle box
   *
   * @param c - the ICircle object
   * @returns an array of the x, y, width and height of the circle box
   */
  private convertCircle(c:ICircle) : number[]
  {
  	let arr:number[] = [];
  	arr[0] = c.xPos-c.radius;
  	arr[1] = c.yPos-c.radius;
  	arr[2] = arr[3] = c.radius*2;
  	return arr;
  }

  /**
   * Check if a click landed on a shape
   *
   * @param clickX - the x coordinate of the click
   * @param clickY - the y coordinate of the click
   * @param xCoord - the top left corner x coordinate of the shape
   * @param yCoord - the top left corner y coordinate of the shape
   * @param width - the width of the shape
   * @param height - the height of the shape
   * @param scaling - the scaling amount for drawing on the canvas
   * @returns true if click in shape; false otherwise
   */
  private checkShape(clickX:number, clickY:number, xCoord:number, yCoord:number, width:number, height:number, scaling:number):boolean
  {
    //console.log("selecting shape");
    //console.log("click : " + clickX +" " + clickY);
    //console.log(" on canvas: " + (scaling*xCoord) +" " + (scaling*(xCoord+width)) + " " + (scaling*(yCoord))+" " + (scaling*(yCoord+height)));
  	//console.log(clickX > scaling*xCoord &&
    //     clickX < scaling*(xCoord+width) &&
    //     clickY > scaling*(yCoord) &&
    //     clickY < scaling*(yCoord+height));
    return clickX > scaling*xCoord &&
  		   clickX < scaling*(xCoord+width) &&
  		   clickY > scaling*(yCoord) &&
  		   clickY < scaling*(yCoord+height);
  }

  /**
   * If a shape is selected, draw the bounding box around the object in blue.
   *
   * @param ctx - the canvas to draw on
   * @param isRect - true if the shape is a rectangle; false otherwise
   * @param isCirc - true if the shape is a circle; false otherwise
   * @param isText - true if the shape is a text; false otherwise
   * @param isImage - true if the shape is an image; false otherwise
   * @param id - the id of the shape being edited
   * @param temp - the template to edit
   * @param scaling - the scaling amount for drawing on the canvas
   * @returns vaoid
   */
  select(ctx:any, isRect:boolean, isCirc:boolean, isText:boolean, isImage:boolean, id:number, temp:ITemplate, scaling:number):void
  {
  	let x:number = 0;
  	let y:number = 0;
  	let height:number = 0;
  	let width:number = 0;

  	if (isRect)
  	{
  	  x = temp.rectangles[id].x;
  	  y = temp.rectangles[id].y;
  	  width = temp.rectangles[id].width;
  	  height = temp.rectangles[id].height;
  	}
  	else if (isCirc)
  	{
  	  let arr:number[] = this.convertCircle(temp.circles[id]);
  	  x = arr[0];
  	  y = arr[1];
  	  width = arr[2];
  	  height = arr[3];
  	}
  	else if (isText)
  	{
  	  x = temp.texts[id].x;
  	  y = temp.texts[id].y;
  	  width = temp.texts[id].maxWidth;
  	  height = temp.texts[id].height;
  	}
  	else if (isImage)
  	{
  	  x = temp.images[id].x;
  	  y = temp.images[id].y;
  	  width = temp.images[id].width;
  	  height = temp.images[id].height;
  	}	

    if (width==0)
    {
      return;
    }

    //console.log("selecting");
  	ctx.strokeStyle="#00CDCD"; //change to preferences
    ctx.lineWidth=5;
    ctx.beginPath();
	  ctx.rect(x*scaling, y*scaling, width*scaling, height*scaling);
	  ctx.stroke();
  }

  /**
   * Add a shape to the template based on the type provided.
   *
   * @param num - the type of the shape
   * @param temp - the template to edit
   * @returns the id of the shape created
   */
  addShape(num:number, temp:ITemplate):number
  {
  	let shapeId:number = 0;
  	switch(num)
    {
      case 0:
      {
      	shapeId = this.addRect(temp);        
        break;
      }
      case 1:
      {
        shapeId = this.addCirc(temp);
        break;
      }
      case 2:
      {
        shapeId = this.addText(temp);
        break;
      }
      case 3:
      {
       	shapeId = this.addImage(temp);
        break;
      }
      default:
      {
        console.log("error");
      }
    }
    return shapeId;
  }

  /**
   * Add a rectangle to the list of rectangles in the template and add the rectangle
   * to the the list of shapes.
   *
   * @param temp - the template to edit
   * @returns the id of the rectangle created
   */
  addRect(temp:ITemplate): number
  {
  	temp.rectangles.push({
        "id": temp.rectangles.length+1,
        "x": 0,
        "y": 0,
        "height": 200,
        "width": 200,
        "colour":0
      });
	  let shapeId:number = temp.rectangles.length-1;
  	temp.shapes.push([0,shapeId]);
  	return shapeId;
  }

  /**
   * Add a circle to the list of circles in the template and add the circle
   * to the the list of shapes.
   *
   * @param temp - the template to edit
   * @returns the id of the circle created
   */
  addCirc(temp:ITemplate): number
  {
  	temp.circles.push({
        "id": temp.circles.length+1,
        "xPos": 100,
        "yPos": 100,
        "radius": 500,
        "colour": 0
      });
    let shapeId:number = temp.circles.length-1;
  	temp.shapes.push([1,shapeId]);
  	return shapeId;
  }

  /**
   * Add a text object to the list of texts in the template and add the text
   * to the the list of shapes.
   *
   * @param temp - the template to edit
   * @returns the id of the text created
   */
  addText(temp:ITemplate) : number
  {
  	temp.texts.push({
        "id": temp.texts.length+1,
        "size": 40,
        "type": 0,
        "x":0,
        "y":0,
        "font":0,
        "colour": 0,
        "maxWidth":500,
        "height": 200
      });
    let shapeId:number = temp.texts.length-1;
    temp.shapes.push([2, shapeId]);
    return shapeId;
  }

  /**
   * Add an image object to the list of texts in the template and add the image
   * to the the list of shapes.
   *
   * @param temp - the template to edit
   * @returns the id of the image created
   */
  addImage(temp:ITemplate) : number
  {
  	temp.images.push({
        "id":temp.images.length+1,
        "x":100,
        "y":100,
        "width":300,
        "height": 300
      });
    let shapeId = temp.images.length-1;
    temp.shapes.push([3, shapeId]);
    return shapeId;
  }

  /**
   * Move the shape with the id provided to the back of the list, meaning that
   * the shape is at the top
   *
   * @param shapes - the list of shapes
   * @param id - the id of the shape
   * @returns the updated shapes array
   */
  sendToFront(shapes:number[][], id: number):number[][]
  {
    let arr:number[] = [];
    for (let i = 0; i < shapes.length; i++)
    {
      if (shapes[i][1]===id)
      {
        arr = shapes[i];
        shapes.splice(i, 1);
        break;
      }
    }
    shapes.push(arr);
    return shapes;
  }

  /**
   * Move the shape with the id provided to the front of the list, meaning that
   * the shape is at the bottom
   *
   * @param shapes - the list of shapes
   * @param id - the id of the shape
   * @returns the updated shapes array
   */
  sendToBack(shapes:number[][], id: number):number[][]
  {
    let arr:number[] = [];
    for (let i = 0; i < shapes.length; i++)
    {
      if (shapes[i][1]===id)
      {
        arr = shapes[i];
        shapes.splice(i, 1);
        break;
      }
    }
    shapes.unshift(arr);
    return shapes;

  }

  /**
   * Move the shape with the id provided to one position back in the list, meaning that
   * the shape is one closer to the top in the order.
   *
   * @param shapes - the list of shapes
   * @param id - the id of the shape
   * @returns the updated shapes array
   */
  sendForward(shapes:number[][], id: number):number[][]
  {
    let arr:number[] = [];
    let pos:number = 0;
    for (let i = 0; i < shapes.length; i++)
    {
      if (shapes[i][1]===id)
      {
        arr = shapes[i];
        pos = i
        shapes.splice(i, 1);
        break;
      }
    }
    if (pos+1 > shapes.length)
      return shapes;
    shapes.splice(pos+1, 0, arr);
    return shapes;
  }

  /**
   * Move the shape with the id provided to one position forward in the list, meaning that
   * the shape is one closer to the bottom in the order.
   *
   * @param shapes - the list of shapes
   * @param id - the id of the shape
   * @returns the updated shapes array
   */
  sendBackward(shapes:number[][], id: number): number[][]
  {
    let arr:number[] = [];
    let pos:number = 0;
    for (let i = 0; i < shapes.length; i++)
    {
      if (shapes[i][1]===id)
      {
        arr = shapes[i];
        pos = i
        shapes.splice(i, 1);
        break;
      }
    }
    if (pos-1 < 0)
      return shapes;
    shapes.splice(pos-1, 0, arr);
    return shapes;
  }

}
