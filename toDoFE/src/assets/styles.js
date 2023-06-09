import { makeStyles,alpha } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    //   backgroundColor: alpha('#ffffff', 0.6),
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(2),
      color:"white",
      marginBottom:'5px',
      padding:'10px',
      backgroundColor: alpha('#fff0f5',0.9)

    }, 
    input: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
      color:"white",
      margin:"10px",
      padding:'10px',
    },
    input1: {
        color: 'white'
    },
    list: {
      marginTop: theme.spacing(2),
      width: '100%',
      maxWidth: 360,
      maxHeight: '28rem',
      overflow: "scroll",
      backgroundColor: alpha('#f9e0ff', 0.8),
    },
  }));

  export default useStyles;