import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IUser, ITemplate, IPinFolder } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{

    //baseUrl: string = '/api/';
    
    /**
     * Constructor for this class - creating injectables
     *
     * @param http - injectable HttpClient
     * @param db - injectable Router
     * @returns void
     */
    constructor(private http: HttpClient,
                private db: AngularFireDatabase) 
    { }

    /**
     * Get the user from the database
     *
     * @param id - the authentication token of the user
     * @returns the user's information from the database as an Observable
     */
    getUser(id:string) : Observable<IUser>
    {
      var items: Observable<IUser>;

      items = this.db.object('users/'+id).snapshotChanges()
      .pipe(
        map((u:any) => {
            let user: IUser = {...JSON.parse(u.payload.val())};
            return user;
          }),
        catchError(this.handleError)
      );
      return items;
    }

    /**
     * Updates the user's information in the database
     *
     * @param id - the authentication token of the user
     * @param user - the information about the user
     * @returns void
     */
    changeUser(id:string, user:IUser):void
    {
      this.db.object('users').update({[id]: JSON.stringify(user)});
    }

    /**
     * Create a new user in the database using their token id and name.
     *
     * @param userId - the authentication token of the user
     * @param userName - the name of the user
     * @returns void
     */
    addUser(userId:string, userName:string) : void
    {
      //console.log("adding user " + userId +" " + userName);

      this.db.object('users/' + userId).set(JSON.stringify({
        "name": userName,
        "textType": ["title"],
        "colours":["white", "black"],
        "fonts": ["arial"]
      }));
      //console.log(this.db.object('users/'+userId));
    }

    /**
     * Deletes user information from the database.
     *
     * @param id - the authToken of the user
     * @returns void
     */
    deleteUser(id:string) : void
    {
      this.db.object('users/'+id).remove();
    }

    /**
     * Get a list of templates for a customer from the database
     *
     * @param customerId - the authToken (id) of the user
     * @returns list of the user's templates from the database as an Observable
     */
    getTemplates(customerId:string) : Observable<ITemplate[]> 
    {
      var items: Observable<ITemplate[]>;
      //console.log("getting templates");

      items = this.db.list('templates').snapshotChanges()
      .pipe(
        map((templates: any[]) => {
          let listOf: ITemplate[] = [];
          templates.map( (t:any) => {
            //console.log("getting template ");
            //console.log(t.payload.val());
            //console.log(JSON.parse(t.payload.val()));
            let newTemp: ITemplate = {id:t.payload.key, ...JSON.parse(t.payload.val())};
            if (newTemp.customerId===customerId)
            {
              listOf.push(newTemp); 
            }
          });
          return listOf;
        }),
        catchError(this.handleError)
      );
      return items;
    }

    /**
     * Updates the template in the database
     *
     * @param temp - the updated template
     * @returns void
     */
    changeTemplate(temp:any): void
    {
      //console.log(this.db.object('templates/'+temp.id));
      var copy = {
        "customerId": temp.customerId,
        "dateCreated": temp.dateCreate, //change this to current date
        "name": temp.name,
        "categories": temp.categories,
        "width": temp.width,
        "height": temp.height,
        "shapes":temp.shapes,
        "rectangles": temp.rectangles,
        "circles": temp.circles,
        "texts": temp.texts,
        "images": temp.images
      };
      this.db.object('templates/').update({[temp.id]: JSON.stringify(copy)});
    }

    /**
     * Create a new template in the database for a customer
     *
     * @param userId - the id (authToken) of the user
     * @param tempName - the name of the template
     * @param tempCategories - the list of the categories of the template
     * @param tempWidth - the width of the template
     * @param tempHeight - the height of the template
     * @returns the key of the template
     */
    addTemplate(userId:string, tempName:string, tempCategories:string[], tempWidth:number, tempHeight:number) : string
    {
      //console.log(JSON.stringify({
      //  "customerId": userId,
      //  "dateCreated": this.getDate(), //change this to current date
      //  "name": tempName,
      //  "categories": tempCategories,
      //  "width": tempWidth,
      //  "height": tempHeight,
      //  "shapes":[[]],
      //  "rectangles": [],
      //  "circles": [],
      //  "texts": [],
      //  "images": []
      //}));

      var itemsRef = this.db.list('templates').push(JSON.stringify({
        "customerId": userId,
        "dateCreated": this.getDate(), //change this to current date
        "name": tempName,
        "categories": tempCategories,
        "width": tempWidth,
        "height": tempHeight,
        "shapes":[[]],
        "rectangles": [],
        "circles": [],
        "texts": [],
        "images": []
      }));

      let token = itemsRef.key;
      if (token)
        return token;
      return "";
    }

    /**
     * Deletes a template from the database.
     *
     * @param key - the key of the template
     * @returns void
     */
    deleteTemplate(key:string) : void 
    {
      this.db.object('templates/'+key).remove();
    }

    /**
     * Get a list of folders for a customer from the database
     *
     * @param customerId - the authToken (id) of the user
     * @returns list of the user's folders from the database as an Observable
     */
    getFolders(customerId:string) : Observable<IPinFolder[]> 
    {
      var items: Observable<IPinFolder[]>;

      items = this.db.list('folders').snapshotChanges()
      .pipe(
        map((folders: any[]) => {
          let listOf: IPinFolder[] = [];
          folders.map( (f:any) => {
            //console.log("getting folder ");
            //console.log(f.payload.val());
            //console.log(JSON.parse(f.payload.val()));
            let newF: IPinFolder = {id:f.payload.key, ...JSON.parse(f.payload.val())};
            if (newF.customerId===customerId)
            {
              listOf.push(newF); 
            }
          });
          return listOf;
        }),
        catchError(this.handleError)
      );
       items.subscribe(res=> console.log(res));
      return items;
    }
    
    /**
     * Create a new template in the database for a customer
     *
     * @param userId - the id (authToken) of the user
     * @param fName - the name of the folder
     * @param fCategories - the list of the categories the folder is in
     * @param fText - a list of text options for each type of text
     * @param fImages - a list of the image locations
     * @returns void
     */
    addFolder(userId:string, fName:string, fCategories:string[], fText:string[][], fImages:string[]) : void
    {
      var itemsRef = this.db.list('folders').push(JSON.stringify({
        "customerId": userId,
        "name": fName,
        "dateCreated":this.getDate(),
        "dateLastUsed": this.getDate(),
        "categories": fCategories,
        "text":fText,
        "image":fImages
      }));

    }

    /**
     * Updates the folder in the database
     *
     * @param folder - the updated folder
     * @returns void
     */
    changeFolder(folder:any) : void
    {
      var key: string = folder.id;
      delete folder.id;
      this.db.object('folders/').update({[key]: JSON.stringify(folder)});
    }

    
    /**
     * Deletes a folder from the database.
     *
     * @param key - the key of the folder
     * @returns void
     */
    deleteFolder(key:string) : void 
    {
       this.db.object('folders/'+key).remove();
    }

    /**
     * Gets the current date.
     *
     * @returns the date today in the form YYYY-MM-DD
     */
    private getDate():string
    {
      var MyDate = new Date();
      return MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    }


    /**
     * Handles errors and returns an observablew with the error
     *
     * @param error - the error
     * @returns Observable
     */
    private handleError(error: any) 
    {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(error || 'Node.js server error');
    }

}

//catch 0 if none
//CHANGE ALL TO RETURN TYPE _ NO VOID