import Pagination from 'rc-pagination/lib/locale/vi_VN';
import Calendar from '../calendar/locale/vi_VN';
import DatePicker from '../date-picker/locale/vi_VN';
import type { Locale } from '../locale-provider';
import TimePicker from '../time-picker/locale/vi_VN';

const localeValues: Locale = {
  locale: 'vi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Bộ ',
    filterConfirm: 'OK',
    filterReset: 'Tạo Lại',
    selectAll: 'Chọn Tất Cả',
    selectInvert: 'Chọn Ngược Lại',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Huỷ',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Huỷ',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Tìm ở đây',
    itemUnit: 'mục',
    itemsUnit: 'mục',
  },
  Upload: {
    uploading: 'Đang tải lên...',
    removeFile: 'Gỡ bỏ tập tin',
    uploadError: 'Lỗi tải lên',
    previewFile: 'Xem thử tập tin',
    downloadFile: 'Tải tập tin',
  },
  Empty: {
    description: 'Trống',
  },
};

export default localeValues;
