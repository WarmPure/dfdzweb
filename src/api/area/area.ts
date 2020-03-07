import request from '@/utils/request'

export const addArea = (data: any) =>
    request({
        url: `area/addArea`,
        method: 'POST',
        data,
    })

export const getAreaList = (data: any) =>
    request({
        url: `area/getAreaList`,
        method: 'POST',
        data,
    })

export const updateArea = (data: any) =>
    request({
        url: `area/updateArea`,
        method: 'POST',
        data,
    })

export const deleteArea = (data: any) =>
    request({
        url: `area/deleteArea`,
        method: 'POST',
        data,
    })
