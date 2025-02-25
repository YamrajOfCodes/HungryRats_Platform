import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addproductAPI, addtocartAPI, checksubscriptionAPI, contactAPI, deletecartAPI, deleteorderAPI, deleteproductAPI, deleteuserAPI, getallCustomersAPI, getallproductsAPI, getcartAPI, getordersAPI, getsubscriptionAPI, postorderAPI, userLoginAPI, userLogoutAPI, userRegisterAPI, userverifyAPI } from "../../../APIS/User/userAPI";
import toast from "react-hot-toast";


interface LoginData {
  email: string;
  password: string;
}

// Define the expected response type (adjust as per your API response)
interface ResponseData {
  token: string;
}

interface Userstate {
  loader: boolean,
  error: string | null,
  register: unknown[],
  login: unknown[],
  addproduct: unknown[]
  getproducts: unknown[],
  deleteproduct:unknown[]
  logout: unknown[]
  userverify: unknown[]
  addtocart: unknown[]
  getcart: unknown[]
  deletecart: unknown[]
  subscription:unknown[]
  subscribe:unknown[]
  contact:unknown[]
  postorder:unknown[]
  getallusers:unknown[]
  getorders:unknown[]
  deleteuser:unknown[]
  deleteorder:unknown[]
}

const initialState: Userstate = {
  loader: false,
  error: null,
  register: [],
  login: [],
  addproduct: [],
  getproducts: [],
  deleteproduct:[],
  logout: [],
  userverify: [],
  addtocart: [],
  getcart: [],
  deletecart: [],
  subscription:[],
  subscribe:[],
  contact:[],
  postorder:[],
  getallusers:[],
  getorders:[],
  deleteuser:[],
  deleteorder:[]
}

interface Data {
  Firstname: string,
  Lastname: string,
  email: string,
  mobile: string,
  address: string,
  password: string,
  confirmpassword: string
}





export const Register = createAsyncThunk("register", async (data: Data) => {
  try {
    const response: any = await userRegisterAPI(data);
    if (response.status == 200) {
      return response.data
    } else {
      toast.error(response.response.data.error)
    }
  } catch (error) {
    console.log(error);

  }
})


export const Login = createAsyncThunk("logindata", async (data: any) => {
  try {
    const response: any = await userLoginAPI(data);
    if (response.status == 200) {
      localStorage.setItem("login", response.data.token)
      // console.log(response);

      return response.data
    } else {
      toast.error(response.response.data.error);
      // console.log(response);

    }
  } catch (error) {
    console.log(error);

  }
})

export const Logout = createAsyncThunk("userlogout", async () => {
  try {
    const response: any = await userLogoutAPI();
    if (response.status == 200) {
      toast.success("logout successfully");
      localStorage.removeItem("login")
      return response.data;
    } else {
      toast.success("logout successfully");
      return response.data
    }
  } catch (error) {
    console.log(error);

  }
})


export const userVerify = createAsyncThunk("userverify", async () => {
  try {
    const response: any = await userverifyAPI();
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);

  }
})


export const AddProduct = createAsyncThunk("addproduct", async (data: any) => {
  try {
    const response: any = await addproductAPI(data.data, data.config);
    // console.log(response);

    if (response.status == 200) {
      toast.success("product is added");
      return response.data;
    } else {
      toast.error(response.response.data.error)
    }
  } catch (error) {
    console.log(error);

  }
})


export const getProductsdata = createAsyncThunk("getallproducts", async () => {
  try {
    const response: any = await getallproductsAPI();
    if (response.status == 200) {
      return response.data
    } else {
      return response.data
    }
  } catch (error) {
    console.log(error);

  }
})


export const deleteProduct = createAsyncThunk("deleteproduct",async(data:string)=>{
  try {
    const response:any = await deleteproductAPI(data);
    if(response.status == 200){
     return response.data
    }
  } catch (error) {
   console.log(error);
   
  }
})



// CartAPI

export const AddToCart = createAsyncThunk("addtocart", async (data:any) => {
  try {
    const response: any = await addtocartAPI(data);
    if (response.status == 200) {
      toast.success("added sucessfully")
      return response.data;
    } else {
      console.log(response);

    }
  } catch (error) {
    console.log(error);

  }
})




export const getCart = createAsyncThunk("getCart", async (data:any) => {
  // console.log(data);   
  try {
     
    const response: any = await getcartAPI(data);
    // console.log(response);
    
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);

    }
  } catch (error) {
    console.log(error);

  }
})



export const deleteCart = createAsyncThunk("deleteCart", async (data:any) => {
  try {
    const response: any = await deletecartAPI(data);
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);

    }
  } catch (error) {
    console.log(error);

  }
})

export const CheckSubscription = createAsyncThunk("checksubscription",async(data:string)=>{
  try {
    const response:any  =  await checksubscriptionAPI(data);
    // console.log(response);
    
    if(response.status == 200){
      // console.log(response.data);
      
      return response.data;
      
    }else{
      // console.log(response.response.data);
      return response.response.data; 
    }
  } catch (error) {
    
    
  }
})



export const Subscribe = createAsyncThunk("subscribe",async(data:any)=>{
  try {
    const response:any  =  await getsubscriptionAPI(data);
    if(response.status == 200){
      return response.data;
      
    }else{
      console.log(response.data);
      return response.data; 
    }
  } catch (error) {
    console.log(error);
    
  }
})


export const Contact = createAsyncThunk("contact",async(data:any)=>{
  try {
    const response:any  =  await contactAPI(data);
    if(response.status == 200){
      toast.success("Thanks For Contacting Us");
      return response.data;
      
    }else{
      console.log(response.data);
      return response.data; 
    }
  } catch (error) {
    console.log(error);
    
  }
})


