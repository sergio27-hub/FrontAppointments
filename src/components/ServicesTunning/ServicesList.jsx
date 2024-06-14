import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import BookingModal from '../appointments/newAppointmentsModal/newAppointments';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 5; // Número de elementos por página

  useEffect(() => {
    fetchServices(page);
  }, [page]);

  const fetchServices = async (page) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      const offset = (page - 1) * limit;

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/services?offset=${offset}&limit=${limit}`, {
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

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto p-5">
      <h1 className="text-center text-3xl md:text-5xl mb-5 text-tittle-service">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
        {services.map((service) => (
          <div key={service._id} className="border border-gray-300 rounded-lg p-5 bg-white shadow-lg transform transition-transform hover:scale-105">
            <div className="object-cover">
              <Slider {...settings}>
                {service.imageUrls.map((image, index) => (
                  <div key={index}>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}${image}`}
                      alt={service.name}
                      className="w-full h-80 md:h-96 lg:h-64 object-fill rounded-xl border-2 border-blue-500 shadow-2xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="mt-4">
              <h2 className="text-xl md:text-2xl mb-2 text-gray-800">{service.name}</h2>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-lg font-bold text-gray-900">Price: ${service.price}</p>
              <button
                className="flex mt-5 mx-auto rounded-2xl border-2 border-dashed border-black bg-white px-4 md:px-6 py-2 md:py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
                onClick={() => handleOpenModal(service)}
              >
                Manage Booking
              </button>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example" className="mt-8 text-center p-8">
        <ul className="flex justify-center gap-2 list-none">
          <li>
            <a
              className={`block px-4 py-2 rounded ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
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
                className="block px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                href="#"
                onClick={(e) => handlePageClick(e, i + 1)}
              >
                {i + 1}
              </a>
            </li>
          ))}
          <li>
            <a
              className={`block px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
              href="#"
              onClick={handleNextPage}
              aria-disabled={page === totalPages}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
      {selectedService && (
        <BookingModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default ServiceList;
