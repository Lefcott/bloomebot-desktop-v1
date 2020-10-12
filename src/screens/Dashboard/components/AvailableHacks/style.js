import { makeStyles } from '@material-ui/core/styles';

const titleBlack = 'rgba(0, 0, 0, 0.7)';
export default makeStyles({
  root: {
    width: 230
    // height: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.23)',
    // paddingTop: 23,
    // borderRadius: 23
  },
  card: {
    margin: 7.7,
    maxWidth: 345,
    flexGrow: 1
  },
  title: {
    // position: 'absolute',
    // transform: 'translate(-100%)',
    // left: 'calc(100% - 10px)',
    // top: '10px',
    position: 'relative',
    top: -60,
    left: 12,
    width: 'fit-content',
    color: '#fff',
    fontSize: 16,
    backgroundColor: titleBlack,
    borderRadius: '20px',
    boxShadow: `0 0 2px 3px ${titleBlack}`,
    padding: '1px 8px 3px 8px',
    textShadow: '0 0 50px'
  },
  secondTitle: {
    fontSize: 14
  },
  spinner: {
    width: 300,
    height: 300
  },
  cardContent: {
    padding: '5px 20px 0 10px'
  },
  grid: {
    margin: '7.7px 0 0 7.7px',
    padding: 0
  },
  media: {
    height: 140
  },
  button: {
    backgroundColor: 'lightblue',
    boxShadow: '0 0 3px 3px #fff',
    textAlign: 'center',
    cursor: 'pointer',
    width: '90%',
    fontSize: 8,
    padding: 5
  }
});
