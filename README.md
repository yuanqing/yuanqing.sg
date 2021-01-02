# [yuanqing.sg](https://yuanqing.sg) [![build](https://github.com/yuanqing/yuanqing.sg/workflows/build/badge.svg)](https://github.com/yuanqing/figma-plugins/actions?query=workflow%3Abuild)

## Initial set up

Clone and install:

```
$ git clone https://github.com/yuanqing/yuanqing.sg
$ cd yuanqing.sg
$ yarn
```

Then, create a `.env` file containing a [GitHub personal access token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token):

```
$ echo PERSONAL_ACCESS_TOKEN=MY_GITHUB_PERSONAL_ACCESS_TOKEN > .env
```

Then, pull the latest GitHub repositories and Figma plugins stats:

```
$ yarn run data
```

## Development

To build and serve the site, and watch for changes, do:

```
$ yarn run watch
```

Then, go to [`0.0.0.0:4242`](https://0.0.0.0:4242) in your web browser. Alternatively, do:

```
$ yarn run open
```
