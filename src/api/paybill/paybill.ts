import request from '@/utils/request'

export const addPayBill = (data: any) =>
    request({
        url: `paybill/addPayBill`,
        method: 'POST',
        data,
    })

export const getPayBillList = (data: any) =>
    request({
        url: `paybill/getPayBillList`,
        method: 'POST',
        data,
    })

export const updatePayBill = (data: any) =>
    request({
        url: `paybill/updatePayBill`,
        method: 'POST',
        data,
    })

export const deletePayBill = (data: any) =>
    request({
        url: `paybill/deletePayBill`,
        method: 'POST',
        data,
    })
