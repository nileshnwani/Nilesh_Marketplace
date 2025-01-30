import React, { useState } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  Container
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addCurrency } from '../utils/addCurrency';
import Reviews from '../components/Reviews';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector(state => state.auth);

  const {
    data: product,
    isLoading,
    error
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: isCreateProductReviewLoading }] =
    useCreateProductReviewMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await createProductReview({
        productId,
        rating,
        comment
      });
      if (res.error) {
        toast.error(res.error?.data?.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
    setRating(0);
    setComment('');
  };

  return (
    <Container className='py-4'>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Link to='/' className='btn btn-primary mb-3'>
            &larr; Back to Products
          </Link>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={5} className='text-center'>
              <Image src={product.image} alt={product.name} fluid rounded className='shadow-sm'/>
            </Col>
            <Col md={7}>
              <Card className='shadow-sm p-3'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Price:</strong> {addCurrency(product.price)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>About:</strong> {product.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <span className='text-success'>In Stock</span>
                        ) : (
                          <span className='text-danger'>Out of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Select value={qty} onChange={e => setQty(Number(e.target.value))}>
                            {Array.from({ length: product.countInStock }, (_, i) => (
                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className='d-grid'>
                    <Button
                      variant='primary'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col md={12}>
              <Card className='shadow-sm p-3'>
                <Reviews
                  product={product}
                  userInfo={userInfo}
                  rating={rating}
                  laoding={isCreateProductReviewLoading}
                  setRating={setRating}
                  comment={comment}
                  setComment={setComment}
                  submitHandler={submitHandler}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductPage;
