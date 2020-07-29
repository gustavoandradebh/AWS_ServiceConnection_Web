import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {  }

  description: string = null;
  fileToUpload: File = null;
  errors: string = null;
  messageOk: string = null;
  validationDescription: string = null;
  validationFileInput: string = null;

  onSelectFile(files) {
    this.fileToUpload = files.item(0);
  }

  checkSubmitStatus(){
    this.errors = "";
    this.messageOk = "";
    this.validationFileInput = "";
    this.validationDescription = "";

    let isValid = true;

    if (this.fileToUpload === null) {
      this.validationFileInput = "Required"
      this.errors = "Failed"
      isValid = false;
    }
    else if(this.fileToUpload.type != "image/jpeg" &&
      this.fileToUpload.type != "image/png") {
      this.validationFileInput = "Please select an JPEG or PNG image"
      this.errors = "Failed"
      isValid = false;
    }
    else if(this.fileToUpload.size > (500 * 1024)) {
      this.validationFileInput = "Please select an image smaller than 500kb"
      this.errors = "Failed"
      isValid = false;
    }

    if(this.description == null || this.description == "") {
      this.validationDescription = "Required"
      this.errors = "Failed"
      isValid = false;
    }

    return isValid;
  }

  submitForm() {

    if(!this.checkSubmitStatus())
      return;
  
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(this.fileToUpload);

    const formData = new FormData(); 
    formData.append('ImageFile', this.fileToUpload, this.fileToUpload.name);

    if(this.description != null)
      formData.append('Description', this.description); 

    this.api.postImage(formData)
      .subscribe((result: string) => {
        this.messageOk = "Success";
        this.description = null;
      }, (err: any) => {
        this.errors = err;
      });
  }
}
