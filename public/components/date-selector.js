(function () {
    class DateSelector extends HTMLElement {
        constructor() {
            super();
        }
        static get observedAttributes() {
            return ['date'];
        }
        attributeChangedCallback(attr, b, value) {
            if (this.initiated && attr === 'date') {
                const date = new Date(value) || false;
                if (date) {
                    this._year.value = date.getFullYear();
                    this._month.value = date.getMonth() + 1;
                    this._date.value = date.getDate();
                } else {
                    this._date.value = '';
                    this._month.value = '';
                    this._year.value = '';
                    this.date = '';
                }
            }
        }
        disconnectedCallback() {
            this._month.removeEventListener('change', e => this.changeMonth.call(this, e));
            this._year.removeEventListener('change', e => this.changeYear.call(this, e));
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
            this.initiated = true;
            this.attributeChangedCallback('date', null, this.date);
        }
        changeMonth(e) {
            const { value } = e.target;
            for (let i = 0; i < this._date.children.length; i++) {
                this._date.children[i].removeAttribute('disabled');
            }
            if (value === '2' || value === '4' || value === '6' || value === '9' || value === '11') {
                this._date.querySelector('[value="31"]').setAttribute('disabled', 'disabled');
            }
            if (value === '2') {
                this._date.querySelector('[value="30"]').setAttribute('disabled', 'disabled')
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
        get date() {
            return this.getAttribute('date');
        }
        set date(val) {
            this.setAttribute('date', val);
        }
    }
    customElements.define('date-selector', DateSelector);
})();