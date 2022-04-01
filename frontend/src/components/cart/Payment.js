import React, { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, clearErrors } from '../../actions/orderActions';

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';

import axios from 'axios';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Payment = ({ history }) => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const cashOnDeliveryHandler = () => {
    const orderData = {
      orderItems: cartItems,
      shippingInfo,
      itemsPrice: orderInfo.itemsPrice,
      taxPrice: orderInfo.taxPrice,
      shippingPrice: orderInfo.shippingPrice,
      totalPrice: orderInfo.totalPrice,
      paymentInfo: {
        paymentMethod: 'Cash on Delivery',
        id: `${Math.round(Math.random() * 1000000000000) + Date.now()}`,
        status: 'Pending',
      },
      user: user._id,
    };

    dispatch(createOrder(orderData));
    history.push('/success');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      res = await axios.post('/api/v1/payment/process', paymentData, config);

      const clientSecret = res.data.client_secret;

      // console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            paymentMethod: 'Stripe',
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push('/success');
        } else {
          alert.error('There is some issue while payment processing');
        }
      }
    } catch (error) {
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <Fragment>
      <MetaData title={'Payment'} />

      <CheckoutSteps shipping confirmOrder payment />

      <Container fluid className="my-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first" style={{ cursor: 'pointer' }}>
                    Pay - CARD
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" style={{ cursor: 'pointer' }}>
                    CASH ON DELIVERY
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    <Card className="w-100 p-3">
                      <form onSubmit={submitHandler}>
                        <h1 className="mb-4 text-center">Card Info</h1>
                        <div className="form-group">
                          <label className="" htmlFor="card_num_field">
                            Card Number
                          </label>
                          <CardNumberElement
                            type="text"
                            id="card_num_field"
                            className="form-control"
                            options={options}
                          />
                        </div>

                        <div className="form-group">
                          <label className="" htmlFor="card_exp_field">
                            Card Expiry
                          </label>
                          <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control "
                            options={options}
                          />
                        </div>

                        <div className="form-group">
                          <label className="" htmlFor="card_cvc_field">
                            Card CVC
                          </label>
                          <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control "
                            options={options}
                          />
                        </div>

                        <Button
                          id="pay_btn"
                          type="submit"
                          className="btn btn-block py-3 "
                        >
                          Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </Button>
                      </form>
                    </Card>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    <Card className="w-100 p-3">
                      <h3 className="text-center">Cash On Delivery</h3>
                      <Card.Body>
                        <li>Make Sure You Choosed Correct Product</li>
                        <li>Make Sure You Have Provided Exact Location</li>
                        <li>You Have To Pay Cash Or Online On Order Arrival</li>
                        <li>You Will Be Notified After Confirming Order</li>
                      </Card.Body>
                      <Button onClick={cashOnDeliveryHandler} className="p-3">
                        Confirm Order{` - ${orderInfo && orderInfo.totalPrice}`}
                      </Button>
                    </Card>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Fragment>
  );
};

export default Payment;