export const PostOrder = createAsyncThunk("createorder",async(data:any)=>{
  try {
    const response:any = await postorderAPI(data)
    if(response.status == 200){
      toast.success("Order is placed");
      return response.data
    }else{
      console.log(response);
      return response.data
      
    }
  } catch (error) {
    
  }
})

export const getUsers = createAsyncThunk("getallusers",async()=>{
  try {
    const response:any = await getallCustomersAPI();
    if(response.status==200){
      return response.data
    }
  } catch (error) {
    console.log(error);
    
  }
})

export const getOrders = createAsyncThunk("getorders",async()=>{
  try {
    const response:any  = await getordersAPI();
    if(response.status == 200){
      return response.data
    }
  } catch (error) {
    console.log(error);
    
  }
})

export const deleteUser = createAsyncThunk("deleteuser",async(data:string)=>{
   try {
     const response:any = await deleteuserAPI(data);
     if(response.status == 200){
      return response.data
     }
   } catch (error) {
    console.log(error);
    
   }
})



export const deleteOrder = createAsyncThunk("deleteorder",async(data:string)=>{
  try {
    const response:any = await deleteorderAPI(data);
    if(response.status == 200){
     return response.data
    }
  } catch (error) {
   console.log(error);
   
  }
})


export const UserSlice = createSlice({
  name: "userslice",
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(Register.pending, (state) => {
      state.loader = true
    })
      .addCase(Register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.register = [action.payload]
      })
      .addCase(Register.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })

    // login

    builders.addCase(Login.pending, (state) => {
      state.loader = true
    })
      .addCase(Login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.login = [action.payload]
      })
      .addCase(Login.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })


    // userverify

    builders.addCase(userVerify.pending, (state) => {
      state.loader = true
    })
      .addCase(userVerify.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.userverify = [action.payload]
      })
      .addCase(userVerify.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })



    // logout

    builders.addCase(Logout.pending, (state) => {
      state.loader = true
    })
      .addCase(Logout.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.logout = [action.payload];
        state.userverify = []
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })



    // addproduct

    builders.addCase(AddProduct.pending, (state) => {
      state.loader = true
    })
      .addCase(AddProduct.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.addproduct = [action.payload]
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })

    //getProductsData

    builders.addCase(getProductsdata.pending, (state) => {
      state.loader = true
    })
      .addCase(getProductsdata.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.getproducts = [action.payload]
      })
      .addCase(getProductsdata.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })

    // addtocart

    builders.addCase(AddToCart.pending, (state) => {
      state.loader = true
    })
      .addCase(AddToCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.addtocart = [action.payload]
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })

       // getcart

    builders.addCase(getCart.pending, (state) => {
      state.loader = true
    })
      .addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.getcart = [action.payload]
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })


       // deletecart

    builders.addCase(deleteCart.pending, (state) => {
      state.loader = true
    })
      .addCase(deleteCart.fulfilled, (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.deletecart = [action.payload]
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message || null
      })

      // checkSubscription


      builders.addCase(CheckSubscription.pending, (state) => {
        state.loader = true
      })
        .addCase(CheckSubscription.fulfilled, (state, action: PayloadAction<any>) => {
          state.loader = false;
          state.subscription = [action.payload]
        })
        .addCase(CheckSubscription.rejected, (state, action) => {
          state.loader = false;
          state.error = action.error.message || null
        })

         
        // Create Order


        builders.addCase(PostOrder.pending, (state) => {
          state.loader = true
        })
          .addCase(PostOrder.fulfilled, (state, action: PayloadAction<any>) => {
            state.loader = false;
            state.postorder = [action.payload]
          })
          .addCase(PostOrder.rejected, (state, action) => {
            state.loader = false;
            state.error = action.error.message || null
          })





        //contact


        builders.addCase(Contact.pending, (state) => {
          state.loader = true
        })
          .addCase(Contact.fulfilled, (state, action: PayloadAction<any>) => {
            state.loader = false;
            state.contact = [action.payload]
          })
          .addCase(Contact.rejected, (state, action) => {
            state.loader = false;
            state.error = action.error.message || null
          })


          //getusers

          builders.addCase(getUsers.pending, (state) => {
            state.loader = true
          })
            .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
              state.loader = false;
              state.getallusers = [action.payload]
            })
            .addCase(getUsers.rejected, (state, action) => {
              state.loader = false;
              state.error = action.error.message || null
            })


            //getorder

            builders.addCase(getOrders.pending, (state) => {
              state.loader = true
            })
              .addCase(getOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.getorders = [action.payload]
              })
              .addCase(getOrders.rejected, (state, action) => {
                state.loader = false;
                state.error = action.error.message || null
              })

              //deleteuser

              builders.addCase(deleteUser.pending, (state) => {
                state.loader = true
              })
                .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
                  state.loader = false;
                  state.deleteuser = [action.payload]
                })
                .addCase(deleteUser.rejected, (state, action) => {
                  state.loader = false;
                  state.error = action.error.message || null
                })


                
              builders.addCase(deleteOrder.pending, (state) => {
                state.loader = true
              })
                .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<any>) => {
                  state.loader = false;
                  state.deleteorder = [action.payload]
                })
                .addCase(deleteOrder.rejected, (state, action) => {
                  state.loader = false;
                  state.error = action.error.message || null
                })



                builders.addCase(deleteProduct.pending, (state) => {
                  state.loader = true
                })
                  .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
                    state.loader = false;
                    state.deleteproduct = [action.payload]
                  })
                  .addCase(deleteProduct.rejected, (state, action) => {
                    state.loader = false;
                    state.error = action.error.message || null
                  })




  }
})

export default UserSlice.reducer;