import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapsulesService } from 'src/app/services/capsules.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  researchArray: Array<Object>
  userType = localStorage.getItem('user_type')
  uid = localStorage.getItem('uid')
  constructor(private router: Router, private CapsulesService: CapsulesService) { }
  reviewerList: Array<Object> = [
    {
      uid: 2,
      name: 'Mike Villarta'
    },
    {
      uid: 3,
      name: 'Douglas Mc Arthur'
    }
  ]
  closeResult = '';
  ngOnInit(): void {
    this.CapsulesService.getAll().subscribe(
      response => {
        this.researchArray = response;
      },
      error => {

      }
    )
  }

  viewCapsule(id: string, title: string, section: string, status: string, file: string, uid_owner: string, reviewers: Array<string>) {
    const stringifyVar = JSON.stringify({
      id: id,
      uid_owner: uid_owner,
      title: title,
      status: status,
      section: section,
      file: file,
      reviewers: reviewers
    })
    this.router.navigate(['/research/view-capsule/', stringifyVar])
  }
  addCapsule() {
    this.router.navigate(['/research/add-capsule'])
  }


  assignReviewer(id: String): void {
    var toStringVar = JSON.stringify(this.reviewerList)
    this.CapsulesService.update(id, { status: 'assigned', reviewers: toStringVar }).subscribe(
      response => {
        window.location.reload()
      },
      error => {

      }
    )
  }
  completeCapsule(id: String): void {
    this.CapsulesService.update(id, { status: 'completed' }).subscribe(
      response => {
        window.location.reload()
      },
      error => {

      }
    )
  }
  returnCapsule(id: String): void {
    this.CapsulesService.update(id, { status: 'under_revision' }).subscribe(
      response => {
        window.location.reload()
      },
      error => {

      }
    )
  }
}
