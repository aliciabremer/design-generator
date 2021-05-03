import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IUser, ITemplate, IPinFolder } from '../../app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl: string = '/api/';
    
    constructor(private http: HttpClient) { }

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