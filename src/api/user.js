import request from '@/utils/request'

// import { decode } from 'jszip/lib/base64'

export function login(data) {
  return request({
    url: '/admin/verify-otp',
    method: 'post',
    data
  })
}

export function getInformation(param) {
  return request({
    url: '/admin/detail',
    method: 'get',
    params: param
  })
}

export function logout() {
  return request({
    url: 'admin/logout',
    method: 'post'
  })
}

export function getOTP(data) {
  return request({
    url: 'admin/send-otp',
    method: 'post',
    data
  })
}

export function getCaptcha(param) {
  return request({
    url: 'admin/get-captcha',
    method: 'get',
    params: param
  })
}

export function verifyCaptcha(data) {
  return request({
    url: '/admin/verify-captcha',
    method: 'post',
    data
  })
}

export function getAllAdmin() {
  return request({
    url: '/admin/get-all-admin',
    method: 'get'
  })
}
