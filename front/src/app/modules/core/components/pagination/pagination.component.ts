import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {RouteParams} from "@modules/core/shared/types";
import {PageLinkItem} from "./pagination.models";

@Component({
  selector: 'app-pagination, pagination',
  exportAs: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  page: number = 1;

  @Input()
  pagesCount = 1;

  pageListLength = 1;
  maxPageListLength = 7;

  allItems: PageLinkItem[] = [];
  itemsToShow: PageLinkItem[] = [];
  currentPageItem: PageLinkItem = new PageLinkItem(null, false);
  prevDisabled = false;
  nextDisabled = false;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    // set length of page list
    if (this.pagesCount < this.maxPageListLength) {
      this.pageListLength = this.pagesCount;
    } else {
      this.pageListLength = this.maxPageListLength;
    }

    // fill all items array
    if (this.allItems.length <= 1) {
      for (let i = 0; i < this.pagesCount; i++) {
        this.allItems[i] = new PageLinkItem(i + 1, false);
      }
      this.setPageCursor(1);
    }
    this.updateButtonsState();
    this.itemsToShow = [this.currentPageItem];

    this.route.parent.params.subscribe((params: RouteParams) => {
      if (this.page !== parseInt(params['page'])) {
        this.page = parseInt(params['page']);
        this.updateList();
        this.updateButtonsState();
      }
    });

    this.route.params.subscribe((params: RouteParams) => {
      if (this.page !== parseInt(params['page'])) {
        this.page = parseInt(params['page']);
        this.updateList();
        this.updateButtonsState();
      }
    });
  }

  ngOnChanges() {
    this.updateList();
    this.updateButtonsState();
  }

  updateList() {
    // set length of page list
    if (this.pagesCount >= this.maxPageListLength) {
      this.pageListLength = this.maxPageListLength;
    } else {
      this.pageListLength = this.pagesCount;
    }

    // update all items
    this.allItems = [];
    for (let i = 0; i < this.pagesCount; i++) {
      if (this.page === i + 1) {
        this.allItems[i] = new PageLinkItem(i + 1, true);
        this.setPageCursor(this.page);
      } else {
        this.allItems[i] = new PageLinkItem(i + 1, false);
      }
    }

    this.itemsToShow = [];
    // render with centered item
    if (this.pageListLength == this.maxPageListLength) {
      if (this.currentPageItem.page > 3 && this.currentPageItem.page < this.pagesCount - 2) {
        for (let page = this.currentPageItem.page - 4; page <= this.currentPageItem.page + 2; page++) {
          this.itemsToShow.push(this.allItems[page]);
        }
      } else if (this.currentPageItem.page > this.pagesCount) {
        this.setPageCursor(this.pagesCount);
        this.itemsToShow = [this.currentPageItem];
      } else if (this.currentPageItem.page <= 3) {
        for (let page = 1; page <= this.pageListLength; page++) {
          this.itemsToShow.push(this.allItems[page - 1]);
        }
      } else if (this.currentPageItem.page >= this.pagesCount - 2) {
        for (let page = this.pagesCount - this.pageListLength + 1; page <= this.pagesCount; page++) {
          this.itemsToShow.push(this.allItems[page - 1]);
        }
      }
    } else {
      for (let page = 1; page <= this.pageListLength; page++) {
        this.itemsToShow.push(this.allItems[page - 1]);
      }
    }
  }

  setPageCursor(page: number) {
    this.currentPageItem.active = false;
    this.currentPageItem = this.allItems.find(item => item.page === page);
    this.currentPageItem.active = true;
  }

  next() {
    if (this.currentPageItem.page < this.pagesCount) {
      return this.currentPageItem.page + 1;
    }
    return this.pagesCount;
  }

  prev() {
    if (this.currentPageItem.page > 1) {
      return this.currentPageItem.page - 1;
    }
    return this.currentPageItem.page;
  }

  last() {
    if (this.currentPageItem.page !== this.pagesCount) {
      return this.pagesCount;
    }
    return this.pagesCount;
  }

  updateButtonsState() {
    this.nextDisabled = false;

    this.prevDisabled = this.currentPageItem.page === 1;
    if (this.currentPageItem.page === this.pagesCount) {
      this.nextDisabled = true;
    }
  }
}
