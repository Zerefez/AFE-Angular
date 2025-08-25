import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Course } from './course-list-item/course';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, CourseListItemComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lesson-01';
  courses: Course[] = [
    { name: 'Angular', code: 'ANG101', ects: 6 },
    { name: 'React', code: 'REA101', ects: 6 },
    { name: 'Vue', code: 'VUE101', ects: 6 },
  ];
}
