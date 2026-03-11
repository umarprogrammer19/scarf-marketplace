export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'cod' | 'card' | 'bank_transfer'
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export interface OrderCreateInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  totalAmount: number
  paymentMethod: 'cod' | 'card' | 'bank_transfer'
  shippingAddress: string
}

export interface OrderUpdateInput {
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod?: 'cod' | 'card' | 'bank_transfer'
}
