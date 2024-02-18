# Contribution Guide

## Issues

* [bug 不具合報告](https://github.com/maskedeng-tom/use-form/labels/bug)
* [question 質問](https://github.com/maskedeng-tom/use-form/labels/question)
* [enhancement 改善・機能追加要望](https://github.com/maskedeng-tom/use-form/labels/enhancement)

その他のIssueも歓迎しています。

> Other issues are also welcome.

## Pull Request

Pull Requestはいつでも歓迎しています。
軽微な修正のPull Requestは、Issueを立てずにPull Requestを送ってもらって問題ありません。
「このような修正/改善しませんか？」という場合は、Issueを立てて相談してください。

> Pull requests are always welcome.
> For minor changes, you can submit a pull request without opening an issue.
> If you have a suggestion for a modification or improvement, please open an issue to discuss it.

## 修正の送り方

1. フォークする  
2. フィーチャーブランチを作成する：`git checkout -b my-new-feature`  
3. 変更を追加：`git add .`  
4. 変更をコミット：`git commit -am 'Add some feature'`  
5. ブランチをプッシュ：`git push origin my-new-feature`  
6. プルリクエストを提出 :sunglasses:  

> 1. Fork it!
> 2. Create your feature branch: `git checkout -b my-new-feature`
> 3. Add your changes: `git add .`
> 4. Commit your changes: `git commit -am 'Add some feature'`
> 5. Push to the branch: `git push origin my-new-feature`
> 6. Submit a pull request :sunglasses:

## テスト

`$ npm test` を実行するとテストを実行できます。テストは、`__tests__`フォルダ、[jest](https://jestjs.io/ja/)を利用しています。

> You can run tests by executing `$ npm test`.Tests are located in the `__tests__` folder and utilize [jest](https://jestjs.io/ja/).

```sh
npm test
```

## コミットメッセージ規約

以下の形式で記載してください。

```text
概要・・・

本文・・・
fix #12345
```

関連するIssueがあれが記載してください。
fix #<issue番号> と書くと、PRをマージした時に自動的にIssueを閉じられます。

[Linking a pull request to an issue - GitHub Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

> Please write in the following format:
>
> ```text
> Summary...
> 
> Body...
> fix #12345
> ```
>
> Please mention any related issues.
> If you write fix #<issue number>, the issue will be automatically closed when the PR is merged.
>
> [Linking a pull request to an issue - GitHub Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
