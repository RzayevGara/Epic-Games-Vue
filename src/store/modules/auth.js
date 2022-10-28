import Commerce from '@chec/commerce.js';
import {auth, db} from '../../firebase'
import { collection, getDoc, getDocs,  doc, setDoc } from "firebase/firestore"; 
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import axios from 'axios'

const commerce = (typeof import.meta.env.VITE_CHEC_PUBLIC_KEY !== 'undefined')
  ? new Commerce(import.meta.env.VITE_CHEC_PUBLIC_KEY)
  : null;

  const provider = new GoogleAuthProvider()


export default {
    state:{
        isLoading: false,
        errorMessageSign: null,
        errorMessageLogin: null,
        logStatus: null,
        customerInfo: null

    },
    mutations: {
        setLoading(state, item) {
          state.isLoading = item
        },
        setLogStatus(state, item) {
          state.logStatus = item
          if(item){
            state.errorMessageSign = null
            state.errorMessageLogin = null
          }
        },
        setErrorMessageSign(state, item) {
          state.errorMessageSign = item
        },
        setErrorMessageLogin(state, item) {
          state.errorMessageLogin = item
        },
        setCustomerInfo(state, item) {
            state.customerInfo = item
        }

    },
    actions: {
        getCustomer({commit, dispatch}){
            let localData = localStorage.getItem("commercejs_customer_id")
            if(localData){
                commerce.customer.about()
                .then((customer) => {
                    commit("setCustomerInfo", customer)
                })
                .catch(_=>{
                    commit("setCustomerInfo", null)
                    dispatch("logOut")
                    dispatch("checkLogStatus")
                })
            }
        },
        checkLogStatus({commit}){ 
            commit("setLogStatus", commerce.customer.isLoggedIn())
        },
        login({commit}){
            signInWithPopup(auth, provider)
            .then(async(result)=>{
                commit("setLoading", true)
                const ref = doc(db, "users", result.user.uid)
                const userDoc = await getDoc(ref);
                if (userDoc.exists()) {
                    const {customerID} = userDoc.data()
                    const url = new URL(`https://api.chec.io/v1/customers/${customerID}/issue-token`)
                    const checAPIKey = import.meta.env.VITE_CHEC_SECRET_KEY
                    let headers = {
                        "X-Authorization": checAPIKey,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    };
                    fetch(url, {
                        method: "POST",
                        headers: headers,
                    })
                    .then(res=>{
                        return res.json()
                    })
                    .then(data=>{
                        commit("setLogStatus", true)
                        commit("setLoading", false)
                        localStorage.setItem("commercejs_customer_id", data.customer_id);
                        localStorage.setItem("commercejs_customer_token", data.jwt);
                        commerce.customer.about()
                        .then((customer) => {
                            commit("setCustomerInfo", customer)
                        })
                    })
                  } else {
                    commit("setLogStatus", false)
                    commit("setLoading", false)
                    commit("setErrorMessageLogin", "User not found")
                  }
            })

        },
        signUp ({commit}) {
            signInWithPopup(auth, provider)
            .then((result)=>{
                commit("setLoading", true)
                const url = new URL("https://api.chec.io/v1/customers")

                const [first, last] = result.user.displayName.split(' ')
                
                const checAPIKey = import.meta.env.VITE_CHEC_SECRET_KEY
                let headers = {
                    "X-Authorization": checAPIKey,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                };
                let body = {
                    "email": `${result.user.email}`,
                    "firstname": `${first}`,
                    "lastname": `${last}`,
                    "external_id": null
                }
                axios.post(url, body, {headers: headers})
                .then((response)=>{
                    setDoc(doc(db,'users', result.user.uid), {
                        customerID: `${response.data.id}`
                    })
                    const url = new URL(`https://api.chec.io/v1/customers/${response.data.id}/issue-token`)
                    let headers = {
                        "X-Authorization": checAPIKey,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    };
                    fetch(url, {
                        method: "POST",
                        headers: headers,
                    })
                    .then(res=>{
                        return res.json()
                    })
                    .then(data=>{
                        commit("setLogStatus", true)
                        commit("setLoading", false)
                        localStorage.setItem("commercejs_customer_id", data.customer_id);
                        localStorage.setItem("commercejs_customer_token", data.jwt);
                        commerce.customer.about()
                        .then((customer) => {
                            commit("setCustomerInfo", customer)
                        })
                    })
                })
                .catch(()=>{
                    commit("setLogStatus", false)
                    commit("setLoading", false)
                    commit("setErrorMessageSign", "The email address has already been taken.")
                })
            })
            .catch((error)=>{
                console.log(error.message)
            })
        },
        logOut(){
            commerce.customer.logout()
        }
    },
    getters: {
        getLoading(state){
            return state.isLoading
        },
        getLogStatus(state){
            return state.logStatus
        },
        getErrorMessageSign(state){
            return state.errorMessageSign
        },
        getErrorMessageLogin(state){
            return state.errorMessageLogin
        },
        getCustomerInfo(state){
            return state.customerInfo
        },
    }
}