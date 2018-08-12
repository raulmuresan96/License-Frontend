import { Injectable } from '@angular/core';
import{Http, Response, Headers, RequestOptions} from '@angular/http'
import {HttpClientModule} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseSearchUrl:string="http://localhost:8090/author/";
  //private headers = new Headers({'Content-Type': 'application/json'});
  private headers = new Headers({'Content-Type':'multipart/form-data'});

  private options = new RequestOptions({headers: this.headers})


  constructor(private _http: Http) { }

doRequest(searchString):Observable<any>{
  console.log("Ajunge la do Request")
  return this._http.get(this.baseSearchUrl + searchString, this.options).map((response: Response) => {
    //console.log(response.json());
    return response.json();
  }
  )
 
}
// postRequest():Observable<any>{
// //postRequest(){
//   var jsonObject = 
//   {
//     "string": "acesta e un string"
//   };
//   console.log("Ajunge la Post Request")
//   return this._http.post("http://localhost:8090/string", JSON.stringify(jsonObject), this.options).map((response: Response) => {
//     console.log(response);
//     return response;
//   }
//   )
// }


postRequest(publicationCsv):Observable<any>{
  //postRequest(){
    var jsonObject = 
    {
      "file1":publicationCsv
      //"citationCsv": citationCsv
      //"string": "acesta e un string"
    };
    console.log("Ajunge la Post Request")
    //console.log(jsonObject.publicationCsv.__proto__)
    return this._http.post("http://localhost:8090/upload", JSON.stringify(jsonObject), this.options).map((response: Response) => {
      console.log(response);
      return response;
    }
    )
  }


//   map((response: Response) => response.json())
//   // .catch(this.erroHandler)

//   .catch(error => { 
//     return this.erroHandler(error);
//   });
// }

errorHandler(error: Response){
  Observable.throw(error || "Server Error ")
}



}
