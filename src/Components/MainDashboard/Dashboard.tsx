import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, ClipboardList, Trash2 } from 'lucide-react';
import { RootState } from '@/Redux/App/store';
import { useAppDispatch } from '@/hooks';
import { useSelector } from 'react-redux';
import { deleteOrder, deleteProduct, deleteUser, getOrders, getProductsdata, getUsers } from '@/Redux/Slices/User/userSlice';
import toast from 'react-hot-toast';


interface User {
  _id: string;
  name?: string; // Add other user properties as needed
  email?: string;
  Firstname?:string;
  mobile?:string;
  status?:string;
  price?:string;
}

type UserVerifyResponse = User[]

const Dashboard = () => {

  
  const dispatch = useAppDispatch();
  const {deleteuser,deleteorder,deleteproduct} = useSelector((state:RootState)=>state.User);
  const {getallusers} = useSelector((state:RootState)=>state.User as {getallusers : UserVerifyResponse[]} );
  const {getproducts} = useSelector((state:RootState)=>state.User as {getproducts : UserVerifyResponse[]} );
  const {getorders} = useSelector((state:RootState)=>state.User as {getorders : UserVerifyResponse[]} );



  // console.log(getorders);




   
     let customers = getallusers?.[0]?.map((user:any)=>{
        return {
          id:user?._id,
          name:user?.Firstname,
          address:user?.address
        }
     })

     let products = getproducts?.[0]?.map((product:any)=>{
      return {
        id:product?._id,
        name:product?.productname,
        price:product?.price
      }
   })

   let orders = getorders?.[0]?.map((order:any)=>{
    return {
      id:order?._id,
      customer:order?.Firstname,
      product:order?.productname,
      status:"pending"
    }
 })


 

 const handleDeleteCustomer = (id:any)=>{
  
   dispatch(deleteUser(id)).then((res)=>{
    if(res.payload){
      toast.success("user deleted successfully")
    }
   }).catch((error)=>{
    toast.error("error while deleting user")
   })
 }


 const handleDeleteOrder = (id:any)=>{

  console.log(id);
  
  
  dispatch(deleteOrder(id)).then((res)=>{
   if(res.payload){
     toast.success("order deleted successfully")
   }
  }).catch((error)=>{
   toast.error("error while deleting order")
  })
}


const handleDeleteProduct = (id:any)=>{

  console.log(id)
  
  dispatch(deleteProduct(id)).then((res)=>{
   if(res.payload){
     toast.success("product deleted successfully")
   }
  }).catch((error)=>{
   toast.error("error while deleting product")
  })
}
    
    
     
   
    const getData = ()=>{
      dispatch(getUsers());
      dispatch(getProductsdata());
      dispatch(getOrders());
    }

  useEffect(()=>{
  getData();
  },[])

  useEffect(()=>{
    getData();
  },[deleteuser,deleteorder,deleteproduct])

 

  return (
    <div>
       <div className="min-h-screen bg-gray-50 p-8">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Customers Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Customers</p>
              <h3 className="text-2xl font-bold mt-1">{customers?.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{getorders?.[0]?.length}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Today's Orders Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Today's Orders</p>
              <h3 className="text-2xl font-bold mt-1">
                {getorders?.[0]?.length}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tables Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Customers</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers?.map((customer:any) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products?.map((product:any) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders?.map((order:any) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => {handleDeleteOrder(order.id);
                        }}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
