import axios from 'axios'
import qs from 'qs'
//测试服务器




//export const BASEURL = axios.defaults.baseURL = 'http://47.75.165.247/';
export const BASEURL = axios.defaults.baseURL = 'http://localhost:8090';
// export const BASEURL = axios.defaults.baseURL = 'http://paibi.wxmarket.cn/';
axios.defaults.withCredentials = false;

//  拦截请求
axios.interceptors.request.use(
    config => {
        //  const token = localStorage.getItem('token');
        config.headers = {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
            //    'token':token
        };
        //  if (token) {
        //    axios.defaults.headers.common['token'] = token;
        //  }
        
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


//  response 拦截相应
axios.interceptors.response.use(
    // config =>{
    //     config.validateStatus = function (status) {
    //         return status >= 200 && status < 600;
    //     }
    //     return config;
    // },
    response => {
        return response;
    },
    error => {
        
      const {response} = error
      let msg = error.msg || 'Network Error'
      return Promise.reject({success: false, message: msg})
      // return Promise.reject(error);
    }
);


//个人服务器
// export const BASEURL = axios.defaults.baseURL = 'http:///';

export const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.fetch(url, {
            params: params
        })
            .then(response => {
                validate(response)
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(validate(response))
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(data, { arrayFormat: 'repeat' }))
            .then(response => {
                resolve(validate(response))
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, JSON.stringify(data, { arrayFormat: 'repeat' }))
            .then(response => {
                resolve(validate(response))
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(url, JSON.stringify(data))
            .then(response => {
                resolve(validate(response))
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const DETELE = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: params
        })
            .then(response => {
                resolve(validate(response))
            })
            .catch(err => {
                reject(err);
            })
    })
}


function validate(response) {
    switch (response.status) {
        case 200:
            return response.data;
            break;
        case 201:
            return response.data;
            break;
        case 204:
            return response.data;
            break;
        default:
            return response;
    }
}