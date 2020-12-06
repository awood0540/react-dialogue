import { render } from 'react-dom';
import './index.css';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from './sample-base';

export class Template extends SampleBase {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.buttonElement = null;
        this.buttonRef = element => {
            this.buttonElement = element;
        };
    }
    header() {
        return (<div>
            <span className="e-avatar template-image e-avatar-xsmall e-avatar-circle"></span>
            <div id="dlg-template" title="Nancy" className="e-icon-settings">Nancy</div>
        </div>);
    }
    footerTemplate() {
        return (<div>
                <input id="inVal" className="e-input" type="text" placeholder="Enter your message here!"/>
                <button id="sendButton" className="e-control e-btn e-primary" data-ripple="true">Send</button>
            </div>);
    }
    content() {
        return (<div className="dialogContent">
                <span className="dialogText">Greetings Nancy! When will you share me the source files of the project?</span>
            </div>);
    }
    buttonClick() {
        this.setState({ hideDialog: true });
    }
    dialogClose() {
        this.setState({ hideDialog: false });
        this.buttonElement.style.display = 'inline-block';
    }
    dialogOpen() {
        this.setState({ hideDialog: true });
        this.buttonElement.style.display = 'none';
    }
    updateTextValue() {
        let enteredVal = document.getElementById('inVal');
        let dialogTextElement = document.getElementsByClassName('dialogText')[0];
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    }
    rendereComplete() {
        this.proxy = this;
        this.dialogInstance.target = document.getElementById('target');
        document.getElementById('sendButton').onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.updateTextValue();
            }
        };
        document.getElementById('inVal').onkeydown = (e) => {
            if (e.keyCode === 13) {
                this.updateTextValue();
            }
        };
        document.getElementById('sendButton').onclick = () => {
            this.updateTextValue();
        };
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section row'>
            <div id='target' className='col-lg-12 target-element'>
            <button className="e-control e-btn dlgbtn dlgbtn-position" ref={this.buttonRef} onClick={this.buttonClick.bind(this)}>Open</button>
            <DialogComponent header={this.header} footerTemplate={this.footerTemplate} content={this.content} showCloseIcon={true} ref={dialog => this.dialogInstance = dialog} target='#target' width={'437px'} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)} height={'255px'} visible={this.state.hideDialog}></DialogComponent>
            </div>
        </div>
      </div>);
    }
}

render(<Template />, document.getElementById('sample'));