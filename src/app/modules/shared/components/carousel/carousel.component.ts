import { animate, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { InputItem } from 'src/app/core/models/carousel/Inputs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations:  [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),

    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('600ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
     trigger('slideOutIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
  ]
})
export class CarouselComponent implements OnInit {

  @Input() itemsIn:InputItem[]; // uri images array

  @Input() itemsPerPage:number; // number of items per page to display

  @Output() indexOf = new EventEmitter<number>(); // return the index position of the item that was clicked

  showItemsPerPage: boolean = false;

  currentPage = 0;

  animation='slideInOut';

  img = 'https://source.unsplash.com/random';
  items:any[]=[];

  constructor() { }

  ngOnInit(): void {
    // debugger
    if(this.itemsPerPage > 1){
      let count = 0;
      let arr = [];
      for (let i = 0; i < this.itemsIn.length; i++) {
        count++;
        if(count > this.itemsPerPage){
          this.items.push(arr);
          count = 1;
          arr=[];
        }
        arr.push(this.itemsIn[i]);

        if(i===this.itemsIn.length-1){
          this.items.push(arr);
        }
      }
    }else{
      this.items = this.itemsIn;
    }

    console.log('items var',this.items)
    // Todo: if changePageMode is by time Set Timer
    console.log('elementos por pagina: ',this.itemsPerPage);
    if(this.itemsPerPage !== undefined && this.itemsPerPage > 1){
      this.showItemsPerPage = true;
    } else {
      this.showItemsPerPage = false;
    }
    console.log('mostrar elementos por pagina: ', this.showItemsPerPage)
  }

  previousPage() {
    this.animation = 'slideOutIn';
    const previous = --this.currentPage;
    this.currentPage = 0 > previous ? this.items.length-1 : previous;
  }

  nextPage() {
    this.animation = 'slideInOut';
    const next = ++this.currentPage;
    this.currentPage =  this.items.length === next ? 0 : next;

  }

  onPageIndicatorClick(index: number){
    this.currentPage = index;
  }

}
