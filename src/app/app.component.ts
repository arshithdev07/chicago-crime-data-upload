import { Component } from '@angular/core';
import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChicagoCrimeFrontend';
  fileReaded: File;

  constructor(private  httpClient:HttpClient) {}

  ngOnInit() {
    this.httpClient.get("http://localhost:8080/crimes")
    .subscribe( data => console.log(data));
  }

  csv2ArrayCommunities(fileInput: any){
    //read file from input
    this.fileReaded = fileInput.target.files[0];
    
    let reader: FileReader = new FileReader();
    reader.readAsText(this.fileReaded);
    
     reader.onload = (e) => {
     let csv: String = reader.result.toString();
     let allTextLines = csv.split(/\r|\n|\r/);
     let headers = allTextLines[0].split(',');
     let lines = [];
    
      for (let i = 0; i < allTextLines.length; i++) {
        let data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          let tarr = {communityNo: 0, communityName: ''};
          let objectKeys = Object.keys(tarr);
          for (let j = 0; j < headers.length; j++) {
            if(j == 0) {
              console.log(Number(data[j]))
              tarr[objectKeys[j]] = Number(data[j]);
            } else {
              tarr[objectKeys[j]] = data[j];
            }
          }
  
         console.log(tarr);
         lines.push(tarr);
      }
     }
     console.log(">>>>>>>>>>>>>>>>>", lines);
     this.httpClient.post("http://localhost:8080/uploadCommunities",lines)
    .subscribe(
        (val) => {
            console.log("POST call successful value returned in body", 
                        val);
        },
        response => {
            console.log("POST call in error", response);
        },
        () => {
            console.log("The POST observable is now completed.");
        });
      } 
    }

    csv2ArrayDistricts(fileInput: any){
      //read file from input
      this.fileReaded = fileInput.target.files[0];
      
      let reader: FileReader = new FileReader();
      reader.readAsText(this.fileReaded);
      
       reader.onload = (e) => {
       let csv: String = reader.result.toString();
       let allTextLines = csv.split(/\r|\n|\r/);
       let headers = allTextLines[0].split(',');
       let lines = [];
      
        for (let i = 0; i < allTextLines.length; i++) {
          let data = allTextLines[i].split(',');
          if (data.length === headers.length) {
            let tarr = {districtNo: 0, districtName: ''};
            let objectKeys = Object.keys(tarr);
            for (let j = 0; j < headers.length; j++) {
              if(j == 0) {
                console.log(Number(data[j]))
                tarr[objectKeys[j]] = Number(data[j]);
              } else {
                tarr[objectKeys[j]] = data[j];
              }
            }
    
           console.log(tarr);
           lines.push(tarr);
        }
       }
       console.log(">>>>>>>>>>>>>>>>>", lines);
       this.httpClient.post("http://localhost:8080/uploadDistricts",lines)
      .subscribe(
          (val) => {
              console.log("POST call successful value returned in body", 
                          val);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
        } 
      }

      csv2ArrayCrimeCodes(fileInput: any){
        //read file from input
        this.fileReaded = fileInput.target.files[0];
        
        let reader: FileReader = new FileReader();
        reader.readAsText(this.fileReaded);
        
         reader.onload = (e) => {
         let csv: String = reader.result.toString();
         let allTextLines = csv.split(/\r|\n|\r/);
         let headers = allTextLines[0].split(',');
         let lines = [];
        
          for (let i = 0; i < allTextLines.length; i++) {
            let data = allTextLines[i].split(',');
            if (data.length === headers.length) {
              let tarr = {iucr: '', primaryDescription: '', secondaryDescription: ''};
              let objectKeys = Object.keys(tarr);
              for (let j = 0; j < headers.length; j++) { 
                  tarr[objectKeys[j]] = data[j];
              }
      
             console.log(tarr);
             lines.push(tarr);
          }
         }
         console.log(">>>>>>>>>>>>>>>>>", lines);
         this.httpClient.post("http://localhost:8080/uploadCrimeCodes",lines)
        .subscribe(
            (val) => {
                console.log("POST call successful value returned in body", 
                            val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
          } 
        }

        csv2ArrayCrimes(fileInput: any){
          //read file from input
          this.fileReaded = fileInput.target.files[0];
          
          let reader: FileReader = new FileReader();
          reader.readAsText(this.fileReaded);
          
           reader.onload = (e) => {
           let csv: String = reader.result.toString();
           let allTextLines = csv.split(/\r|\n|\r/);
           let headers = allTextLines[0].split(',');
           let lines = [];
          
            for (let i = 0; i < allTextLines.length; i++) {
              let data = allTextLines[i].split(',');
              if (data.length === headers.length) {
                let tarr = {caseNumber: '', crimeDate: new Date(), block: '', crimeCode: {iucr: ''}, locationDescription: '', arrest: false, domestic: false, beat: '', district: {districtNo: 0}, communityArea:{communityNo: 0}};
                let objectKeys = Object.keys(tarr);
                for (let j = 0; j < headers.length; j++) { 
                  if(j == 0) tarr.caseNumber = data[j]
                  else if(j == 1) tarr.crimeDate = new Date(data[j])
                  else if(j ==2) tarr.block = data[j]
                  else if(j == 3) tarr.crimeCode.iucr = data[j]
                  else if(j == 4) tarr.locationDescription = data[j]
                  else if(j == 5) tarr.arrest = Boolean(data[j])
                  else if(j == 6) tarr.domestic = Boolean(data[j])
                  else if(j == 7) tarr.beat = data[j]
                  else if(j == 8) tarr.district.districtNo = Number(data[j])
                  else if(j == 9) tarr.communityArea.communityNo = Number(data[j])


                    
                }
        
               console.log(tarr);
               lines.push(tarr);
            }
           }
           console.log(">>>>>>>>>>>>>>>>>", lines);
           this.httpClient.post("http://localhost:8080/uploadCrimes",lines)
          .subscribe(
              (val) => {
                  console.log("POST call successful value returned in body", 
                              val);
              },
              response => {
                  console.log("POST call in error", response);
              },
              () => {
                  console.log("The POST observable is now completed.");
              });
            } 
          }
}

