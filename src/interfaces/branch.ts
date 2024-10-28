export interface Branch {
  id: string;
  tenant: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string; // or Date if you work with Date objects
  updatedDate: string; // or Date
  backofficeUser: string;
  createdBy: string;
  updatedBy: string;
  description: string;
  mobile: string;
  landline: string;
  address: string;
  latitude: string;
  longitude: string;
  attendanceDistance: number;
  officeTimeIn: string; // or Date if working with Date objects
  officeTimeOut: string; // or Date
}
