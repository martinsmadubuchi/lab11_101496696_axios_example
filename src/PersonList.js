import React, { Component } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';

class PersonList extends Component {
  //Define state default values
  state = {
    persons: []
  };

  //Component Lifecycle Callback
  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`)
      .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  render() {
    return (
      <div>
        {/* Green header */}
        <h1 className="bg-success text-center text-dark py-3 mb-3">User List</h1>

        <Container fluid>
          {this.state.persons.map(person => {
            const { street, city, state, country, postcode } = person.location;

            // Label/value pairs shown on the right side of each card
            const details = [
              { label: 'User Name:', value: person.login.username, big: true },
              { label: 'Gender:', value: person.gender.toUpperCase() },
              { label: 'Time Zone Description:', value: person.location.timezone.description },
              { label: 'Address:', value: `${street.number} ${street.name}, ${city}, ${state}, ${country} - ${postcode}` },
              { label: 'Email:', value: person.email },
              { label: 'Birth Date and Age:', value: `${person.dob.date} (${person.dob.age})` },
              { label: 'Register Date:', value: person.registered.date },
              { label: 'Phone#:', value: person.phone },
              { label: 'Cell#:', value: person.cell }
            ];

            return (
              <Card
                key={person.login.uuid}
                className="mb-3"
                style={{ backgroundColor: '#17a2b8' }}
              >
                <Card.Header className="fw-bold">
                  {person.name.title} {person.name.first} {person.name.last} - {person.login.uuid}
                </Card.Header>

                <Card.Body>
                  <Row>
                    {/* Left: picture + Details button */}
                    <Col md={2} className="text-center">
                      <Image
                        src={person.picture.large}
                        alt={`${person.name.first} ${person.name.last}`}
                        roundedCircle
                        fluid
                      />
                      <br />
                      <Button variant="primary" className="mt-3">Details</Button>
                    </Col>

                    {/* Right: user information */}
                    <Col md={10}>
                      {details.map(item => (
                        <Row key={item.label} className="mb-3">
                          <Col sm={3} className="text-end">{item.label}</Col>
                          <Col sm={9} className={item.big ? 'fs-5' : ''}>{item.value}</Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default PersonList;