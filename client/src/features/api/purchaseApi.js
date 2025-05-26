import   {createApi} from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API="http://localhost:8000/api/v1/purchase"

export const purchaseApi=createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseurl:COURSE_PURCHASE_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        createCheckoutSession:builder.mutation({
            query:(courseId)=>({
                url:"/checkout/create-checkout-session",
                method:"POST",
                body:courseId
            })
        })
    })
})

export const {useCreateCheckoutSessionMutation}=purchaseApi;