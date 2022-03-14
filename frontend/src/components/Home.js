import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from './layout/MetaData';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Pagination from 'react-js-pagination';

import Product from './product/Product';
import Loader from './layout/Loader';

import { getProducts } from '../actions/productActions';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);

  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Books',
    'Furnitures',
    'Foods',
    'Accessories',
    'Clothes/Shoes',
    'Beauty/Health',
    'Outdoor',
    'Home',
  ];

  const {
    products,
    loading,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    // }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Buy the best product" />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: 'top',
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) =>
                          setTimeout(() => setPrice(price), 500)
                        }
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                                marginBottom: '5px',
                              }}
                              key={category}
                              onClick={() => {
                                setCategory(category);
                              }}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                                marginBottom: '5px',
                              }}
                              key={star}
                              onClick={() => {
                                setRating(star);
                              }}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;