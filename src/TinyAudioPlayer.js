import React, { PropTypes } from 'react';

class TinyAudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            played: false,
            currentTime: 0,
            duration: this.props.duration || 0
        };
    }

    componentDidMount() {
        this.audio = this.refs.audio;
        this.audio.addEventListener('durationchange', this.setDuration.bind(this));
        this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
        this.audio.addEventListener('ended', this.endProgress.bind(this));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('durationchange', this.setDuration.bind(this));
        this.audio.removeEventListener('timeupdate', this.updateProgress.bind(this));
        this.audio.removeEventListener('ended', this.endProgress.bind(this));
    }

    onPlayClick() {
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

    setDuration() {
        const defaultDuration = this.props.duration || 0;
        const duration = Math.round(this.audio.duration);
        if (window.isFinite(duration) && defaultDuration < duration) {
            this.setState({duration});
        }
    }

    formatDuration(duration) {
        let minutes;
        let seconds;
        if (duration <= 0) {
            return '00:00';
        }
        minutes = Math.floor(duration / 60);
        seconds = Math.floor(duration % 60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }

    updateProgress() {
        const currentTime = this.audio.currentTime;
        this.setState({ currentTime });
        if (currentTime >= this.state.duration) {
            this.endPlay();
        }
    }

    endProgress() {
        this.endPlay();
    }

    endPlay() {
        this.setState({
            pause: true
        });
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    render() {
        let playerClass;
        let iconClass;
        let audioURL = this.props.source;
        const formattedDuration = this.formatDuration(this.state.duration);
        const formattedPlayedTime = this.formatDuration(Math.round(this.state.currentTime));
        let playerStyle = { width: this.state.duration / 60 * 100 + 100};
        let processStyle = { width: this.state.currentTime / this.state.duration * 100 + '%'};

        if (!this.state.pause) {
            // audio playing
            playerClass = 'audio-player is-playing';
            iconClass = 'icon icon-play';
        } else {
            // audio paused
            playerClass = 'audio-player';
            iconClass = 'icon icon-pause';
        }

        return (
            <div className="audio_container">
                <div
                    className={playerClass}
                    style={playerStyle}
                    onClick={() => this.onPlayClick()}
                    >
                    <div className="content">
                        <span className={iconClass}></span>
                        <span className="time">
                            {formattedPlayedTime + '/' + formattedDuration}
                        </span>
                    </div>
                    <div
                        className="progress"
                        style={processStyle}
                        />
                </div>
                <audio ref="audio" src={audioURL}/>
            </div>
        );
    }
}

TinyAudioPlayer.propTypes = {
    source: PropTypes.string.isRequired
}

module.exports = TinyAudioPlayer;
