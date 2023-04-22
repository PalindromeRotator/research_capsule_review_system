import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reviewer } from './reviewer';
import { UsersService } from 'src/app/services/users.service';
import { CapsulesService } from 'src/app/services/capsules.service';
import { comments } from './comments';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    grade: '',
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

  userType = localStorage.getItem('user_type')
  uid = localStorage.getItem('uid')
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
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully save a capsule changes',
        }).then((result) => {
          this.router.navigate(['research/'])
        })
      },
      error => {
        console.log(error)
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
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully marked a capsule as completed',
        }).then((result) => {
          this.router.navigate(['research/'])
        })
      }
    )
  }

  returnFile(): void {
    this.capsuleData.status = 'Under Revision'
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully return a capsule',
        }).then((result) => {
          this.router.navigate(['research/'])
        })
      }
    )
  }

  downloadFile(): void {
    const url = URL.createObjectURL(new Blob([this.capsuleData.blob_file]));
    const link = document.createElement('a');
    link.download = `${this.capsuleData.title}.pdf`;
    link.href = url;
    link.click();

    console.log(this.capsuleData.blob_file)
    console.log(url)
  }

  resubmitCapsule(): void {
    this.capsuleData.status = 'Assigned'
    this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Successfully resubmit a capsule',
        }).then((result) => {
          this.router.navigate(['research/'])
        })
      }
    )
  }

  updateGrade(): void {
    if (this.capsuleData.grade) {
      console.log(this.capsuleData.grade, this.capsuleData.grade !== '')
      this.capsules.update(this.capsuleData.id, this.capsuleData).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Successfully updated a capsule',
          }).then((result) => {
            this.router.navigate(['research/'])
          })
        }
      )
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cannot be empty',
      })
    }
  }

  onFileSelected(event): void {
    // const selectedFile = <File>event.target.files[0];
    // let blob = new Blob(event.target.files, { type: event.target.files[0].type });
    // let url = window.URL.createObjectURL(blob);
    // this.capsuleData.file = event.target.files[0].name
    // this.capsuleData.blob_file = blob
    console.log(event.target.files[0].type)
    if (event.target.files[0].type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(event.target.files[0]);

      fileReader.onload = () => {
        const pdfBlob = new Blob([fileReader.result], { type: 'application/pdf' });
        console.log('PDF Blob:', pdfBlob);
        this.capsuleData.file = event.target.files[0].name
        this.capsuleData.blob_file = pdfBlob
        console.log(pdfBlob)
      };
    } else {
      console.log('Invalid file type. Only PDF files are allowed.');
    }
  }

}
