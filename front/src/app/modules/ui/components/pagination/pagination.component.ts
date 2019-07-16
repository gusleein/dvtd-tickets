/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 19/06/2019.
 */
import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from "@angular/core";

@Component({
  selector: 'ui-pagination, uiPagination, pagination',
  exportAs: 'uiPagination',
  template: `
    <div class="pagination">
      <div class="ui right floated pagination menu">
        <a class="icon item"
           [ngClass]="{'disabled': prevDisabled}"
           (click)="first()">
          <i class="step backward icon"></i>
        </a>
        <a class="icon item"
           [ngClass]="{'disabled': prevDisabled}"
           (click)="prev()">
          <i class="left chevron icon"></i>
        </a>

        <a *ngFor="let p of pagesToShow"
           class="item"
           [ngClass]="{'active': p == currentPage}"
           (click)="setPage(p)">{{ p }}</a>

        <a class="icon item"
           [ngClass]="{'disabled': nextDisabled}"
           (click)="next()">
          <i class="right chevron icon"></i>
        </a>
        <a class="icon item"
           [ngClass]="{'disabled': nextDisabled}"
           (click)="last()">
          <i class="step forward icon"></i>
        </a>
      </div>
    </div>
  `,
  styles: [`
      .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      .ui.pagination.menu {
          border-bottom: none;
      }
  `]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() pagesCount: number = 1;
  @Input() currentPage: number = 1;
  @Input() keyNavigation: boolean = false;
  @Output() change: EventEmitter<number> = new EventEmitter();

  // Клавиши управления
  @HostListener('window:keyup', ['$event']) keyEvent(e: KeyboardEvent) {
    if (this.keyNavigation) {
      // Листаем страницы вправо
      if (e.code === 'ArrowRight') {
        this.next();
      }
      // Листаем страницы влево
      if (e.code === 'ArrowLeft') {
        this.prev();
      }
      // Листаем в начало
      if (e.code === 'ArrowLeft' && e.shiftKey) {
        this.first();
      }
      // Листаем до конца
      if (e.code === 'ArrowRight' && e.shiftKey) {
        this.last();
      }
    }
  }

  prevDisabled = false;
  nextDisabled = false;

  itemsSize = 1;
  maxItemsSize = 5;

  pagesToShow: number[];

  ngOnInit() {
    // колличество элементов в пагинации
    if (this.pagesCount < this.maxItemsSize) {
      this.itemsSize = this.pagesCount;
    } else {
      this.itemsSize = this.maxItemsSize;
    }

    // устанавливаем 1 страницу по умолчанию
    this.currentPage = 1;
    this.pagesToShow = [1];
    this.updateButtonsState();
  }

  ngOnChanges() {
    this.updateList();
    this.updateButtonsState();
  }

  updateList() {
    // set length of page list
    if (this.pagesCount >= this.maxItemsSize) {
      this.itemsSize = this.maxItemsSize;
    } else {
      this.itemsSize = this.pagesCount;
    }

    // список страниц для вывода в пагинатор
    this.pagesToShow = [];

    if (this.itemsSize == this.maxItemsSize) {

      // центруем текущую страницу
      if (this.currentPage > 2 && this.currentPage < this.pagesCount - 1) {
        // отображаем три страницы назад и три вперед
        for (let page = this.currentPage - 3; page <= this.currentPage + 1; page++) {
          this.pagesToShow.push(page + 1);
        }
      } else if (this.currentPage > this.pagesCount) {
        this.currentPage = this.pagesCount;
        this.pagesToShow = [this.currentPage];
      }
      // не центруется когда курсор в начале списка
      else if (this.currentPage <= 2) {
        for (let page = 1; page <= this.itemsSize; page++) {
          this.pagesToShow.push(page);
        }
      }
      // либо когда в конце списка
      else if (this.currentPage >= this.pagesCount - 1) {
        for (let page = this.pagesCount - this.itemsSize + 1; page <= this.pagesCount; page++) {
          this.pagesToShow.push(page);
        }
      }
    } else {
      for (let page = 1; page <= this.itemsSize; page++) {
        this.pagesToShow.push(page);
      }
    }
  }

  updateButtonsState() {
    // если текущая страница первая, то блокируем кнопки first/prev
    this.prevDisabled = this.currentPage === 1;

    // если текущая страница последняя, то блокируем кнопки next/last
    this.nextDisabled = this.currentPage === this.pagesCount;
  }

  setPage(num: number) {
    this.currentPage = num;
    this.change.emit(num);

    this.updateList();
    this.updateButtonsState();
  }

  first() {
    if (this.currentPage > 1) this.setPage(1);
  }

  prev() {
    if (this.currentPage > 1) this.setPage(this.currentPage - 1);
  }

  next() {
    if (this.currentPage < this.pagesCount) this.setPage(this.currentPage + 1);
  }

  last() {
    if (this.currentPage < this.pagesCount) this.setPage(this.pagesCount);
  }
}
