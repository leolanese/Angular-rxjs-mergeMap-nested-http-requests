import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map, mergeMap, first } from "rxjs/operators";
import { Http } from "@angular/http";
import "rxjs/Rx";

@Component({
  selector: "my-app",
  styleUrls: ['./app.component.css'],
  template: `
  <table>
  <tr>
    <th>ID</th>
    <th>POST</th>
  </tr>
  <tr>
    <td>{{ post$.id }}</td>
    <td>{{ post$.body }}</td>
  </tr>
  `
})
export class AppComponent {
  post$ = {};

  constructor(private http: Http) {
    const url = "https://jsonplaceholder.typicode.com/posts";

    // First XHR: get users list
    this.http

    // option 1 using no pipes
    // .get(url)
    // .map(res => res.json())
    // Second XHR: get info about the first user of the list
    // .mergeMap(posts => this.http.get(`${url}/${posts[0].id}`))
    // .map(res => res.json())
    // .first()
    //.tap((item) => console.log(item))
    // .subscribe(
    //   res => this.post$ = res          
    // ); 

    // option 2 piping the requests
      .get(url).pipe(
        map(res => res.json()),
        mergeMap(posts => this.http.get(`${url}/${posts[0].id}`)),
        map(res => res.json()),
        first(),
        tap((item) => console.log(item))
      )
      .subscribe(
        res => (this.post$ = res)
      );
  }
}
