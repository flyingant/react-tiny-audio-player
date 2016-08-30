'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TinyAudioPlayer = function (_React$Component) {
    _inherits(TinyAudioPlayer, _React$Component);

    function TinyAudioPlayer(props) {
        _classCallCheck(this, TinyAudioPlayer);

        var _this = _possibleConstructorReturn(this, (TinyAudioPlayer.__proto__ || Object.getPrototypeOf(TinyAudioPlayer)).call(this, props));

        _this.state = {
            pause: true,
            played: false,
            currentTime: 0,
            duration: _this.props.duration || 0
        };
        return _this;
    }

    _createClass(TinyAudioPlayer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.audio = this.refs.audio;
            this.audio.addEventListener('durationchange', this.setDuration.bind(this));
            this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
            this.audio.addEventListener('ended', this.endProgress.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.audio.removeEventListener('durationchange', this.setDuration.bind(this));
            this.audio.removeEventListener('timeupdate', this.updateProgress.bind(this));
            this.audio.removeEventListener('ended', this.endProgress.bind(this));
        }
    }, {
        key: 'onPlayClick',
        value: function onPlayClick() {
            if (this.audio.paused) {
                this.audio.play();
                this.setState({
                    pause: false,
                    played: true
                });
            } else {
                this.audio.pause();
                this.setState({
                    pause: true,
                    played: true
                });
            }
        }
    }, {
        key: 'setDuration',
        value: function setDuration() {
            var defaultDuration = this.props.duration || 0;
            var duration = Math.round(this.audio.duration);
            if (window.isFinite(duration) && defaultDuration < duration) {
                this.setState({ duration: duration });
            }
        }
    }, {
        key: 'formatDuration',
        value: function formatDuration(duration) {
            var minutes = void 0;
            var seconds = void 0;
            if (duration <= 0) {
                return '00:00';
            }
            minutes = Math.floor(duration / 60);
            seconds = Math.floor(duration % 60);
            minutes = minutes >= 10 ? minutes : '0' + minutes;
            seconds = seconds >= 10 ? seconds : '0' + seconds;
            return minutes + ':' + seconds;
        }
    }, {
        key: 'updateProgress',
        value: function updateProgress() {
            var currentTime = this.audio.currentTime;
            this.setState({ currentTime: currentTime });
            if (currentTime >= this.state.duration) {
                this.endPlay();
            }
        }
    }, {
        key: 'endProgress',
        value: function endProgress() {
            this.endPlay();
        }
    }, {
        key: 'endPlay',
        value: function endPlay() {
            this.setState({
                pause: true
            });
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var playerClass = void 0;
            var iconClass = void 0;
            var audioURL = this.props.source;
            var formattedDuration = this.formatDuration(this.state.duration);
            var formattedPlayedTime = this.formatDuration(Math.round(this.state.currentTime));
            var playerStyle = { width: this.state.duration / 60 * 100 + 100 };
            var processStyle = { width: this.state.currentTime / this.state.duration * 100 + '%' };

            if (!this.state.pause) {
                // audio playing
                playerClass = 'audio-player is-playing';
                iconClass = 'icon icon-play';
            } else {
                // audio paused
                playerClass = 'audio-player';
                iconClass = 'icon icon-pause';
            }

            return _react2.default.createElement(
                'div',
                { className: 'audio_container' },
                _react2.default.createElement(
                    'div',
                    {
                        className: playerClass,
                        style: playerStyle,
                        onClick: function onClick() {
                            return _this2.onPlayClick();
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'content' },
                        _react2.default.createElement('span', { className: iconClass }),
                        _react2.default.createElement(
                            'div',
                            { className: 'name' },
                            this.props.name
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'time' },
                            formattedPlayedTime + '/' + formattedDuration
                        )
                    ),
                    _react2.default.createElement('div', {
                        className: 'progress',
                        style: processStyle
                    })
                ),
                _react2.default.createElement('audio', { ref: 'audio', src: audioURL })
            );
        }
    }]);

    return TinyAudioPlayer;
}(_react2.default.Component);

TinyAudioPlayer.propTypes = {
    name: _react.PropTypes.string,
    source: _react.PropTypes.string.isRequired
};

module.exports = TinyAudioPlayer;
