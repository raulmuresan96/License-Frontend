import { Component, OnInit } from '@angular/core';

import {AuthorService} from '../../shared-service/author.service'
import {Author} from '../../author'
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listauthor',
  templateUrl: './listauthor.component.html',
  styleUrls: ['./listauthor.component.css']
})
export class ListauthorComponent implements OnInit {
  private authors: Author[];
  private searchString: string;
  private selectedFile = null;
  private publicationCsv :File;
  private citationCsv = null;
  private lastSelectedAuthor: Author = null; 
  constructor(private _authorService: AuthorService, private http: HttpClient) { }

  ngOnInit() {
    console.log('ListAuthorcomponent was initialized');
    // this._authorService.doRequest().subscribe((authors) => 
    // {
    //   console.log(authors);
    //   //console.log("!!!!" + authors[0].authorId + " " + authors[0].firstname + " " + authors[0].surname);
    //   this.authors = authors
      
    // },
    // (error) =>{
    //   console.log(error);
    // }
    // );

  // this._authorService.postRequest().subscribe((response) => 
  //   {
  //     console.log(response);
  //     // console.log("!!!!" + authors[0].authorId + " " + authors[0].firstname + " " + authors[0].surname);
  //     // this.authors = authors
      
  //   },
  //   (error) =>{
  //     console.log(error);
  //   }
  // );
  }

  checkIfHighLight(author){
    console.log("ajunge la verificare")
    if(author.authorId == 808)
      return true;
    
    // return false;
  }
  isActive(){
    console.log("ajunge la activare")
    return true;
  }


  authorClick(author){
    console.log("click pe autor")
    this.lastSelectedAuthor = author
  }


  method() {
  //   const fd = new FormData()
  //   fd.append('image', this.publicationCsv, this.publicationCsv.name)
  // this.http.post("http://localhost:8090/upload", fd)
  // .subscribe(res =>{
  //   console.log(res);
  // })
  var authorName
  authorName = this.lastSelectedAuthor.firstname + " " + this.lastSelectedAuthor.surname
  //console.log(this.authors)
  if(this.lastSelectedAuthor == null )
    return;
    console.log("Generare PDF");

     const citationFd = new FormData()
     const publicationFd = new FormData()
     citationFd.append("publicationCsv", this.publicationCsv)
     citationFd.append("citationCsv", this.citationCsv)
     citationFd.append("authorName", authorName)

     publicationFd.append("publicationCsv", this.publicationCsv)
     //publicationFd.append("authorName", "Raul Muresan")
     publicationFd.append("authorName", authorName)
    //console.log(authorName);
     

     this.http.post("http://localhost:8090/publicationPdf", publicationFd, {responseType: 'arraybuffer'})
      .subscribe(res =>{
        console.log("Publication")
        console.log(res)
        var blob = new Blob([res], {type: 'application/octet-stream'})
        // console.log(res);
        // console.log(blob);
        saveAs(blob, "publication.pdf")
      })

      this.http.post("http://localhost:8090/citationPdf", citationFd, {responseType: 'arraybuffer'})
      .subscribe(res =>{
        console.log(res)
        var blob = new Blob([res], {type: 'application/octet-stream'})
        console.log(res);
        console.log(blob);
         saveAs(blob, "citation.pdf")
      })

      //this.http.post()
    // console.log(this.publicationCsv)
    // var fr = new FileReader();
    // var result = fr.readAsArrayBuffer(this.publicationCsv.);
    // console.log(result);
  //   this._authorService.postRequest(this.publicationCsv).subscribe((response) => 
  //   {
  //     console.log(response);
  //     // console.log("!!!!" + authors[0].authorId + " " + authors[0].firstname + " " + authors[0].surname);
  //     // this.authors = authors
      
  //   },
  //   (error) =>{
  //     console.log(error);
  //   }
  // );
    //console.log("On Click Listener " + this.searchString);
  }


  onSearchChange(searchValue: string) {
    
    console.log("A fost cautat " + searchValue);
    
    if(searchValue == null || searchValue == ""){
      this.authors = []
      return ;
    }
     
    this._authorService.doRequest(searchValue).subscribe((authors) => 
    {
      console.log(authors);
      this.authors = authors
      
    },
    (error) =>{
      console.log(error);
    }
    );
  }



  search() {
    console.log("SearchFunction " + this.searchString);
    this._authorService.doRequest(this.searchString).subscribe((authors) => 
    {
      console.log(authors);
      this.authors = authors
      
    },
    (error) =>{
      console.log(error);
    }
    );
  }

  uploadPublicationCsv(event){
    console.log(event);
    this.publicationCsv = <File>event.target.files[0];
  }

  uploadCitationCsv(event){
    console.log(event);
    this.citationCsv = event.target.files[0];
  }


  // onChangeListener(event) {
  //   console.log(event);
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile);
  // }



}
