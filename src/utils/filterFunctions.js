export function applyFilters(products, { minPrice = 0, maxPrice = Infinity, brands = [], materials = [], gender = '' }) {
  return products.filter((p) => {
    if (p.price < minPrice || p.price > maxPrice) return false
    if (brands.length && !brands.includes(p.brand)) return false
    if (materials.length && !materials.includes(p.material)) return false
    if (gender && p.gender !== gender) return false
    return true
  })
}
