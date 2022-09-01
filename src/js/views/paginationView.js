import icons from '../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1, there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextPage();
    }
    //Last Page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPreviousPage();
    }
    //Other Page
    if (this._data.page < numPages) {
      return this._generateMarkupPreviousPage().concat(
        this._generateMarkupNextPage()
      );
    }
    //Page 1, there are no other pages.
    return '';
  }

  _generateMarkupNextPage() {
    return ` 
    <button data-goto = "${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }

  _generateMarkupPreviousPage() {
    return ` 
    <button data-goto = "${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
    </button>`;
  }
}

export default new PaginationView();
