Reproduction of the loss of `window.opener` during cross-site navigation with `nativeWindowOpen` in Electron.

Relates to [electron/electron#18032](https://github.com/electron/electron/issues/18032).

Loads a content of `host1`, opens a popup of `host1` and navigates the popup to `host2`.

### Usage

```sh
$ git clone https://github.com/alexstrat/electron-bug-repro-cross-origin-opener.git
$ cd electron-bug-repro-cross-origin-opener
$ npm i
$ sudo npm start
```

To reproduce:
- Click "Open popup"
- Click on `http://host2.local:9001/index.html`
- => `window.opener` is not defined