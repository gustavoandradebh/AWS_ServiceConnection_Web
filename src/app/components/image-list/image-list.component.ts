import { Component, OnInit } from '@angular/core';
import { ImageDetail } from '../../models/imagedetail';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imagesList: ImageDetail[]
}
