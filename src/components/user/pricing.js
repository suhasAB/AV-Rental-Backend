import React, {useState, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {updateUserProfile} from '../../services/userService';
import { AuthContext } from '../authenticaion/ProvideAuth';
import { useHistory } from 'react-router';
import Snackbar from '@mui/material/Snackbar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©️ '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//   function Discount (price)  {
//     const authContext = useContext(AuthContext);
//     const {user} = authContext;
//             const startDate = user.signedUpOn;
//             const currentDate = new Date();
//             const diffTime = Math.abs(currentDate - startDate);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
//             console.log(diffDays);
           
//             /*check if current day is weeked or weekday*/
//             const today = new Date()
//             const day = today.getDay();
//             if(day == 0 || day == 6)
//             console.log("weekend");
//             else{
//             console.log("weekday");
//             const hour = today.getHours();
//             if(hour>16 && hour<19)
//             console.log("evening");
//            }
// }  

const tiers = [
  {
    title: 'Free',
    price: '0',
    walletUpgrade: 0,
    description: [
      '100$ signup rewards',
      'Valid for 3 months',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'contained',
  },
  {
    title: 'Pro',
    price: '25',
    discountedPrice: '20',
    walletUpgrade: 15,
    description: [
      '100$ Signup rewards',
      '100$ Addtional wallet rewards',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '35',
    discountedPrice: '30',
    walletUpgrade: 30,
    description: [
      '100$ Signup rewards',
      '200$ Addtional wallet rewards',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },
];

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];



function PricingContent() {

  const authContext = useContext(AuthContext);
  const {user, setUser, token, updateLocalStorage} = authContext;
  const [open, setOpen] = useState(false);
  const history = useHistory();
  

  const handleClose = () => {
    setOpen(false);
  } 

  const walletUpgradeHandler = async (tier) => {

    var newBalance;
    //console.log("walletUpgrade : ", walletUpgrade);
     
    if (tier.title === 'Enterprise'){

      if ((Math.ceil(Math.abs(new Date() - new Date(user.signedUpOn)) / (1000 * 60 * 60 * 24))) > 30){
        newBalance = 40;
      }
      else{
        newBalance = 50;
      }
    }

    if (tier.title === 'Pro'){

      if ((Math.ceil(Math.abs(new Date() - new Date(user.signedUpOn)) / (1000 * 60 * 60 * 24))) > 30){
        newBalance = 20;
      }
      else{
        newBalance = 25;
      }
   }

    const obj = {
      ...user,
      walletBalance: user.walletBalance +newBalance
    }
    const response = await updateUserProfile(obj);
    console.log(response);
    if(response.status === 200){
      // window.alert("Wallet has been upgraded to $ " + walletUpgrade);
      setOpen(true);
      setUser(response.data.payload.data);
      updateLocalStorage(user, token);
      setTimeout(()=>{
        console.log("history.push('/Dashboard');");
        history.push('/Dashboard');
      }, 500);
    } 
    else{
      console.log('Error Occuered');
    }
  }



  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Payment Plan Updated"
      />
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Payment Plan
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Choose a payment plan to get started!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      
                       {
                          (tier.title === 'Free' ? 0 :
                          (tier.title === 'Pro' ? ((Math.ceil(Math.abs(new Date() - new Date(user.signedUpOn)) / (1000 * 60 * 60 * 24))) > 30 ? 20 : 25) :   
                          ((Math.ceil(Math.abs(new Date() - new Date(user.signedUpOn)) / (1000 * 60 * 60 * 24))) > 30 ? 40 : 50)
                          )
                          )
                       }
                                   
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={()=>walletUpgradeHandler(tier)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}

              
