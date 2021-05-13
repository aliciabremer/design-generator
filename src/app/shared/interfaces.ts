export interface IUser
{
	id: string;
	name:string;
	textType:string[];
	colours:string[];
	fonts:string[];
}

/*
export interface IPinAcct
{

	id:number;
	name:string;
	colours:string[];
	fonts:[];
	colourPairings:string[][];
	nameStyle:IText;
	
}
*/

export interface ITemplate
{
	id:number;
	customerId:string;
	dateCreated:string;
	name:string;
	width:number;
	height:number;
	shapes:number[][];
	rectangles:IRectangle[];
	circles:ICircle[];
	texts:IText[];
	images:IImage[];
}

export interface IRectangle
{
	id:number;
	x:number;
	y:number;
	width:number;
	height:number;
	colour: number;
}

export interface ICircle
{
	id:number;
	xPos:number;
	yPos:number;
	radius:number;
	colour: number;
}

export interface IText
{
	id:number;
	size:number;
	type:number;
	x:number;
	y:number;
	font:number; //change
	colour:number;
	maxWidth:number;
	height:number;
}

export interface IImage
{
	id:number;
	x:number;
	y:number;
	width:number;
	height:number;
	//add width
}


export interface IPinFolder
{
	id:number;
	customerId:string;
	name:string;
	dateCreated:string;
	dateLastUsed:string;
	categories:string[];
	text:string[][];
	image:string[];
}