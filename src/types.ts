export type AppState = {
	cartCount: number;

	// activeOrder: ActiveOrder;
	// showCart: boolean;
	// customer?: ActiveCustomer;
};

export type CartState = {
  createdAt?: string;
  cartCreatedFor?: User | null;
  cartItems: { [key: string]: CartItem };
  placeOrderSpinner: boolean;
  createdBy?: User;
  taxes?: Tax[];
  note?: string;
  taxesApplied?: {name: string, taxValue: number }[]
  total: number;
  taxedTotal?: number;
}

export type User = {
  email?: string;
  companyId?: string;
  firstName: string;
  lastName?: string;
  username?: string;
  userType: string;
  token?: string;
}


export enum UserType {
  ADMIN = 'admin',
  ONLINE = 'online',
  TABLE = 'table',
  STAFF = 'staff',
  TAKEAWAY = 'takeaway',
}

export interface Tax {
  name: string;
  value: number;
  isPercentage: boolean;
  printName: string;
}

export interface CartItem {
  product: Product;
  count: number;
  modifiers?: Modifier[];
}




export interface Category {
    id: number;
    menuId?: string;
    accountId?: string;
    name: string;
    description: string;
    archived: boolean;
    products?: Product[] | null;
    alwaysOpen: boolean;
    day?: null;
    openTime?: null;
    closeTime?: null;
    openAllDay?: null;
    hours?: null[] | null;
    adminIndex?: number;
    code?: number;
  }
  export interface Product {
    _id: string;
    image: string;
    description: string;
    isAvailable: boolean;
    onSale: boolean;
    price: number;
    name: string;
    category: string;
    archived: boolean;
    video?: string;
    popular: boolean;
    printName?: string;
    modifierGroups?: ModifierGroupsEntity[] | null;
    indexInCategory?: number;
  }
  export interface ModifierGroupsEntity {
    id?: string;
    description?: string;
    price?: number;
    image?: string;
    created_at?: string;
    updated_at?: string;
    printName?: string;
    printModifiersAsItems?: boolean;
    modifiers?: Modifier[];
  }
  
  export interface Modifier {
    description: string;
    price: number;
    id?: number;
  }
  
//   type ModifierProductEntity = Omit<Product, 'modifierGroups'>;
//   export type CategoryViseProducts = { [Key: string]: Product[] };
  
  export interface ProductSortData {
    _id: string;
    indexInCategory: number;
  }
  
  export interface ProductBoolFieldUpdateData {
    _id: string;
    fieldName: string;
    value: boolean;
  }
  

  
export type CategoryViseProducts = { [Key: string]: Product[] };