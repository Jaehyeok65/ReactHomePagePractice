import React from 'react';
import Card from 'react-bootstrap/Card';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import StarRate2 from './StarRate2';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField  from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import { withStyles } from '@material-ui/core/styles';
import './Card.css';

const styles = theme => ({
  fab : {
      position : 'fixed',
      bottom : '20px',
      right : '20px'
  },
  fab1 : {
      position : 'fixed',
      bottom : '20px',
      right : '250px',
  },
  fab2 : {
      position : 'fixed',
      bottom : '20px',
      right : '100px'
  }
});








class Cardcontent2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webtoon_view : 0,
            webtoon_name : '',
            webtoon_rate : 0,
            webtoon_link : null,
            webtoon_img : null,
            dialog : false,
            remove : false,
        };
    }

    onCall = () =>{
        const view = {
            webtoon_view : this.state.webtoon_view,
            webtoon_name : this.state.webtoon_name,
        };

        fetch("http://localhost:4000/webtoonview",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(view),
        })
    }

    remove = () => {
      const name = {
        webtoon_name : this.props.name
      };

      fetch("http://localhost:4000/webtoondelete",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(name),
        }).then(alert("삭제가 완료되었습니다."))
        .then(this.handleRemove());
    }

    add = () => {
      const webtoon = {
        webtoon_name : this.state.webtoon_name,
        webtoon_view : this.state.webtoon_view,
        webtoon_rate : this.state.webtoon_rate,
        webtoon_link : this.state.webtoon_link,
        webtoon_img : this.state.webtoon_img,
      };

      fetch("http://localhost:4000/webtoonadd",{
          method:"post",
          headers : {
            "content-type" : "application/json",
          },
          body : JSON.stringify(webtoon),
        }).then(alert('성공적으로 추가되었습니다.'))
        .then(this.handleDialog());
    }

   

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value,
      });
    }

    handleDialog = () => {
      this.setState({dialog : !this.state.dialog});
    }

    handleRemove = () => {
      this.setState({remove : !this.state.remove});
    }

    componentDidUpdate(prevProps,prevState) {
      if(prevState.webtoon_view !== this.state.webtoon_view) {
        this.onCall();
      }
    }

    onChange = (e) => {
      this.setState({webtoon_img : e.target.files[0].name});
    }

   
    

      IncreaseView = () => {
          this.setState({
            webtoon_view : this.state.webtoon_view + 1,
            webtoon_name : this.props.name,
        });
      }




    render() {
        const img = this.props.img;
        const imgurl = "/webtoon/"+img;
        const { classes } = this.props;

        return (
          <div>
            <Card border="dark" style={{ marginBottom : '20px', marginLeft : '30px', marginRight : '30px'}}>
               <Card.Header>{this.props.header}</Card.Header>
               <Card.Body>
               <Grid container>
                 <Grid item xs = {12} lg = {2}>
                   <a href = {this.props.link}>
                  <img src = {imgurl} width = "180" alt = {img} onClick = {this.IncreaseView} />
                  </a>
                   <Card.Title>{this.props.name}</Card.Title>
                 </Grid>
                 <Grid item xs = {12} lg = {6}>
                    <Card.Text onClick = {this.IncreaseView}>
                      <p>조회수 : {this.props.view}</p>
                    </Card.Text>
                  </Grid>
                  <Grid item xs = {4} lg = {2}>
                     <StarRate2 rate = {this.props.rate} name = {this.props.name} />
                  </Grid>
                  <Grid item xs = {4} lg = {1}>
                    <Button variant = "outline-primary" onClick = {this.handleRemove}>삭제</Button>
                    </Grid>
                   </Grid>
                    </Card.Body>
                           </Card>
                           <Fab color = "primary" className = { classes.fab } onClick = {this.handleDialog}>
                        <AddIcon />
                </Fab>
                <Dialog open = {this.state.dialog} onClose = {this.handleDialog}>
                  <DialogTitle>웹툰 추가</DialogTitle>
                  <DialogContent>
                    <p>
                    <TextField label = "이름" type = "text" name = "webtoon_name" onChange = {this.handleChange} ></TextField>
                    </p>
                    <p>
                    <TextField label = "링크" type = "text" name = "webtoon_link" onChange = {this.handleChange} ></TextField>
                    </p>
                    <p>
                      <input type = "file" onChange = {this.onChange}></input>
                    </p>
                  </DialogContent>
                  <DialogActions>
                    <Button variant = "outline-primary" onClick = {this.add}>추가</Button>
                    <Button variant = "outline-secondary" onClick = {this.handleDialog}>닫기</Button>
                  </DialogActions>
                </Dialog>
                <Dialog open = {this.state.remove} onClose = {this.handleRemove}>
                  <DialogTitle>삭제하시겠습니까?</DialogTitle>
                  <DialogActions>
                    <Button variant = "outline-primary" onClick = {this.remove}>예</Button>
                    <Button variant = "outline-secondary" onClick = {this.handleRemove}>아니오</Button>
                  </DialogActions>
                </Dialog>
       </div>
        )
    }


}


export default withStyles(styles)(Cardcontent2);