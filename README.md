# React HSK Flashcard

Paper, pen and web app ? learn Chinese : procrastination

[DEMO](https://saimanwong.github.io/react-hsk-flashcard)

## Getting Started

Development environment on local machine

### Prerequisites

* Docker

### Run development environment

```
$ docker run -it --rm --name react-app -p 3000:3000 -v $PWD/app:/app -w /app node:latest bash
```

or

```
$ ./run.sh
```

* Webapp - `localhost:3000`

## Deployment

```
$ yarn build
```

## TODO
- [x] Experiment with React
- [ ] Clean up code and structure...
- [ ] Experiment with Redux
- [ ] Colorize characters (1 blue/sky, 2 green/growth, 3 orange, 4 red/aggressive, 5 black)
- [ ] Information about progress (total cards, total no and yes)
- [x] Stroke order
- [ ] ``v-for="(item, index) in x"`` ? ``x.map((item, index) => { ... })``

## Built With

* [Create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
