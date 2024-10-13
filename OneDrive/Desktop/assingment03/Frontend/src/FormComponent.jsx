import  { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';

const FormComponent = ({ formType }) => {
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const countryCodes = ['+1', '+91', '+44', '+61'];

  const validateForm = () => {
    let formErrors = {};
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      formErrors.name = 'Name must be alphabetic characters only.';
    }
    if (!countryCode) {
      formErrors.countryCode = 'Please select a country code.';
    }
    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be numeric.';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
      const formData = { formType, name, countryCode, phoneNumber };
      try {
        const response = await axios.post('http://localhost:5000/submit-form', formData);
        console.log('Response from server:', response.data);
        setSubmitStatus('success');
        // Reset form
        setName('');
        setCountryCode('');
        setPhoneNumber('');
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      }
    } else {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const otherFormType = formType === 'A' ? 'B' : 'A';
  const otherFormLink = `/${otherFormType.toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg rounded-lg p-8 mb-8 max-w-2xl mx-auto"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-white">{`Form ${formType}`}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            placeholder="Enter your name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-300 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="countryCode">
            Country Code
          </label>
          <div className="relative">
            <select
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20  appearance-none focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            >
              <option value="">Select Country Code</option>
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          <AnimatePresence>
            {errors.countryCode && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-300 text-sm mt-1"
              >
                {errors.countryCode}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <label className="block text-white text-lg font-semibold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            placeholder="Enter your phone number"
          />
          <AnimatePresence>
            {errors.phoneNumber && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-300 text-sm mt-1"
              >
                {errors.phoneNumber}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:bg-opacity-90"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </motion.div>
      </form>

      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mt-6 p-4 rounded-md ${
              submitStatus === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <div className="flex items-center">
              {submitStatus === 'success' ? (
                <Check className="text-white mr-2" />
              ) : (
                <AlertCircle className="text-white mr-2" />
              )}
              <p className="text-white font-semibold">
                {submitStatus === 'success'
                  ? 'Form submitted successfully!'
                  : 'Error submitting form. Please try again.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 text-center"
      >
        <a
          href={otherFormLink}
          className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
        >
          Go to Form {otherFormType}
        </a>
      </motion.div>
    </motion.div>
  );
};

FormComponent.propTypes = {
  formType: PropTypes.oneOf(['A', 'B']).isRequired,
};

export default FormComponent;