import { Post } from '../../models/Post';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less'],
  animations: [
    trigger('hover', [
      state('hover', style({
        transform: 'scale(1.2)',
        zIndex: 1000
      })),
      state('*', style({
        transform: 'scale(1)',
        zIndex: 0
      })),
      transition('* => hover', [
        style({ zIndex: 1000}),
        animate('0.1s', style({ transform: 'scale(0.95)'})),
        animate('1s', style({ transform: 'scale(1.2)'})),
      ]),
      transition('hover => *', [
        style({ transform: 'scale(1.2)'}),
        animate('1s', style({ transform: 'scale(0.95)'})),
        animate('0.1s', style({ transform: 'scale(1)'})),
        style({ transform: 'scale(1)'}),
      ])
    ])
  ]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Output() deleted = new EventEmitter<Post>();
  hover: string = '*';

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.post);
  }

}
