# use-form

[![npm version](https://badge.fury.io/js/%40maskedeng-tom%2Fuse-form.svg)](https://badge.fury.io/js/%40maskedeng-tom%2Fuse-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reactで、formやinputを利用する際に便利なライブラリです。入力値チェックやフォームの状態管理を簡単に行うことができます。
簡単に導入でき、他のnpmライブラリへの依存はありません。

> This is a convenient library for using form and input in React. You can easily perform input value checks and form state management.

```tsx
import { useForm } from '@maskedeng-tom/use-form';

////////////////////////////////////////////////////////////////////////////////

interface InputFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  terms: string[];
}

const Sample = () => {

  const uf = useForm<InputFormProps>({
    options: {
      email: { required: true },
      password: { required: true, minLength: 8 },
      confirmPassword: { required: true },
      terms: { required: true },
    },
    validate: (v: InputFormProps) => {
      return v.password === v.confirmPassword;
    }
  });

  const onSubmit = (v: InputFormProps) => {
    console.log('------->', v);
  };

  return (<>
    <form {...uf.form(onSubmit)}>

      <fieldset>
        <legend>Create Account</legend>
        <div>
          <label>
            <div>Email</div>
            <input {...uf.email('email')} />
          </label>
        </div>
        <div>
          <label>
            <div>Choose password</div>
            <input {...uf.password('password')} />
          </label>
        </div>
        <div>
          <label>
            <div>Confirm password</div>
            <input {...uf.password('confirmPassword')} />
          </label>
        </div>
        <div>
          <label>
            <input {...uf.checkbox('terms')} value="terms"/>
            I accept the <a href="#">terms</a>
          </label>
        </div>
        <div>
          <button type="submit" disabled={uf.isInvalid}>Create Account</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>debug</legend>
        email : {uf.invalid['email']}<br/>
        password : {uf.invalid['password']}<br/>
        confirmPassword : {uf.invalid['confirmPassword']}<br/>
        terms : {uf.invalid['terms']}<br/>
        validate : {uf.validateError}<br/>
      </fieldset>

    </form>
  </>);
};

export default Sample;
```

<br/>

## Prerequisites

React hooksライブラリーなので、React Version 16.8以降に対応しています。Typescriptにも対応しています。

> This is a React hooks library, so it is compatible with React version 16.8 and above. It also supports TypeScript.

<br/>

## Table of contents

<br/>

## Getting Started

適当なReactを用意してください。関数コンポーネントを利用するため、React Version 16.8以降が必要です。
すでに作成済みのReactプロジェクトにも適用できます。作成済みのReactプロジェクトへの導入にあたって、破壊的な変更は行われません（React本体以外への依存はありません）。

シンプルなReactプロジェクトの作り方については、以下を参考にしてください。
[Getting Started with a Simple React Project](https://github.com/maskedeng-tom/simple-react-project-with-webpack)

> Please prepare a suitable React project. React version 16.8 or above is required to use function components.
It can also be applied to existing React projects. There will be no destructive changes when introducing it to an existing React project (no dependencies on anything other than React itself).
> Please refer to the following for instructions on how to create a simple React project.
> [Getting Started with a Simple React Project](https://github.com/maskedeng-tom/simple-react-project-with-webpack)

<br/>

## Installation

### Using npm (npmを利用する場合)

  ```sh
  npm install @maskedeng-tom/use-form
  ```

### Using yarn (yarnを利用する場合)

  ```sh
  yarn add @maskedeng-tom/use-form
  ```

<br/>

## Usage

### Creating a form

フォームの作成

まずは、適当なフォームを作成してください。

```tsx
const App = () => {
  return (<>
    <form>
      <div>
        <label>
          <div>Email</div>
          <input/>
        </label>
      </div>
      <div>
        <label>
          <div>Choose password</div>
          <input/>
        </label>
      </div>
      <div>
        <label>
          <div>Confirm password</div>
          <input/>
        </label>
      </div>
      <div>
        <label>
          <input value="terms"/>
          I accept the <a href="#">terms</a>
        </label>
      </div>
      <div>
        <button type="submit">Create Account</button>
      </div>
    </form>
  </>);
}

```




<br/>

## API

### form types and corresponding types 

inputタイプと、対応する型

| Element | type | TS Type | useForm |
| :---: | :---: | :---: | :---: |
| input | "checkbox" | string[] | checkbox('name') |
| input | "email" | string |
| input | "number" | number |
| input | "range" | number |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |
| input | "email" | string |






## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)をお読みください。ここには行動規範やプルリクエストの提出手順が詳細に記載されています。

1. フォークする  
2. フィーチャーブランチを作成する：`git checkout -b my-new-feature`  
3. 変更を追加：`git add .`  
4. 変更をコミット：`git commit -am 'Add some feature'`  
5. ブランチをプッシュ：`git push origin my-new-feature`  
6. プルリクエストを提出 :sunglasses:  

> Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
>
> 1. Fork it!
> 2. Create your feature branch: `git checkout -b my-new-feature`
> 3. Add your changes: `git add .`
> 4. Commit your changes: `git commit -am 'Add some feature'`
> 5. Push to the branch: `git push origin my-new-feature`
> 6. Submit a pull request :sunglasses:

<br/>

## Credits

昨今の複雑化していく開発現場にシンプルな力を！ :muscle:

> Simplify the complex development landscape of today! :muscle:

<br/>

## Authors

**Maskedeng Tom** - *Initial work* - [Maskedeng Tom](https://github.com/maskedeng-tom)

:smile: [プロジェクト貢献者リスト](https://github.com/maskedeng-tom/use-form/contributors) :smile:

> See also the list of [contributors](https://github.com/maskedeng-tom/use-form/contributors) who participated in this project.

<br/>

## Show your support

お役に立った場合はぜひ :star: を！

> Please :star: this repository if this project helped you!

<br/>

## License

[MIT License](https://github.com/maskedeng-tom/use-form/blob/main/LICENSE.txt) © Maskedeng Tom
