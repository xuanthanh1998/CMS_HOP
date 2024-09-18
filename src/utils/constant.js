export const STATUS_VOUCHER = {
  0: { type: 'warning', label: 'Chờ' },
  1: { type: 'success', label: 'Mở cho phép sử dụng' },
  2: { type: 'primary', label: 'Đóng' },
  3: { type: 'danger', label: 'Khóa' }
}

export const ARRAY_STATUS_VOUCHER = Object.entries(STATUS_VOUCHER).map(([key, value]) => ({
  value: parseInt(key),
  label: value.label
}))

export const STATUS_PARTNER_SERVICE = {
  0: { type: 'danger', label: 'Đóng' },
  1: { type: 'success', label: 'Mở' }
}

export const ARRAY_STATUS_PARTNER_SERVICE = Object.entries(STATUS_PARTNER_SERVICE).map(([key, value]) => ({
  value: parseInt(key),
  label: value.label
}))

export const DISCOUNT_TYPE = {
  1: 'Số tiền cố định',
  2: 'Tỉ lệ',
  3: 'Sản phẩm quà tặng'
}

export const ARRAY_DISCOUNT_TYPE = Object.entries(DISCOUNT_TYPE).map(([key, value]) => ({
  value: parseInt(key),
  label: value
}))

export const ALLOCATION_TYPE = {
  1: 'User tự lưu',
  2: 'CMS phân phối',
  3: 'Tự động phân phối theo điều kiện',
  4: 'Bán'
}

export const ARRAY_ALLOCATION_TYPE = Object.entries(ALLOCATION_TYPE).map(([key, value]) => ({
  value: parseInt(key),
  label: value
}))

export const VOUCHER_TYPE = {
  1: 'Chiết khấu',
  2: 'Hoàn point',
  3: 'Giảm giá ship',
  4: 'Quà tặng'
}

export const ARRAY_VOUCHER_TYPE = Object.entries(VOUCHER_TYPE).map(([key, value]) => ({
  value: parseInt(key),
  label: value
}))

export const ARRAY_AUTO_ADD_TYPE = [
  { value: 1, label: 'Tổng đơn thanh toán tối thiểu' },
  { value: 2, label: 'Mua sản phẩm thuộc danh sách' },
  { value: 3, label: 'Tổng chi tiêu tối thiểu trong khoảng thời gian(Phức tạp, chưa hỗ trợ)' },
  { value: 4, label: 'Sinh nhật' },
  { value: 5, label: 'Thăng hạng hội viên' }
]

export const ARRAY_CONDITION = [
  { value: 1, label: 'Khách hàng trong phạm vi điểm HDC' },
  { value: 2, label: 'Giá trị đơn hàng tối thiểu' },
  { value: 4, label: 'Theo danh sách sản phẩm cố định' },
  { value: 5, label: 'Theo số lượng người chơi' },
  { value: 6, label: 'Theo nhà phân phối' },
  { value: 7, label: 'Theo hạng hội viên' },
  { value: 8, label: 'Theo khung thời gian trong ngày' },
  { value: 9, label: 'Theo phương thức thanh toán' },
  { value: 10, label: 'Theo ngân hàng thanh toán' }
]

export const STATUS_PRODUCT_PARTNER = {
  0: { type: 'info', label: 'Chuẩn bị bán' },
  1: { type: 'success', label: 'Đang bán' },
  2: { type: 'danger', label: 'Hết hàng' }
}

export const ARRAY_STATUS_PRODUCT_PARTNER = Object.entries(STATUS_PRODUCT_PARTNER).map(([key, value]) => ({
  value: parseInt(key),
  label: value.label
}))

export const TYPE_REGION = {
  MIEN_BAC: 1,
  MIEN_TRUNG: 2,
  MIEN_NAM: 3
}
export const REGION_INFO = {
  1: {
    bank_account_number: 888899988,
    bank_account_name: 'CONG TY CO PHAN DICH  VU DAT SAN GOLF VIET NAM',
    bank_name: 'Ngân hàng TMCP Nam Á',
    bank: 970428
  },
  2: {
    bank_account_number: 1018888,
    bank_account_name: 'CONG TY CO PHAN DICH VU GOLF VIET NAM CENTRAL',
    bank_name: 'Ngân hàng TMCP Nam Á',
    bank: 970428
  },
  3: {
    bank_account_number: 131366888,
    bank_account_name: 'CONG TY CO PHAN DICH VU DAT SAN GOLF VIET NAM',
    bank_name: 'Ngân hàng TMCP Nam Á',
    bank: 970428
  }
}

export const FEEDBACK_TYPE = {
  1: 'Tệ',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Tuyệt vời'
}

export const ARRAY_FEEDBACK_TYPE = Object.entries(FEEDBACK_TYPE).map(([key, value]) => ({
  value: parseInt(key),
  label: value
}))

export const ARRAY_ADMIN = ['0989531411']
