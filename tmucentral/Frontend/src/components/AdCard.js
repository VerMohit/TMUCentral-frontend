import React from 'react';
import { Card } from 'react-bootstrap';
import defaultImage from '../default.jpg';
function AdCard({ price, title, description, image, postDate, location }) {
  price = `\$${price}.00`;

  const date = postDate.substring(0, 10);
  const time = postDate.substring(11, 20);
  postDate = date;

  return (
    <Card className="text-center" style={{paddingtTop: '200px'}}>
      <Card.Img
        variant="top"
        src={image || defaultImage}
        style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', marginTop: '10px', margin: '0 auto' }}
      />
      <Card.Body>
        <Card.Title style={{marginBottom:"30px"}}>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Price: {price}</Card.Subtitle>
        {/* <Card.Text style={{marginTop:"30px"}}>{description}</Card.Text> */}
        <Card.Text>Post Date: {postDate}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
