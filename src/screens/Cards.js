import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lorem Ipsum
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc sit amet turpis id massa auctor egestas.
                    Praesent sed tristique eros.
                    Vestibulum consequat, justo in feugiat pellentesque, purus mauris semper lacus, vitae fermentum dui lectus a mi.
                    Vestibulum ante dolor, volutpat ut faucibus in, tincidunt eu enim.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={() => window.open("https://www.lipsum.com/", "_blank")}>Share</Button>
                <Button size="small" variant="outlined" onClick={() => window.open("https://www.adani.com/", "_blank")}>Learn More</Button>
            </CardActions>
        </Card>
    );
};
