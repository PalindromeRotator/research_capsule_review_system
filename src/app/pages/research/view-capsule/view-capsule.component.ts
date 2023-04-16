import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reviewer } from './reviewer';
import { UsersService } from 'src/app/services/users.service';
import { CapsulesService } from 'src/app/services/capsules.service';
import { comments } from './comments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-capsule',
  templateUrl: './view-capsule.component.html',
  styleUrls: ['./view-capsule.component.scss']
})

export class ViewCapsuleComponent implements OnInit {

  capsuleString: string;
  capsuleData = {
    id: 0,
    title: '',
    status: '',
    file: '',
    uid_owner: '',
    section: '',
    reviewers: '',
    comments: '',
    blob_file: null,
  };
  currentReviewer: Array<reviewer> = [
    {
      uid: '',
      name: ''
    }
  ]
  availableReviewer: Array<reviewer> = [
    {
      uid: '',
      name: '',
    }
  ]
  comments: Array<comments> = [
    {
      uid: '',
      name: '',
      comment: '',
      date: '',
    }


  ]
  commentValue: string;
  constructor(private route: ActivatedRoute, private users: UsersService, private capsules: CapsulesService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.capsuleString = this.route.snapshot.paramMap.get('capsuleData')
    this.capsuleData = JSON.parse(this.capsuleString)
    this.currentReviewer = this.capsuleData.reviewers !== null ? JSON.parse(this.capsuleData.reviewers) : []
    this.comments = this.capsuleData.comments !== null ? JSON.parse(this.capsuleData.comments) : []
    this.getAllReviewer()
  }
  getAllReviewer(): void {
    this.availableReviewer = []
    this.users.getAllReviewer().subscribe(
      response => {

        response.forEach(element => {
          if (element.id !== parseInt(this.capsuleData.uid_owner)) {

            if (this.currentReviewer === null) {
              // console.log('wow')
              this.availableReviewer.push({
                uid: element.id,
                name: element.name
              })
            }
            else {
              if (this.currentReviewer.find(reviewer => reviewer.uid === element.id)) {
              }
              else {
                this.availableReviewer.push({
                  uid: element.id,
                  name: element.name
                })
              }
            }

          }

        })
      }
    )
  }
  AddReviwer(id: string): void {

    this.currentReviewer.push(this.availableReviewer.splice(this.availableReviewer.indexOf(this.availableReviewer.find(reviewer => reviewer.uid === id)), 1)[0])
  }

  RemoveReviewer(id: string): void {

    this.availableReviewer.push(this.currentReviewer.splice(this.currentReviewer.indexOf(this.currentReviewer.find(reviewer => reviewer.uid === id)), 1)[0])
  }

  saveCapsuleChanges(): void {

    this.capsuleData.reviewers = JSON.stringify(this.currentReviewer)
    if (this.currentReviewer !== null) {
      if (this.currentReviewer.length > 0) {
        this.capsuleData.status = 'Assigned'
      }
      else {
        this.capsuleData.status = 'Unassigned'
      }
    }
    else {
      this.capsuleData.status = 'Unassigned'
    }
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        alert('Success')
        this.router.navigate(['/research'])
      }
    )
  }
  addCommment(): void {
    const date = new Date();
    this.comments.push({
      uid: localStorage.getItem('uid'),
      name: localStorage.getItem('name'),
      comment: this.commentValue,
      date: date.toDateString(),
    })
    this.capsuleData.comments = JSON.stringify(this.comments)
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        this.commentValue = '';
        this.capsules.get(this.capsuleData.id).subscribe(
          response => {
            this.comments = JSON.parse(response.comments)
          }
        )
      }
    )
  }

  markAsComplete(): void {
    this.capsuleData.status = 'Completed'
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        this.router.navigate(['/research'])
      }
    )
  }

  returnFile(): void {
    this.capsuleData.status = 'Under Revision'
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        this.router.navigate(['/research'])
      }
    )
  }

  downloadFile(): void {
    const url = URL.createObjectURL(new Blob([this.capsuleData.blob_file]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.capsuleData.title}.pdf`;
    link.click();

    console.log(this.capsuleData.blob_file)
  }

}
