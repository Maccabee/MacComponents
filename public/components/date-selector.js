(function () {
    class DateSelector extends HTMLElement {
        constructor() {
            super();
        }
        attributeChangedCallback() {
            debugger
        }
        disconnectedCallback() {
            debugger
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
            this._month.addEventListener('change', e => this.changeMonth.call(this, e));
            this._year.addEventListener('change', e => this.changeYear.call(this, e));

            const val = this.value;
            const date = new Date(val);
            this._year.value = date.getFullYear();
            this._month.value = date.getMonth() + 1;
            this._date.value = date.getDate();
        }
        changeMonth(e) {
            const { value } = e.target;
            for (let i = 0; i < this._date.children.length; i++) {
                this._date.children[i].removeAttribute('disabled');
            }
            if (value === '4' || value === '6' || value === '9' || value === '11') {
                this._date.querySelector('[value="31"]').setAttribute('disabled', 'disabled');
            }
            if (value === '2') {
                const days = this._date.querySelectorAll('[value="30"],[value="31"]');
                for (let i = 0; i < days.length; i++) {
                    days[i].setAttribute('disabled', 'disabled');
                }
                if (parseInt(this._year.value, 10) % 4 !== 0) {
                    this._date.querySelector('[value="29"]').setAttribute('disabled', 'disabled');
                }
            }
        }
        changeYear(e) {
            if (this._month.value === '2') {
                const isLeapYear = parseInt(e.target.value, 10) % 4 === 0;
                if (isLeapYear) {
                    this._date.querySelector('[value="29"]').removeAttribute('disabled');
                } else {
                    this._date.querySelector('[value="29"]').setAttribute('disabled', 'disabled');
                }
            }
        }
        get value() {
            return this.dataset['value'];
        }
        set value(val) {
            debugger
            this.dataset['value'] = val;
        }
    }
    customElements.define('date-selector', DateSelector);
})();