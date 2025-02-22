import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addproductAPI, addtocartAPI, checksubscriptionAPI, deletecartAPI, getallproductsAPI, getcartAPI, getsubscriptionAPI, userLoginAPI, userLogoutAPI, userRegisterAPI, userverifyAPI } from "../../../APIS/User/userAPI";
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
  logout: unknown[]
  userverify: unknown[]
  addtocart: unknown[]
  getcart: unknown[]
  deletecart: unknown[]
  subscription:unknown[]
  subscribe:unknown[]
}

const initialState: Userstate = {
  loader: false,
  error: null,
  register: [],
  login: [],
  addproduct: [],
  getproducts: [],
  logout: [],
  userverify: [],
  addtocart: [],
  getcart: [],
  deletecart: [],
  subscription:[],
  subscribe:[]
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
  console.log(data);   
  try {
     
    const response: any = await getcartAPI(data);
    console.log(response);
    
    if (response.status == 200) {
      return response.data;
    } else {
      console.log(response);

    }
  } catch (error) {
    console.log(error);

  }
})



export const deleteCart = createAsyncThunk("deleteCart", async (data) => {
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
    if(response.status == 200){
      return response.data;
      
    }else{
      return response.data; 
    }
  } catch (error) {
    console.log(error);
    
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


  }
})

export default UserSlice.reducer;