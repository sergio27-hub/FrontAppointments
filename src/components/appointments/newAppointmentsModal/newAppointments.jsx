import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingModal = ({ isOpen, onRequestClose, service }) => {
  const [user, setUser] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      if (token && userId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          setUser(data);
          setCustomerName(data.name);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
    setAvailableTimes([
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '01:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ]);
  }, []);

  const validateFields = () => {
    const errors = {};

    if (!customerName) {
      errors.customerName = 'Customer name is required';
    }

    if (!appointmentTime) {
      errors.appointmentTime = 'Appointment date is required';
    }

    if (!selectedTime) {
      errors.selectedTime = 'Appointment time is required';
    }

    return errors;
  };

  const handleBooking = async () => {
    const fieldErrors = validateFields();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    if (!user) {
      toast.error('User data not loaded. Please try again.');
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem('token');
    const appointmentDate = appointmentTime.toISOString().split('T')[0];
    const appointmentDateTime = new Date(`${appointmentDate}T${selectedTime.split(' ')[0]}:00Z`);

    const bookingData = {
      customerName,
      appointmentTime: appointmentDateTime.toISOString(),
      service: service.name,
      user: user.username
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      toast.success('Booking successfully created!');
      setTimeout(onRequestClose, 3000); // Delay the modal close by 3 seconds
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('please login reset');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    toast.warn('Booking closed without saving changes.');
    onRequestClose();
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Manage Booking"
        className="bg-white p-8 rounded-lg shadow-lg w-96 mx-auto my-20"
        overlayClassName="appointment fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Manage Booking for {service.name}</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
          <div>
            <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>
          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <DatePicker
              id="appointmentTime"
              selected={appointmentTime}
              onChange={(date) => setAppointmentTime(date)}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              disabled={isSubmitting}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.appointmentTime && <p className="text-red-500 text-xs mt-1">{errors.appointmentTime}</p>}
          </div>
          <div>
            <label htmlFor="appointmentTimeSelect" className="block text-sm font-medium text-gray-700">Appointment Time</label>
            <select
              id="appointmentTimeSelect"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={isSubmitting}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a time</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.selectedTime && <p className="text-red-500 text-xs mt-1">{errors.selectedTime}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default BookingModal;
