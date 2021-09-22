import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import meo from './img/meo.jpg'

const useStyles = makeStyles((theme) => ({
  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign:"center"
  },
  img: {
    width: "200px",
    borderRadius: "10px"
  }
}));

export default function TransitionsModal() {
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h4>© 2021 by FE class. Made with love by {" "}
      <a type="button" onClick={handleOpen}>
        {/* Trung PV */}
        {process.env.REACT_APP_NAME}
      </a>
      </h4>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img className={classes.img} src={meo} />
            <h2 id="transition-modal-title">Hi i am Trung</h2>
            <p id="transition-modal-description"> ("_") </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}