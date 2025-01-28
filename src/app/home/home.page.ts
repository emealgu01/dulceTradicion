import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any[] = [];  

  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log('Home Page');
    this.loadPosts(); 
  }

  
  loadPosts() {
    this.postService.getPosts().then((data: any) => {
      console.log(data);  
      this.posts = data;  
    }).catch((error) => {
      console.log(error);
    });
  }

  async addPost() {
    console.log('Open Add Post Modal');
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps: {}
    });

    
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.post) {
        
        this.posts.unshift(result.data.post);  
      }
    });

    return await modal.present();
  }
}
