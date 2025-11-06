export function filterByPrice(products, min, max) {
  return products.filter((p) => p.price >= min && p.price <= max)
}

export function filterByBrand(products, brands = []) {
  if (!brands.length) return products
  return products.filter((p) => brands.includes(p.brand))
}
