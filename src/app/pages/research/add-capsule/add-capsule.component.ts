import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapsulesService } from 'src/app/services/capsules.service';

@Component({
  selector: 'app-add-capsule',
  templateUrl: './add-capsule.component.html',
  styleUrls: ['./add-capsule.component.scss']
})
export class AddCapsuleComponent implements OnInit {
  capsuleData = {
    title: '',
    section: '',
    uid_owner: localStorage.getItem('uid'),
    name_owner: localStorage.getItem('name'),
    reviewers: '',
    status: 'unassigned',
    file: '',
  }
  constructor(private router: Router, private capsulesService: CapsulesService) { }

  ngOnInit(): void {
  }
  onFileSelected(event): void {
    const selectedFile = event.target.files[0];
    this.capsuleData.file = selectedFile.name;
  }
  addCapsule(): void {
    this.capsulesService.create(this.capsuleData).subscribe(
      response => {
        alert('Success')
        this.router.navigate(['research/'])
      }

    )
  }
}
