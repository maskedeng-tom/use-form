/**
 * @jest-environment jsdom
**/
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Test, { FormProps, FormPropsOptions, TestResult } from './Test';

////////////////////////////////////////////////////////////////////////////////

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

describe('useForm tests', () => {

  test('required:true,default:none', async () => {
    //
    const test: TestResult = {};

    // mount
    const { unmount } = render(<Test required={true} test={test}/>);

    const expectIgnore = {
      'range': 'value-missing',
      'checkbox': 'value-missing',
      'radio': 'value-missing',
      'color': 'value-missing',
      'email': 'value-missing',
      'password': 'value-missing',
      'search': 'value-missing',
      'tel': 'value-missing',
      'text': 'value-missing',
      'url': 'value-missing',
      'date': 'value-missing',
      'dateTimeLocal': 'value-missing',
      'month': 'value-missing',
      'time': 'value-missing',
      'week': 'value-missing',
      'number': 'value-missing',
      'select': 'value-missing',
      'textarea': 'value-missing',
      'file': 'value-missing',
      'selectMultiple': 'value-missing',
    };
    const expectValues = {
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);
    //
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('required:false,default:none', async () => {
    //
    const test: TestResult = {};

    // mount
    const { unmount } = render(<Test required={false} test={test}/>);

    const expectIgnore = {
    };
    const expectValues = {
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('required:true,default:blank', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test required={true} defaultValues={blankDefaultValues} test={test}/>);

    const expectIgnore = {
      'checkbox': 'value-missing',
      'radio': 'value-missing',
      'color': 'value-missing',
      'email': 'value-missing',
      'password': 'value-missing',
      'search': 'value-missing',
      'tel': 'value-missing',
      'text': 'value-missing',
      'url': 'value-missing',
      'date': 'value-missing',
      'dateTimeLocal': 'value-missing',
      'month': 'value-missing',
      'time': 'value-missing',
      'week': 'value-missing',
      'select': 'value-missing',
      'textarea': 'value-missing',
      'file': 'value-missing',
      'selectMultiple': 'value-missing',
    };
    const expectValues = {
      'email': '',
      'password': '',
      'search': '',
      'tel': '',
      'text': '',
      'url': '',
      'date': '',
      'dateTimeLocal': '',
      'month': '',
      'time': '',
      'week': '',
      'number': 0,
      'range': 0,
      'checkbox': [],
      'radio': '',
      'color': '',
      'select': '',
      'textarea': '',
      'selectMultiple': [],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('required:true,default:any', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test required={true} defaultValues={defaultValues} test={test}/>);

    const expectIgnore = {
      'file': 'value-missing'
    };
    const expectValues = {
      'email': 'tom@test.com',
      'password': 'password',
      'search': 'search',
      'tel': '000-0000-0000',
      'text': 'test',
      'url': 'http://test.com',
      'date': '2021-01-01',
      'dateTimeLocal': '2021-01-01T11:22',
      'month': '2021-01',
      'time': '11:22',
      'week': '2021-W01',
      'number': 5,
      'range': 50,
      'checkbox': [
        'C2',
        'C3'
      ],
      'radio': 'R2',
      'color': '#ff0000',
      'select': 'S2',
      'textarea': 'textarea',
      'selectMultiple': [
        'S2',
        'S3'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('handlerOption,default:underValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test handlerOptions={options} defaultValues={underValues} test={test}/>);

    const expectIgnore = {
      'email': 'too-short',
      'password': 'too-short',
      'search': 'too-short',
      'tel': 'too-short',
      'text': 'too-short',
      'url': 'too-short',
      'date': 'range-underflow',
      'dateTimeLocal': 'range-underflow',
      'month': 'range-underflow',
      'time': 'range-underflow',
      'week': 'range-underflow',
      'number': 'range-underflow',
      'range': 'range-underflow',
      'checkbox': 'checked-underflow',
      'textarea': 'too-short',
      'selectMultiple': 'selected-underflow',
    };
    const expectValues = {
      'email': 'tom@te',
      'password': 'pas',
      'search': 'sea',
      'tel': '000',
      'text': 'tes',
      'url': 'http://te',
      'date': '2021-01-01',
      'dateTimeLocal': '2021-01-01T11:22',
      'month': '2021-01',
      'time': '11:22',
      'week': '2021-W01',
      'number': 0,
      'range': 0,
      'checkbox': [
        'C2'
      ],
      'radio': 'R2',
      'color': '#ff0000',
      'select': 'S2',
      'textarea': 'tex',
      'selectMultiple': [
        'S2'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('handlerOption,default:overValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test handlerOptions={options} defaultValues={overValues} test={test}/>);

    const expectIgnore = {
      'email': 'too-long',
      'password': 'too-long',
      'search': 'too-long',
      'tel': 'too-long',
      'text': 'too-long',
      'url': 'too-long',
      'date': 'range-overflow',
      'dateTimeLocal': 'range-overflow',
      'month': 'range-overflow',
      'time': 'range-overflow',
      'week': 'range-overflow',
      'number': 'range-overflow',
      'range': 'range-overflow',
      'checkbox': 'checked-overflow',
      'textarea': 'too-long',
      'selectMultiple': 'selected-overflow',
    };
    const expectValues = {
      'email': 'tom@test.com.jp',
      'password': 'password_',
      'search': 'search_',
      'tel': '000-0000-0000_',
      'text': 'test-text_',
      'url': 'http://test.com_',
      'date': '2031-01-01',
      'dateTimeLocal': '2031-01-01T11:22',
      'month': '2031-01',
      'time': '21:22',
      'week': '2031-W01',
      'number': 11,
      'range': 11,
      'checkbox': [
        'C2',
        'C3',
        'C4',
        'C5'
      ],
      'radio': 'R2',
      'color': '#ff0000',
      'select': 'S2',
      'textarea': 'text-area-test_',
      'selectMultiple': [
        'S2',
        'S3',
        'S4',
        'S5'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('handlerOption,default:goodValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test handlerOptions={options} defaultValues={goodValues} test={test}/>);

    const expectIgnore = {
    };
    const expectValues = {
      'email': 'tom@test.com',
      'password': 'password',
      'search': 'search',
      'tel': '000-0000-0000',
      'text': 'test-text',
      'url': 'http://test.com',
      'date': '2023-08-01',
      'dateTimeLocal': '2023-08-01T11:22',
      'month': '2023-08',
      'time': '15:22',
      'week': '2023-W20',
      'number': 5,
      'range': 5,
      'checkbox': [
        'C2',
        'C3'
      ],
      'radio': 'R2',
      'color': '#00ff00',
      'select': 'S2',
      'textarea': 'text-area-test',
      'selectMultiple': [
        'S2',
        'S3'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('options,default:underValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test options={options} defaultValues={underValues} test={test}/>);

    const expectIgnore = {
      'email': 'too-short',
      'password': 'too-short',
      'search': 'too-short',
      'tel': 'too-short',
      'text': 'too-short',
      'url': 'too-short',
      'date': 'range-underflow',
      'dateTimeLocal': 'range-underflow',
      'month': 'range-underflow',
      'time': 'range-underflow',
      'week': 'range-underflow',
      'number': 'range-underflow',
      'range': 'range-underflow',
      'checkbox': 'checked-underflow',
      'textarea': 'too-short',
      'selectMultiple': 'selected-underflow',
    };
    const expectValues = {
      'email': 'tom@te',
      'password': 'pas',
      'search': 'sea',
      'tel': '000',
      'text': 'tes',
      'url': 'http://te',
      'date': '2021-01-01',
      'dateTimeLocal': '2021-01-01T11:22',
      'month': '2021-01',
      'time': '11:22',
      'week': '2021-W01',
      'number': 0,
      'range': 0,
      'checkbox': [
        'C2'
      ],
      'radio': 'R2',
      'color': '#ff0000',
      'select': 'S2',
      'textarea': 'tex',
      'selectMultiple': [
        'S2'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('options,default:overValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test options={options} defaultValues={overValues} test={test}/>);

    const expectIgnore = {
      'email': 'too-long',
      'password': 'too-long',
      'search': 'too-long',
      'tel': 'too-long',
      'text': 'too-long',
      'url': 'too-long',
      'date': 'range-overflow',
      'dateTimeLocal': 'range-overflow',
      'month': 'range-overflow',
      'time': 'range-overflow',
      'week': 'range-overflow',
      'number': 'range-overflow',
      'range': 'range-overflow',
      'checkbox': 'checked-overflow',
      'textarea': 'too-long',
      'selectMultiple': 'selected-overflow',
    };
    const expectValues = {
      'email': 'tom@test.com.jp',
      'password': 'password_',
      'search': 'search_',
      'tel': '000-0000-0000_',
      'text': 'test-text_',
      'url': 'http://test.com_',
      'date': '2031-01-01',
      'dateTimeLocal': '2031-01-01T11:22',
      'month': '2031-01',
      'time': '21:22',
      'week': '2031-W01',
      'number': 11,
      'range': 11,
      'checkbox': [
        'C2',
        'C3',
        'C4',
        'C5'
      ],
      'radio': 'R2',
      'color': '#ff0000',
      'select': 'S2',
      'textarea': 'text-area-test_',
      'selectMultiple': [
        'S2',
        'S3',
        'S4',
        'S5'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('options,default:goodValues', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test options={options} defaultValues={goodValues} test={test}/>);

    const expectIgnore = {
    };
    const expectValues = {
      'email': 'tom@test.com',
      'password': 'password',
      'search': 'search',
      'tel': '000-0000-0000',
      'text': 'test-text',
      'url': 'http://test.com',
      'date': '2023-08-01',
      'dateTimeLocal': '2023-08-01T11:22',
      'month': '2023-08',
      'time': '15:22',
      'week': '2023-W20',
      'number': 5,
      'range': 5,
      'checkbox': [
        'C2',
        'C3'
      ],
      'radio': 'R2',
      'color': '#00ff00',
      'select': 'S2',
      'textarea': 'text-area-test',
      'selectMultiple': [
        'S2',
        'S3'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  //////////////////////////////////////////////////////////////////////////////

  test('reset test', async () => {
    //
    const test: TestResult = {};

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

    // mount
    const { unmount } = render(<Test handlerOptions={options} defaultValues={goodValues} test={test}/>);

    const expectIgnore = {
    };
    const expectValues = {
      'email': 'tom@test.com',
      'password': 'password',
      'search': 'search',
      'tel': '000-0000-0000',
      'text': 'test-text',
      'url': 'http://test.com',
      'date': '2023-08-01',
      'dateTimeLocal': '2023-08-01T11:22',
      'month': '2023-08',
      'time': '15:22',
      'week': '2023-W20',
      'number': 5,
      'range': 5,
      'checkbox': [
        'C2',
        'C3'
      ],
      'radio': 'R2',
      'color': '#00ff00',
      'select': 'S2',
      'textarea': 'text-area-test',
      'selectMultiple': [
        'S2',
        'S3'
      ],
    };

    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual(expectValues);

    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    // file op
    await userEvent.upload(screen.getAllByTestId('file')[0], new File(['(⌐□_□)'], 'test.txt', { type: 'text/plain' }));
    expect(test.values?.file?.length).toBe(1);
    expect(test.values?.file?.item(0)?.name).toBe('test.txt');
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues?.file?.length).toBe(1);
    expect(test.resultValues?.file?.item(0)?.name).toBe('test.txt');

    await userEvent.click(screen.getAllByTestId('reset-blank')[0]);
    expect(test.values).toEqual({});
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual({});

    await userEvent.click(screen.getAllByTestId('reset')[0]);
    expect(test.values).toEqual(expectValues);
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual(expectValues);

    //
    //screen.debug();
    unmount();

  });

  test('edit test', async () => {
    //
    const test: TestResult = {};

    // mount
    const { unmount } = render(<Test required={true} test={test}/>);

    const expectIgnore = {
      'range': 'value-missing',
      'checkbox': 'value-missing',
      'radio': 'value-missing',
      'color': 'value-missing',
      'email': 'value-missing',
      'password': 'value-missing',
      'search': 'value-missing',
      'tel': 'value-missing',
      'text': 'value-missing',
      'url': 'value-missing',
      'date': 'value-missing',
      'dateTimeLocal': 'value-missing',
      'month': 'value-missing',
      'time': 'value-missing',
      'week': 'value-missing',
      'number': 'value-missing',
      'select': 'value-missing',
      'textarea': 'value-missing',
      'file': 'value-missing',
      'selectMultiple': 'value-missing',
    };
    const expectValues = {
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

    // blank
    expect(test.invalid).toEqual(expectIgnore);
    expect(test.values).toEqual({});
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    expect(test.resultValues).toEqual({});

    const inputTest = async (key: keyof (typeof expectValues)) =>{
      await waitFor(async () => {
        const target = screen.getAllByTestId(key)[0];
        target.focus();
        expect(target).toHaveFocus();
        await userEvent.clear(screen.getAllByTestId(key)[0]);
        await userEvent.keyboard(String(expectValues[key]));
        expect(test.values?.[key]).toBe(expectValues[key]);
      });
    };

    await inputTest('email');
    await inputTest('password');
    await inputTest('search');
    await inputTest('tel');
    await inputTest('text');
    await inputTest('url');
    //
    await inputTest('date');
    await inputTest('dateTimeLocal');
    await inputTest('month');
    await inputTest('time');
    await inputTest('week');
    //
    await inputTest('number');

    //range
    fireEvent.change(screen.getAllByTestId('range')[0], { target: { value: expectValues['range'] } });
    expect(test.values?.['range']).toBe(expectValues['range']);

    // checkbox
    await userEvent.click(screen.getAllByTestId('checkbox-c4')[0]);
    await userEvent.click(screen.getAllByTestId('checkbox-c2')[0]);
    await userEvent.click(screen.getAllByTestId('checkbox-c3')[0]);
    await userEvent.click(screen.getAllByTestId('checkbox-c4')[0]);
    expect(test.values?.['checkbox']).toEqual(expectValues['checkbox']);

    // radio
    await userEvent.click(screen.getAllByTestId('radio-r1')[0]);
    await userEvent.click(screen.getAllByTestId('radio-r3')[0]);
    await userEvent.click(screen.getAllByTestId('radio-r2')[0]);
    expect(test.values?.['radio']).toEqual(expectValues['radio']);

    // color
    fireEvent.input(screen.getAllByTestId('color')[0], {target: {value: expectValues['color']}});
    expect(test.values?.['color']).toEqual(expectValues['color']);

    // file
    await userEvent.upload(screen.getAllByTestId('file')[0], new File(['(⌐□_□)'], 'test.txt', { type: 'text/plain' }));
    expect(test.values?.file?.length).toBe(1);
    expect(test.values?.file?.item(0)?.name).toBe('test.txt');

    // select
    await userEvent.selectOptions(screen.getAllByTestId('select')[0], [expectValues['select']]);
    expect(test.values?.['select']).toBe(expectValues['select']);

    // select multiple
    await userEvent.selectOptions(screen.getAllByTestId('select-multiple')[0], expectValues['selectMultiple']);
    expect(test.values?.['selectMultiple']).toEqual(expectValues['selectMultiple']);

    // textarea
    await inputTest('textarea');

    // submit
    await userEvent.click(screen.getAllByTestId('submit')[0]);
    const resultValues = {...test.resultValues};
    delete resultValues.file;
    expect(resultValues).toEqual(expectValues);
    //
    expect(test.resultValues?.file?.length).toBe(1);
    expect(test.resultValues?.file?.item(0)?.name).toBe('test.txt');

    //screen.debug();
    unmount();

  });

});
