import request from '@/utils/request'

export const addHouse = (data: any) =>
    request({
        url: `house/addHouse`,
        method: 'POST',
        data,
    })

export const getHouseList = (data: any) =>
    request({
        url: `house/getHouseList`,
        method: 'POST',
        data,
    })

export const updateHouse = (data: any) =>
    request({
        url: `house/updateHouse`,
        method: 'POST',
        data,
    })

export const deleteHouse = (data: any) =>
    request({
        url: `house/deleteHouse`,
        method: 'POST',
        data,
    })
