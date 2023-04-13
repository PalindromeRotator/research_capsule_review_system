import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reviewer } from './reviewer';
import { UsersService } from 'src/app/services/users.service';
import { CapsulesService } from 'src/app/services/capsules.service';

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
    reviewers: ''
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
      name: ''
    }
  ]
  constructor(private route: ActivatedRoute, private users: UsersService, private capsules: CapsulesService, private router: Router) { }

  ngOnInit(): void {
    this.capsuleString = this.route.snapshot.paramMap.get('capsuleData')
    this.capsuleData = JSON.parse(this.capsuleString)
    this.currentReviewer = this.capsuleData.reviewers !== null ? JSON.parse(this.capsuleData.reviewers) : []
    console.log(this.capsuleData)
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
        this.capsuleData.status = 'assigned'
      }
      else {
        this.capsuleData.status = 'unassigned'
      }
    }
    else {
      this.capsuleData.status = 'unassigned'
    }
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        alert('Success')
        this.router.navigate(['/research'])
      }
    )
  }

}
