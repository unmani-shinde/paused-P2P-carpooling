import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
function WithHeaderExample() {
  const [hovered, setHovered] = useState(false);
  return (
    <Card className="active-ride-card">
      <Card.Header>Featured</Card.Header>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1613638377394-281765460baa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80" width="40%" height="auto"/>
      <Card.Body>    
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary" className="cancel-button" style={{
        backgroundColor: hovered ? '#DC3535' : 'transparent',
        transition: 'background-color 0.5s ease-in-out'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>cancel ride</Button>
      </Card.Body>
    </Card>
  );
}

export default WithHeaderExample;