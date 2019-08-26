import { Post } from '../../models/Post';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deleted = new EventEmitter<Post>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.post);
  }

}
