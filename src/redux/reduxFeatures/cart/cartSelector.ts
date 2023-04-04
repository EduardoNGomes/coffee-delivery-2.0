export const selectorTotalValue = (state: any) => {
  return state.cartReducer.products.reduce(
    (ac: any, cc: any) => ac + cc.price * cc.quantity,
    0,
  )
}

export const selectorTotalProductsQuantity = (state: any) => {
  return state.cartReducer.products.reduce(
    (ac: any, cc: any) => ac + cc.quantity,
    0,
  )
}
