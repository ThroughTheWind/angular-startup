import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';
import { PostFilters } from '../../models/PostFilters';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostSortType } from '../../enum/post-sort-type';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less'],
  animations: [
    trigger(
        'modalFadeZoom',
        [
            transition(
                ':enter', [
                    style({ transform: 'scale(.7)', opacity: 0 }),
                    animate('1s', style({ opacity: 1, transform: 'scale(1)' })),
                ]
            ),
            transition(
                ':leave', [
                    style({ opacity: 1, transform: 'scale(1)' }),
                    animate('0.5s', style({ opacity: 0, transform: 'scale(.7)' })),
                ]
            ),
        ])
]
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;
  masonryOptions = {
    resize: true,
    initLayout: true
  }
  filters: PostFilters;

  constructor(public postsService: PostsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadPosts();
  }

  delete(post: Post) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {title: 'Confirm', text:`Do you wish to delete the post ${post.name} ?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {        
        this.postsService.deletePost(post).subscribe();
      }
    })
  }

  loadPosts() {
    this.posts = this.postsService.getPosts().pipe(
      map(posts => {
        return this.filterPosts(posts);
      })
    );
  }

  onFiltered(filters: PostFilters) {
    this.filters = filters;
    this.loadPosts();
  }

  filterPosts(posts: Post[]): Post[] {
    if(this.filters) {
      if(this.filters.name) {
        posts = posts.filter(post => RegExp(this.filters.name).test(post.name));
      }

      if(this.filters.createdAt.start) {
        posts = posts.filter(post => post.createdAt >= this.filters.createdAt.start);
      }

      if(this.filters.createdAt.end) {
        posts = posts.filter(post => post.createdAt <= this.filters.createdAt.end);
      }

      if(this.filters.sortType) {
        switch(this.filters.sortType) {
          case PostSortType.CREATEDAT:
            posts = posts.sort((a, b) => {return a.createdAt > b.createdAt ? -1 : 1})
            break;
          case PostSortType.TITLE:
            posts = posts.sort((a, b) => {return a.name > b.name ? -1 : 1})
            break;
        }
      }
    }
    return posts;
  }

}
