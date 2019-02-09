class Stopwatch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: [],
    }
  }

  reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
  }

  format() {
    return (
      `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`
    );
  }
  
  start() {
    if (!this.state.running) {
        this.setState({
          running: true,
        });
        this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    const currentTimes = Object.assign({}, this.state.times);

    currentTimes.miliseconds = currentTimes.miliseconds + 1;
    if (currentTimes.miliseconds >= 100) {
        currentTimes.seconds = currentTimes.seconds + 1;
        currentTimes.miliseconds = 0;
    }
    if (currentTimes.seconds >= 60) {
        currentTimes.minutes = currentTimes.minutes + 1;
        currentTimes.seconds = 0;
    }

    this.setState ({
      times: {
        minutes: currentTimes.minutes,
        seconds: currentTimes.seconds,
        miliseconds: currentTimes.miliseconds,
      }
    });
  }

  stop() {
    this.state.running = false;
    clearInterval(this.watch);
    const newResult = {
      time: this.format(),
      id: Date.now(),
    };
    this.setState({ 
      results: this.state.results.concat(newResult),
    });
  }

  clear () {
    this.setState({
      results: [],
    });
  }

  render () {
    return (
      <div>
        <div className="menu">
          <a onClick={() => this.start()} href="#" className="menu__button" id="start">start</a>
          <a onClick={() => this.stop()} href="#" className="menu__button" id="stop">stop</a>
          <a onClick={() => this.reset()} href="#" className="menu__button" id="reset">reset</a>
          <a onClick={() => this.clear()} href="#" className="menu__button" id="clear">clear</a>
        </div>
        <div className="timer">
          {this.format()}
        </div>
        <Results results={this.state.results} />
      </div>
    );
  }
}

class Results extends React.Component {
  render() {
      return (
          <ul className="results">
              {this.props.results.map(result => (
                  <li className="results__item" key={result.id}>{result.time}</li>
              ))}
          </ul>
      );
  }
}

pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
      result = '0' + result;
  }
  return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));
