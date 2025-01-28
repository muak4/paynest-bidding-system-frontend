import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddItemMutation } from '../store/slices/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [addItem, { isLoading }] = useAddItemMutation();
  const [apiError, setApiError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    startingPrice: Yup.number()
      .min(1, 'Starting price must be at least $1')
      .required('Starting price is required'),
    duration: Yup.number()
      .min(1, 'Duration must be at least 1 hour')
      .required('Duration is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startingPrice: '',
      duration: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setApiError(null);
      try {
        const { name, description, startingPrice, duration } = values;
        const payload = {
          name,
          description,
          startingPrice: Number(startingPrice),
          duration: Number(duration) * 3600,
          createdBy: user.id,
        };
        await addItem(payload).unwrap();
        formik.resetForm();
        navigate('/');
      } catch (error) {
        const errorMessage =
          error && typeof error === 'object' && 'data' in error
            ? (error.data as { message?: string }).message ||
              'Something went wrong'
            : 'An unknown error occurred';
        setApiError(errorMessage);
      }
    },
  });

  return (
    <div className="py-[10px] md:py-[20px] lg:py-[30px] xl:py-[40px]">
      <div className="container mx-auto max-w-[700px]">
        <div className="space-y-[15px] mb-[20px] max-w-[450px] mx-auto text-center">
          <h2 className="font-bold text-[25px] md:text-[30px] lg:text-[35px] leading-tight text-[#0f1c62] mb-4">
            Add an Item for Auction
          </h2>
          <p className="text-gray-600 mb-4">
            Provide the necessary details to list your item for auction.
          </p>
        </div>

        <div className="bg-[#F8F6F5] rounded-[20px] p-[30px] sm:p-[55px]">
          <form onSubmit={formik.handleSubmit} className="space-y-[25px]">
            {apiError && <p className="text-red-500">{apiError}</p>}

            <div>
              <label
                htmlFor="name"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Item Name"
                {...formik.getFieldProps('name')}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                {...formik.getFieldProps('description')}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B] h-[100px]"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="startingPrice"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Starting Price ($)
              </label>
              <input
                type="number"
                id="startingPrice"
                placeholder="Starting Price"
                {...formik.getFieldProps('startingPrice')}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              />
              {formik.touched.startingPrice && formik.errors.startingPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.startingPrice}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="duration"
                className="font-bold text-black text-[14px] md:text-[16px] block mb-[10px]"
              >
                Duration (Hours)
              </label>
              <input
                type="number"
                id="duration"
                placeholder="Duration in Hours"
                {...formik.getFieldProps('duration')}
                className="bg-white text-[#4A4E4B] border border-[#bbb4b4] rounded-[6px] h-[54px] block w-full py-[5px] px-[25px] focus:outline-none placeholder-[#4A4E4B]"
              />
              {formik.touched.duration && formik.errors.duration && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.duration}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="py-[15px] px-[30px] block w-full rounded-[6px] bg-primary-color text-white font-semibold text-[16px] md:text-[18px] transition duration-500 ease-in-out hover:bg-secondary-color"
                disabled={isLoading}
              >
                {isLoading ? 'Adding Item...' : 'Add Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;
