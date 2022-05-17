import  React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {AuthContext} from '../authenticaion/ProvideAuth';
import { BACKEND_URL } from "../../services/constants"
import { BACKEND_PORT } from "../../services/constants";
import react, { useState, useEffect } from "react";
function Wallet(props) {


  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;
    var post = {
        image: "https://previews.123rf.com/images/anatolir/anatolir1802/anatolir180202749/95325241-wallet-icon-simple-illustration-of-wallet-vector-icon-for-web.jpg",
        imageLabel:"img"
    }
    const [balance, setBalance] = useState('');
    
    useEffect(async ()=> {
      const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const {userId} = user;
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/ride/inBalance?userId=${userId}`, options);
    const status = response.status;
    const data1  = await response.json();
    setBalance( data1.payload[0].balance)
    console.log("hello", data1.payload[0].balance)
    },[])
    // const val = sessionStorage.getItem('curBalance')
    
  return (
    <>
    {!loading && (
    <Grid item xs={12} md={15}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" paragraph>
              {/* {post.description} */}
              Wallet
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {/* {post.date} */}
              Current balance
            </Typography>
            <Typography component="h2" variant="h2">
              {user.walletBalance > 0 ? Math.round(user.walletBalance - balance)  : 0} $
            </Typography>
            
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
    )}
    </>
  );
}

Wallet.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Wallet;