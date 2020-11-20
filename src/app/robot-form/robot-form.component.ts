import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Robot } from './robot';
import { COORDINATES } from './constants';

@Component({
  selector: 'app-robot-form',
  templateUrl: './robot-form.component.html',
  styleUrls: ['./robot-form.component.css'],
})
export class RobotFormComponent implements OnInit {
  constructor() {}

  robot = new Robot();
  profileForm = new FormGroup({
    userInput: new FormControl(''),
  });
  coordinates = COORDINATES;

  onSubmit() {
    this.robot.processInput(this.profileForm.value.userInput);
    this.profileForm.setValue({ userInput: '' });
  }

  ngOnInit(): void {}
}
