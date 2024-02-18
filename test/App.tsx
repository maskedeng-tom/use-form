import { useState } from 'react';
import { useGlobalCss } from '@maskedeng-tom/use-css';
import Test, { FormProps, FormPropsOptions } from './Test';
import Sample from './Sample';

////////////////////////////////////////////////////////////////////////////////

const blankDefaultValues: FormProps = {
  email: '',
  password: '',
  search: '',
  tel: '',
  text: '',
  url: '',
  //
  date: '',
  dateTimeLocal: '',
  month: '',
  time: '',
  week: '',
  //
  number: 0,
  range: 0,
  //
  checkbox: [],
  radio: '',
  //
  color: '',
  file: undefined,
  //
  select: '',
  textarea: '',
  //
  selectMultiple: [],
};

const defaultValues: FormProps = {
  email: 'tom@test.com',
  password: 'password',
  search: 'search',
  tel: '000-0000-0000',
  text: 'test',
  url: 'http://test.com',
  //
  date: '2021-01-01',
  dateTimeLocal: '2021-01-01T11:22',
  month: '2021-01',
  time: '11:22',
  week: '2021-W01',
  //
  number: 5,
  range: 50,
  //
  checkbox: ['C2','C3'],
  radio: 'R2',
  //
  color: '#ff0000',
  file: undefined,
  //
  select: 'S2',
  textarea: 'textarea',
  //
  selectMultiple: ['S2','S3'],
};

const underValues: FormProps = {
  email: 'tom@te',
  password: 'pas',
  search: 'sea',
  tel: '000',
  text: 'tes',
  url: 'http://te',
  //
  date: '2021-01-01',
  dateTimeLocal: '2021-01-01T11:22',
  month: '2021-01',
  time: '11:22',
  week: '2021-W01',
  //
  number: 0,
  range: 0,
  //
  checkbox: ['C2'],
  radio: 'R2',
  //
  color: '#ff0000',
  file: undefined,
  //
  select: 'S2',
  textarea: 'tex',
  //
  selectMultiple: ['S2'],
};

const overValues: FormProps = {
  email: 'tom@test.com.jp',
  password: 'password_',
  search: 'search_',
  tel: '000-0000-0000_',
  text: 'test-text_',
  url: 'http://test.com_',
  //
  date: '2031-01-01',
  dateTimeLocal: '2031-01-01T11:22',
  month: '2031-01',
  time: '21:22',
  week: '2031-W01',
  //
  number: 11,
  range: 11,
  //
  checkbox: ['C2','C3','C4','C5'],
  radio: 'R2',
  //
  color: '#ff0000',
  file: undefined,
  //
  select: 'S2',
  textarea: 'text-area-test_',
  //
  selectMultiple: ['S2','S3','S4','S5'],
};

const goodValues: FormProps = {
  email: 'tom@test.com',
  password: 'password',
  search: 'search',
  tel: '000-0000-0000',
  text: 'test-text',
  url: 'http://test.com',
  //
  date: '2023-08-01',
  dateTimeLocal: '2023-08-01T11:22',
  month: '2023-08',
  time: '15:22',
  week: '2023-W20',
  //
  number: 5,
  range: 5,
  //
  checkbox: ['C2','C3'],
  radio: 'R2',
  //
  color: '#00ff00',
  file: undefined,
  //
  select: 'S2',
  textarea: 'text-area-test',
  //
  selectMultiple: ['S2','S3'],
};

const options: FormPropsOptions = {
  email: { maxLength: 12, minLength: 7 },
  password: { maxLength: 8, minLength: 4 },
  search: { maxLength: 6, minLength: 4 },
  tel: { maxLength: 13, minLength: 4 },
  text: { maxLength: 9, minLength: 4 },
  url: { maxLength: 15, minLength: 10 },
  //
  date: { max: '2023-12-31', min: '2023-01-01' },
  dateTimeLocal: { max: '2023-12-31 00:00', min: '2023-01-01 00:00' },
  month: { max: '2023-12', min: '2023-01' },
  time: { max: '17:59', min: '12:00' },
  week: { max: '2023-W52', min: '2023-W01'},
  //
  number: { max: 10, min: 1 },
  range: { max: 10, min: 1 },
  //
  checkbox: { maxChecked: 3, minChecked: 2},
  radio: { },
  //
  color: { },
  file: { },
  //
  select: { },
  textarea: { maxLength: 14, minLength: 4 },
  //
  selectMultiple: { maxSelected: 3, minSelected: 2},
};

////////////////////////////////////////////////////////////////////////////////

const App = () => {

  useGlobalCss({
    '.tab-item': {
      display: 'inline-block',
      border: '1px solid #000',
      padding: '0px 10px',
      cursor: 'pointer',
      '&.active':{
        backgroundColor: '#000',
        color: '#fff',
      }
    },
  });

  const [tab, setTab] = useState<number>(10);

  return (
    <div>
      <div>
        <div
          className={`tab-item ${(tab === 0)?'active':''}`}
          onClick={() => setTab(0)}
        >required:true<br/>default:none</div>
        <div
          className={`tab-item ${(tab === 1)?'active':''}`}
          onClick={() => setTab(1)}
        >required:false<br/>default:none</div>

        <div
          className={`tab-item ${(tab === 2)?'active':''}`}
          onClick={() => setTab(2)}
        >required:true<br/>default:blank</div>
        <div
          className={`tab-item ${(tab === 3)?'active':''}`}
          onClick={() => setTab(3)}
        >required:true<br/>default:any</div>

        <div
          className={`tab-item ${(tab === 4)?'active':''}`}
          onClick={() => setTab(4)}
        >handlerOptions<br/>default:underValues</div>
        <div
          className={`tab-item ${(tab === 5)?'active':''}`}
          onClick={() => setTab(5)}
        >handlerOptions<br/>default:overValues</div>
        <div
          className={`tab-item ${(tab === 6)?'active':''}`}
          onClick={() => setTab(6)}
        >handlerOptions<br/>default:goodValues</div>

        <div
          className={`tab-item ${(tab === 7)?'active':''}`}
          onClick={() => setTab(7)}
        >options<br/>default:underValues</div>
        <div
          className={`tab-item ${(tab === 8)?'active':''}`}
          onClick={() => setTab(8)}
        >options<br/>default:overValues</div>
        <div
          className={`tab-item ${(tab === 9)?'active':''}`}
          onClick={() => setTab(9)}
        >options<br/>default:goodValues</div>
        <div
          className={`tab-item ${(tab === 9)?'active':''}`}
          onClick={() => setTab(9)}
        >Sample App<br/><br/></div>
      </div>

      {tab === 0 && <Test required={true}/>}
      {tab === 1 && <Test/>}

      {tab === 2 && <Test required={true} defaultValues={blankDefaultValues}/>}
      {tab === 3 && <Test required={true} defaultValues={defaultValues}/>}

      {tab === 4 && <Test handlerOptions={options} defaultValues={underValues}/>}
      {tab === 5 && <Test handlerOptions={options} defaultValues={overValues}/>}
      {tab === 6 && <Test handlerOptions={options} defaultValues={goodValues}/>}

      {tab === 7 && <Test options={options} defaultValues={underValues}/>}
      {tab === 8 && <Test options={options} defaultValues={overValues}/>}
      {tab === 9 && <Test options={options} defaultValues={goodValues}/>}

      {tab === 10 && <Sample/>}

    </div>
  );

};

////////////////////////////////////////////////////////////////////////////////

export default App;