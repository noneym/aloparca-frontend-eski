import Flatpickr from 'react-flatpickr';
import { Turkish } from 'flatpickr/dist/l10n/tr';
import styled from 'styled-components';

const Outer = styled.div`
  label {
    display: none;
  }
  input {
    display: ${props => (props.inline ? 'none' : 'block')};
  }
  .flatpickr-calendar {
    position: static;
    width: 100%;
    color: white;
    padding: 40px 50px 30px;
    font-size: 18px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    cursor: default;
    .flatpickr-current-month {
      & > .cur-month {
        margin-right: 10px;
      }
      &,
      input {
        font-size: 30px;
      }
    }
    .flatpickr-month {
      position: relative;
      margin-bottom: 25px;
      .flatpickr-prev-month svg,
      .flatpickr-next-month svg {
        fill: white;
        width: 20px;
      }
      .flatpickr-prev-month {
        right: 40px;
      }
    }
    .dayContainer {
      .flatpickr-day {
        color: white;
        width: 14.28571428571429%;
        height: auto;
        border-radius: 50%;
        display: block;
        &.prevMonthDay,
        &.nextMonthDay {
          opacity: 0.3;
          color: white;
        }
        &:hover {
          background-color: transparent;
          color: white;
        }
        &:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          padding-bottom: 100%;
        }
        &.today {
          background-color: white;
          color: #0f75bc;
          font-weight: bold;
        }
        &.has-event:hover {
          cursor: pointer;
          background-color: #0f75bc;
          .circle {
            background-color: white;
          }
        }
      }
    }
    .flatpickr-weekdays {
      margin-bottom: 15px;
      color: white;
    }
  }
`;

const trLocale = {
  ...Turkish,
  weekdays: {
    ...Turkish.weekdays,
    shorthand: ['Pz', 'P', 'S', 'Ç', 'P', 'C', 'Ct'],
  },
};

const onDayCreate = (dObj, dStr, fp, dayElem) => {
  if (!dayElem.classList.contains('disabled')) {
    dayElem.innerHTML += `<span class="circles">
  <span class="circle" />
</span>`;
    dayElem.classList.add('has-event');
  }
};

const Datepicker = ({ dispatch, ...props }) => {
  const options = props.options || {};
  return (
    <Outer inline={options.inline}>
      <label htmlFor="flatpickr">Tarih Seçici</label>
      <Flatpickr
        id="flatpickr"
        {...{
          ...props,
          options: {
            animate: false,
            locale: trLocale,
            dateFormat: props.lang === 'tr' ? 'd-m-Y' : 'Y/m/d',
            ...options,
          },
          onDayCreate: options.inline && onDayCreate,
        }}
      />
    </Outer>
  );
};

export default Datepicker;
