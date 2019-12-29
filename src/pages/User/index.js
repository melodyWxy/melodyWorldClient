import React, { Component } from 'react'
import {Button} from 'antd';


export class User extends Component {


    handleBtnClick = e => {

    }

    render() {
        return (
            <div>
                <Button   
                    type="primary"
                    onClick = {this.handleBtnClick}
                >
                    点我更新store.state.a
                </Button>
            </div>
        )
    }
}

export default User;
