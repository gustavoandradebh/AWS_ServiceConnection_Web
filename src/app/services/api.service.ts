import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError  } from 'rxjs/operators';

import { ImageQueryTemplate } from '../models/imagequerytemplate';

const apiUrl = 'https://localhost:5001/api/image';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postImage(imageModel: FormData): Observable<any> {

    let options_ : any = {
      body: imageModel,
      observe: "response",
      headers: new HttpHeaders({
          "Accept": "*/*"
      })
    };

    return this.http.request("post", apiUrl, options_)
      .pipe(
          map((response_ : any) => {
            return response_.body.imageKey;
          }),
          catchError(err => {
            console.error(err.message);
            if(err.status == 400)
            {
              if(err.error.errors.Description != undefined)
                return throwError(err.error.errors.Description[0]);
              else
                return throwError(err.error);
            }
            else
              return throwError("An error has occorred. Please try again.");
          })
      )
  }

  getImages(queryTemplate: ImageQueryTemplate): Observable<any> {

    let apiRequestUrl = `${apiUrl}?`;
    let queryArray: Array<string> = [];
    
    if(queryTemplate.description != null)
        queryArray.push(`description=${queryTemplate.description}`);

    if(queryTemplate.size != null)
        queryArray.push(`filesize=${queryTemplate.size}`);

    if(queryTemplate.type != null)
        queryArray.push(`filetype=${queryTemplate.type}`);

    queryArray.push(`page=${queryTemplate.page}`);

    apiRequestUrl += queryArray.join("&"); 

    return this.http.get(apiRequestUrl, { observe: 'response' })
      .pipe(
          map((response_ : any) => {
            return response_;
          }),
          catchError(err => {
            if(err.status == 400)
            {
              if(err.error.errors.Description != undefined)
                return throwError(err.error.errors.Description[0]);
              else
                return throwError(err.error);
            }
            else
              return throwError("An error has occorred. Please try again.");
          })
      )
  }
}
