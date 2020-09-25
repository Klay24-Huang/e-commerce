import { IResponse } from '@/store/models/responseModel'

export function myPromise(data: IResponse, time = 500) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, time);
    })
}