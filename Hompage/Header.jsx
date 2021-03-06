import axios from 'axios';
import React from 'react';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectfile : null,
            Url : '하이',
        }
    }

    handleInputFile = (e) => {
        this.setState({selectfile : e.target.files[0]})
    }

    handlePost = () => {
        const formdata = new FormData();
        formdata.append("file",this.state.selectfile);
        axios.post("http://localhost:4000/uploaded",formdata)
        .then(res => {
            this.setUrl(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    setUrl = (data) => {
        this.setState({Url : data});
    }



    render() {
        
        return (
            <div>
            <h2>
                인기 무협
            </h2>
            <h2>
                인기 웹툰
            </h2>
            </div>
        );
    }
}


export default Header;