"use client"
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAppDispatch } from '@/hooks';
import { AddProduct } from '@/Redux/Slices/User/userSlice';
import toast from 'react-hot-toast';

const Product = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<any>(null);
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    price: "",
    subprice: "",
    rating: "4"
  });

  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // First set the image state
    setImage(file);
    
    // Then create the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Log the file directly instead of the state
    // console.log('Selected image file:', file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = new FormData();
    
      const { productname,description,price,subprice,rating } = formData
      productData.append("productname",productname)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("subprice",subprice)
      productData.append("rating",rating)
      productData.append("productuploads",image)

      const config = {
        "Content-Type":"multipart/formdata"
      }

      const data = {
        data:productData,
        config
      }

      const adminSecret = localStorage.getItem("admin");

      if(adminSecret == "admin@kk"){
        dispatch(AddProduct(data)).then((res)=>{
          if(res.payload){
            setFormData({...formData,productname:"",description:"",price:"",subprice:""});
            setImage("");
          }
        })
      }else{
        toast.error("Website is Under attack ")
      }
      


  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      aria-label="Upload product image"
                    />
                    <div className="h-full flex flex-col items-center justify-center">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Click or drag image to upload
                      </p>
                      {image && <p className="mt-2 text-sm text-green-500">Selected: {image.name}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter product description"
                />
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Sub Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="subprice"
                      value={formData.subprice}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;

