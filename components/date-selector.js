(function () {
    class DateSelector extends HTMLElement {
        constructor() {
            super();
        }
        attributeChangedCallback(name, oldValue, newValue) {
        }

        connectedCallback() {
            this.innerHTML = `<div class="ds-group">
                <select class="form-control ds-select ds-month">
                    <option value="">mm</option>
                </select>
                <select class="form-control ds-select ds-date">
                    <option value="">dd</option>
                </select>
                <select class="form-control ds-select ds-year">
                    <option value="">yy</option>
                </select>
            </div>`;
            this._date = this.querySelector('.ds-date');
            this._month = this.querySelector('.ds-month');
            this._year = this.querySelector('.ds-year');

            for (let i = 1; i < 32; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.text = i;
                this._date.appendChild(option);
            }

            for (let i = 1; i < 13; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.text = i;
                this._month.appendChild(option);
            }

            const today = new Date();
            const maxYear = today.getFullYear() - 50;
            for (let i = today.getFullYear(); i > maxYear; i--) {
                const option = document.createElement('option');
                option.value = i;
                option.text = i;
                this._year.appendChild(option);
            }
        }
    }
    customElements.define('date-selector', DateSelector);
})();