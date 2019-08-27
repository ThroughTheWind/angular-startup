import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostsListComponent implements OnInit {
  posts: Post[];
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.getPosts();
  }

  delete(post: Post) {
    this.postsService.deletePost(post).subscribe();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

}
