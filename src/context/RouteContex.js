import React,{createContext,useState} from "react"
import {useRouter} from "next/router";

const RouteContext= createContext();
const {Provider}=RouteContext

 const RouteProvider=({children})=>{
    const [routeState,setRouteState]=useState({location:""})

    //  let location = undefined
     let location = '2/15, Samiyar Madam, Kodambakkam, Chennai, Tamil Nadu 600033, India'
     if (typeof window !== 'undefined') {
         location = localStorage.getItem('location')
     }
     const setRouterInfo=(location)=>{
         setRouterInfo({location:location})
     }
     const isRouterInfo = () => {
         if (!routeState.location) {
             return false;
         }
     };
     return (
         <Provider value={
             {
                 routeState,
                 setRouteState:((routerInfo)=>setRouterInfo(routerInfo)),
                 isRouterInfo
             }
         }>
             {children}
         </Provider>
     )

 }

export {RouteContext,RouteProvider}