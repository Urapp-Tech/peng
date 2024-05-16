export interface StoreEmployee {
    id: string;
    name: string;
    address: string;
    phone: string;
    cnic: string;
    tenant: string;
    is_active: boolean;
    is_deleted: boolean;
    created_by: string;
    updated_by: string;
    created_date: string;
    updated_date: string;
    email: string;
    avatar: string;
    password: string;
    dob: string;
    note: string;
    payroll_type: string;
}

export interface StoreEmployeeSchedule {
    id: string;
    store_employee: string;
    work_day: string;
    is_active: boolean;
    is_deleted: boolean;
    created_date: string;
    updated_date: string;
    created_by: string;
    updated_by: string;
    start_time: string;
    end_time: string;
}

export interface Barber {
    store_employee: StoreEmployee;
    store_employee_schedule: StoreEmployeeSchedule[];
    id: string;
    store_service_category_item: string;
    service_time: number;
    amount_type: string;
    amount: number;
    is_active: boolean;
    created_by: string;
    updated_by: string;
    created_date: string;
    updated_date: string;
    is_deleted: boolean;
    commission_rate: number | null;
    rating: number;
}
