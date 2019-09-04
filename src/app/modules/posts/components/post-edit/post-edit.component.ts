import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map, first } from 'rxjs/operators';

import { Post } from '../../models/Post';
import { FormBuilder, Validators, AbstractControl, FormArray  } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { EditState } from '../../enum/edit-state';
import { Image } from 'src/app/shared/models/Image';
import { ImagePickerComponent } from '../../../../shared/forms/image-picker/image-picker.component';


@Component({
  selector: 'app-posts-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.less']
})
export class PostsEditComponent implements OnInit {
  state: EditState = EditState.CREATE;
  postForm = this.fb.group({
    name: ['', Validators.required, this.validateNameNotTaken.bind(this)],
    description: ['', Validators.required],
    images: this.fb.array([])
  });
  post: Post;
  apiError: string = null;

  @ViewChild(ImagePickerComponent, {static: false})
  imagePicker: ImagePickerComponent;

  get name() { return this.postForm.get('name'); }
  get description() { return this.postForm.get('description'); }
  get images() { return this.postForm.get('images'); }


  constructor(public postsService: PostsService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder) { }

  isCreateState() {
    return this.state === EditState.CREATE;
  }

  onSubmit() {
    console.log(this.postForm);
    if (this.postForm.valid) {
      switch (this.state) {
        case EditState.CREATE:
          this.addPost();
          break;
        case EditState.EDIT:
          this.updatePost();
          break;
      }
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.state = EditState.EDIT;
      this.getPost(id);
    } else {
      this.state = EditState.CREATE;
    }
  }

  resetForm() {
    this.postForm.patchValue({
      name: '',
      description: '',
      images: this.fb.array([])
    });
    this.post = {} as Post;
  }

  getPost(id) {
    this.postsService.getPost(id).subscribe((post) => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          name: post.name,
          description: post.description,
          images: []
        });
        this.imagePicker.loadImages(post.images);     
      } else {
        this.navigateToList();
      }
    });
  }

  fetchPost(): Post {
    const post = this.postForm.valid ? this.postForm.value as Post : null;
    if (post && !this.isCreateState()) { post.id = this.post.id; }
    return post;
  }

  addPost() {
    const post = this.fetchPost();
    if (post) {
      this.postsService.addPost(post).subscribe(() => this.navigateToList(), (err) => this.apiError = err);
    }
  }

  updatePost() {
    const post = this.fetchPost();
    if (post) {
      this.postsService.updatePost(post).subscribe(() => this.navigateToList(), (err) => this.apiError = err);
    }
  }

  navigateToList() {
    this.router.navigateByUrl('/posts/list');
  }

  validateNameNotTaken(control: AbstractControl) {
    let id: string = null;
    if (!this.isCreateState()) { id = this.post.id; }
    return this.postsService.checkNameNotTaken(control.value, id)
      .pipe(
        map(res => res ? null : {nameTaken: true}),
        first()
      );
  }

}

