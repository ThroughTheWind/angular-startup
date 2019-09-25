import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  masonryOptions = {
    resize: true,
    initLayout: true
  }
  constructor(public postsService: PostsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getPosts();
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

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

}
