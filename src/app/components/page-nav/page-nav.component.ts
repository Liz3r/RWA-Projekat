import { Component } from '@angular/core';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.scss'
})
export class PageNavComponent {

  curentPage: number | null = null;
  maxPages: number | null = null;

  pages!: Array<number>;

  constructor(){}
  
  ngOnInit(): void {
    
  }
  
  ngOnChanges(): void {
    this.pages = Array(this.maxPages).fill(0).map((n,i) => i);
  }

  pageSelected(num: number){
      
  }
}
