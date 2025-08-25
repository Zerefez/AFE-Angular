import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Course } from './course';

@Component({
  selector: 'app-course-list-item',
  imports: [CommonModule],
  templateUrl: './course-list-item.component.html',
  styleUrl: './course-list-item.component.scss'
})
export class CourseListItemComponent {
  @Input() courses!: Course[];
}
