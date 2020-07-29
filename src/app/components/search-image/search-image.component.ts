import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ImageQueryTemplate } from '../../models/imagequerytemplate';
import { ImageDetail } from '../../models/imagedetail';

@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.css']
})
export class SearchImageComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.submitSearch();
  }

  imageList: Array<any>;
  description: string = null;
  imageType: string = null;
  imageSize: number = null;
  errors: string = null;
  isLoading$: boolean = false;
  pageNumber: number = 0;

  onDescription(description) {
    if(description == "")
      this.description = null;
    else
      this.description = description;
  }

  onImageSize(size) {
    if(size == "" || size == 0)
      this.imageSize = null;
    else
      this.imageSize = size;
  }

  onFileType(type: string) {
    if(type == "")
      this.imageType = null;
    else
      this.imageType = type.toLowerCase();
  }

  onScroll() {
    if(this.pageNumber > 0)
      this.queryApi(this.pageNumber);
  }

  submitSearch() {
    this.imageList= new Array<ImageDetail>();
    this.queryApi(0);
  }

  queryApi(page) {
    this.errors = null;

    let queryTemplate = new ImageQueryTemplate();
    queryTemplate.description = this.description;
    queryTemplate.size = this.imageSize;
    queryTemplate.type = this.imageType;
    queryTemplate.page = page;

    this.pageNumber = page;

    this.api.getImages(queryTemplate)
      .subscribe((result: any) => {
        if(result.status == 200) {
          this.imageList = this.imageList.concat(result.body);
          this.pageNumber++;
        }
        else
        {
          if(this.pageNumber == 0) {
            this.errors = "Results not found."
            this.imageList = new Array<ImageDetail>();
          }
        }
      }, (err: any) => {
        this.imageList = new Array<ImageDetail>();
        this.errors = err;
      });
  }

}
