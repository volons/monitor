import { h, Component } from 'preact';
import style from './style';

export default class telemetry extends Component {

    componentDidMount() { }

    render() {
        if ( this.props.telemetry.connected !== false )
            return (
                <div class={style.telemetry}>
                    <h2>dev <span class={ this.props.telemetry.status.armed ? style.armed : style.disarmed }>{ this.props.telemetry.status.armed ? 'Armed' : 'Disarmed' }</span></h2>
                    <ul>
                        <li>
                            <span class={style.label}>Bat :</span>
                            <span class={style.battery}>{ this.props.telemetry.battery.percent }%</span>
                            <span class={style.batteryVoltage}>({ this.props.telemetry.battery.voltage }V)</span>
                        </li>
                        <li>
                            <span class={style.label}>lon :</span>
                            <span class={style.longitude}>{ this.props.telemetry.position.lon }</span>
                        </li>
                        <li>
                            <span class={style.label}>lat :</span>
                            <span class={style.longitude}>{ this.props.telemetry.position.lat }</span>
                        </li>
                        <li>
                        <li>
                            <span class={style.label}>Alt :</span>
                            <span class={style.longitude}>{ this.props.telemetry.position.alt }</span>
                        </li>
                            <span class={style.label}>RelAlt :</span>
                            <span class={style.longitude}>{ this.props.telemetry.position.relAlt }</span>
                        </li>
                        <li>
                            <span class={style.label}>HDG :</span>
                            <span class={style.longitude}>{ this.props.telemetry.position.hdg }</span>
                        </li>
                    </ul>
                </div>
                );
                else 
                    return (
                        <div class={style.telemetry}>
                            <h3>No telemetry connected.</h3>
                        </div> );
    }
}
