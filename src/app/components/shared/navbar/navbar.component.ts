import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navMenu')
  navMenu!: ElementRef;
  @ViewChild('header')
  header!: ElementRef;
  @ViewChild('iconTheme')
  iconTheme!: ElementRef;
  darkTheme = 'dark-theme';
  iconClass = 'bx-sun';

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY >= 100) {
        this.header.nativeElement.classList.add('scroll-header');
      } else {
        this.header.nativeElement.classList.remove('scroll-header');
      }
    });
  }

  ngAfterViewInit(): void {
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    if (selectedTheme) {
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        this.darkTheme
      );
      this.iconTheme.nativeElement.classList[
        selectedIcon === 'bx-moon' ? 'add' : 'remove'
      ](this.iconClass);
    }
  }

  showMenu(): void {
    this.navMenu.nativeElement.classList.toggle('show-menu');
  }

  getCurrentTheme(): string {
    const darkTheme = 'dark-theme';
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
  }

  getCurrentIcon(): string {
    return this.iconTheme.nativeElement.classList.contains(this.iconClass)
      ? 'bx-moon'
      : 'bx-sun';
  }

  changeTheme(): void {
    document.body.classList.toggle(this.darkTheme);
    this.iconTheme.nativeElement.classList.toggle(this.iconClass);
    localStorage.setItem('selected-theme', this.getCurrentTheme());
    localStorage.setItem('selected-icon', this.getCurrentIcon());
  }
}
