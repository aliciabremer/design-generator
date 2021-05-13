import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IUser, ITemplate, IPinFolder } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl: string = '/api/';
    
    /**
     * Constructor for this class - creating injectables
     *
     * @param http - injectable AuthService
     * @param db - injectable Router
     * @returns void
     */
    constructor(private http: HttpClient,
                private db: AngularFireDatabaseModule ) 
    {  }

    /*
    getUsers() : Observable<IUser[]> {
        console.log("getting users " + this.baseUrl+"users");
        return this.http.get<IUser[]>(this.baseUrl+"users")
            .pipe(
                catchError(this.handleError)
            );
    }

    getUser(id:number) : Observable<IUser> {
      console.log("getting user - of id");
      return this.http.get<IUser[]>(this.baseUrl + 'users')
        .pipe(
          map(users => {
            let user = users.filter((u: IUser) => u.id === id);
            return user[0];
          }),
          catchError(this.handleError)
        )
    }

    changeUser(user:IUser):void {
      this.http.put(this.baseUrl + 'users/'+user.id, user).subscribe(data => {
        console.log(data);
      });
    }
    */

    /**
     * Get the user from the database
     *
     * @param id - the authToken of the user
     * @returns the user's information from the database as an Observable
     */
    getUser(id:string) : Observable<IUser>
    {
      var itemsRef: any;
      var items: Observable<IUser>;

      itemsRef = this.db.ref('users/'+id);
      items = itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Updates the user's information in the database
     *
     * @param user - the information about the user
     * @returns the user's information from the database as an Observable
     */
    changeUser(user:IUser) : Observable<IUser>
    {
      var itemsRef: any;
      var items: Observable<IUser>;

      itemsRef = this.db.ref('users/' + user.id);
      itemsRef.set(user);
      items = itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Create a new user in the database using their token id and name.
     *
     * @param userId - the authToken of the user
     * @param userName - the name of the user
     * @returns the user's information from the database as an Observable
     */
    addUser(userId:string, userName:string) : Observable<IUser>
    {
      var itemsRef: any;
      var items: Observable<IUser>;

      var user:IUser = {
        "id":id,
        "name": name,
        "textType": ["title"],
        "colours":["white", "black"],
        "fonts": ["arial"]
      };

      itemsRef = this.db.ref('users/' + user.id);
      itemsRef.set(user);
      items = itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Deletes user information from the database.
     *
     * @param id - the authToken of the user
     * @returns void
     */
    deleteUser(id:string) : void
    {
      this.db.ref('users/'+id).remove();
    }
    
    /*
    getTemplates(id:number) : Observable<ITemplate[]> {
      console.log("getting templates");
      return this.http.get<ITemplate[]>(this.baseUrl + 'templates')
        .pipe(
          map(templates => {
            let temp = templates.filter((t: ITemplate) => t.customerId === id);
            return temp;
          }),
          catchError(this.handleError)
        )
    }

    getTemplate(id:number) : Observable<ITemplate> {
      console.log("getting a folder");
      return this.http.get<ITemplate[]>(this.baseUrl + 'templates')
        .pipe(
          map(templates => {
            let templateReq = templates.filter((t: ITemplate) => t.id === id);
            return templateReq[0];
          }),
          catchError(this.handleError)
        );
    }

    changeTemplate(temp:ITemplate): Observable<ITemplate> {
      console.log("updating a template");
      return this.http.put<ITemplate>(this.baseUrl + 'templates/'+temp.id, temp);
    }

    addTemplate(id:number) : Observable<ITemplate> {
      var obj = 
      {
      "customerId": id,
      "dateCreated":"2021-03-21",
      "name": "",
      "width": 1000,
      "height": 1500,
      "rectangles": [],
      "circles": [],
      "texts": [],
      "images": []
    };
      return this.http.post<ITemplate>((this.baseUrl + 'templates/'), JSON.stringify(obj));
    }

    deleteTemplate(id:number) : void {
      console.log("deleting a template");
      this.http.delete(this.baseUrl + 'templates/'+id).subscribe(data => {
          console.log(data);
        });
    }
    */

    /**
     * Get a list of templates for a customer from the database
     *
     * @param customerId - the authToken (id) of the user
     * @returns list of the user's templates from the database as an Observable
     */
    getTemplates(customerId:string) : Observable<ITemplate[]> 
    {
      var itemsRef: any;
      var items: Observable<ITemplate[]>;

      itemsRef = this.db.ref('templates/').equalTo(customerId);
      items = this.itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Get a template from database.
     *
     * @param id - the id of the template
     * @returns the template from the database as an Observable
     */
    getTemplate(id:string) : Observable<ITemplate> 
    {
      var itemsRef: any;
      var items: Observable<ITemplate>;

      itemsRef = this.db.ref('templates/'+id);
      items = this.itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Updates the template in the database
     *
     * @param temp - the updated template
     * @returns the template from the database as an Observable
     */
    changeTemplate(temp:ITemplate): Observable<ITemplate>
    {

      var itemsRef: any;
      var items: Observable<IUser>;

      itemsRef = this.db.ref('templates/' + temp.id);
      itemsRef.set(temp);
      items = itemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Create a new template in the database for a customer
     *
     * @param userId - the id (authToken) of the user
     * @param tempName - the name of the template
     * @param tempWidth - the width of the template
     * @param tempHeight - the height of the template
     * @returns the template created in the database as an Observable
     */
    addTemplate(userId:string, tempName:string, tempWidth:number, tempHeight:number) : Observable<ITemplate> 
    {
      var itemsRef: any;
      var newItemsRef:any;
      var items: Observable<IUser>;

      itemsRef = this.db.ref('templates/');
      newItemsRef = itemsRef.push();
      newItemsRef.set({
        "customerId": userId,
        "dateCreated":"2021-03-21", //change this to current date
        "name": tempName,
        "width": tempWidth,
        "height": tempHeight,
        "rectangles": [],
        "circles": [],
        "texts": [],
        "images": []
      });
      items = newItemsRef.valueChanges();
      items.subscribe(res=> console.log(res));
      return items;
    }

    /**
     * Deletes a template from the database.
     *
     * @param id - the id of the template
     * @returns void
     */
    deleteTemplate(id:number) : void 
    {
      this.db.ref('templates/'+id).remove();
    }

    /*
    getFolders(id:number) : Observable<IPinFolder[]> {
      console.log("getting folders");
      return this.http.get<IPinFolder[]>(this.baseUrl + 'folders')
        .pipe(
          map(folders => {
            let userFolders = folders.filter((f: IPinFolder) => f.customerId === id);
            return userFolders;
          }),
          catchError(this.handleError)
        );
    }

    getFolder(id:number) : Observable<IPinFolder> {
      console.log("getting a folder");
      return this.http.get<IPinFolder[]>(this.baseUrl + 'folders')
        .pipe(
          map(folders => {
            let userFolders = folders.filter((f: IPinFolder) => f.id === id);
            return userFolders[0];
          }),
          catchError(this.handleError)
        );
    }

    addFolder(id:number) : Observable<IPinFolder> {

      var obj = 
      {
      "customerId": id,
      "name": "temporary",
      "dateCreated":"2021-03-21", //CHANGE TO GETTING DATE TODAY
      "dateLastUsed": "2021-03-21",
      "categories": [],
      "text":[],
       "image":[]
     };

      return this.http.post<IPinFolder>((this.baseUrl + 'folders/'), obj);
    }

    changeFolder(folder:IPinFolder) : Observable<IPinFolder> {
      console.log("updating a folder");
      return this.http.put<IPinFolder>(this.baseUrl + 'folders/'+folder.id, folder);
    }

    

    deleteFolder(id:number) : void {
      console.log("deleting a folder");
      this.http.delete(this.baseUrl + 'folders/'+id).subscribe(data => {
          console.log(data);
        });
    }
    */

    
    getFolders(id:number) : Observable<IPinFolder[]> {
      console.log("getting folders");
      return this.http.get<IPinFolder[]>(this.baseUrl + 'folders')
        .pipe(
          map(folders => {
            let userFolders = folders.filter((f: IPinFolder) => f.customerId === id);
            return userFolders;
          }),
          catchError(this.handleError)
        );
    }

    getFolder(id:number) : Observable<IPinFolder> {
      console.log("getting a folder");
      return this.http.get<IPinFolder[]>(this.baseUrl + 'folders')
        .pipe(
          map(folders => {
            let userFolders = folders.filter((f: IPinFolder) => f.id === id);
            return userFolders[0];
          }),
          catchError(this.handleError)
        );
    }

    addFolder(id:number) : Observable<IPinFolder> {

      var obj = 
      {
      "customerId": id,
      "name": "temporary",
      "dateCreated":"2021-03-21", //CHANGE TO GETTING DATE TODAY
      "dateLastUsed": "2021-03-21",
      "categories": [],
      "text":[],
       "image":[]
     };

      return this.http.post<IPinFolder>((this.baseUrl + 'folders/'), obj);
    }

    changeFolder(folder:IPinFolder) : Observable<IPinFolder> {
      console.log("updating a folder");
      return this.http.put<IPinFolder>(this.baseUrl + 'folders/'+folder.id, folder);
    }

    

    deleteFolder(id:number) : void {
      console.log("deleting a folder");
      this.http.delete(this.baseUrl + 'folders/'+id).subscribe(data => {
          console.log(data);
        });
    }


    private handleError(error: any) {
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