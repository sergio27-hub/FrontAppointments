import React, { useState, useEffect } from 'react';
import './index.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Número de elementos por página

  useEffect(() => {
    fetchServices(page);
  }, [page]);

  const fetchServices = async (page) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      const offset = (page - 1) * limit;

      const response = await fetch(`http://localhost:3000/services?offset=${offset}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(data.results);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageClick = (e, pageNumber) => {
    e.preventDefault();
    setPage(pageNumber);
  };

  return (
    <div className="service-list-container">
      <h1 className="service-list-title">Our Services</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <h2 className="service-title">{service.name}</h2>
            <p className="service-description">{service.description}</p>
            <p className="service-price">Price: ${service.price}</p>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example" className="pagination-nav">
        <ul className="pagination-list">
          <li>
            <a
              className="pagination-link"
              href="#"
              onClick={handlePrevPage}
              aria-disabled={page === 1}
            >
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1}>
              <a
                className="pagination-link"
                href="#"
                onClick={(e) => handlePageClick(e, i + 1)}
              >
                {i + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              className="pagination-link"
              href="#"
              onClick={handleNextPage}
              aria-disabled={page === totalPages}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ServiceList;
